// ==========================================================================
// Email Newsletter Builder — Canvas (Center Preview)
// ==========================================================================

const Canvas = {
  /**
   * Render the entire canvas
   */
  render() {
    const wrapper = document.getElementById('canvas-email');
    if (!wrapper) return;

    const blocks = EmailState.getBlocks();
    const gs = EmailState.data.globalStyles;

    if (blocks.length === 0) {
      wrapper.innerHTML = this.renderEmptyState();
      wrapper.style.backgroundColor = gs.backgroundColor;
      return;
    }

    let html = '';
    blocks.forEach((block, index) => {
      html += this.renderDropZone(index);
      html += this.renderBlock(block);
    });
    html += this.renderDropZone(blocks.length);

    wrapper.innerHTML = html;
    wrapper.style.backgroundColor = gs.backgroundColor;

    this.bindBlockEvents();
  },

  /**
   * Empty state
   */
  renderEmptyState() {
    return `
      <div class="canvas-empty" id="canvas-drop-empty">
        <svg class="canvas-empty__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="4 2"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
        <div class="canvas-empty__title">Start Building Your Email</div>
        <div class="canvas-empty__text">Drag structures or content blocks from the left panel and drop them here</div>
      </div>`;
  },

  /**
   * Render a drop zone between blocks
   */
  renderDropZone(index) {
    return `<div class="drop-zone" data-drop-index="${index}"></div>`;
  },

  /**
   * Render a single block
   */
  renderBlock(block) {
    const isSelected = block.id === EmailState.data.selectedBlockId;
    const selectedClass = isSelected ? 'canvas-block--selected' : '';
    const viewport = this.getViewport();
    const isHidden = this.isBlockHidden(block, viewport);
    const hiddenClass = isHidden ? 'canvas-block--hidden' : '';

    if (block.type === 'structure') {
      return this.renderStructure(block, selectedClass, hiddenClass);
    }

    const typeLabel = block.type.charAt(0).toUpperCase() + block.type.slice(1);
    let content = '';

    switch (block.type) {
      case 'text': content = this.renderTextBlock(block); break;
      case 'image': content = this.renderImageBlock(block); break;
      case 'button': content = this.renderButtonBlock(block); break;
      case 'divider': content = this.renderDividerBlock(block); break;
      case 'spacer': content = this.renderSpacerBlock(block); break;
      case 'social': content = this.renderSocialBlock(block); break;
      case 'menu': content = this.renderMenuBlock(block); break;
      case 'html': content = this.renderHtmlBlock(block); break;
      default: content = '<div style="padding:10px;color:#999;">Unknown block</div>';
    }

    const hiddenBadge = isHidden
      ? `<div class="canvas-block__hidden-badge">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
           Hidden on ${viewport}
         </div>`
      : '';

    const parentInfo = EmailState.findParent(block.id);
    const parentButton = parentInfo 
      ? `<button class="canvas-block__action-btn" data-action="select-parent" title="Select Structure">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>
         </button>`
      : '';

    return `
      <div class="canvas-block ${selectedClass} ${hiddenClass}" data-block-id="${block.id}" data-block-type="${block.type}">
        <div class="canvas-block__type-label">${typeLabel}</div>
        ${hiddenBadge}
        <div class="canvas-block__actions">
          ${parentButton}
          <button class="canvas-block__action-btn" data-action="move" title="Move">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 3-3 3"/><path d="M12 22l-3-3 3-3"/><path d="M2 12l3-3 3 3"/><path d="M22 12l-3 3-3-3"/><path d="M12 5v14"/><path d="M5 12h14"/></svg>
          </button>
          <button class="canvas-block__action-btn" data-action="duplicate" title="Duplicate">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          </button>
          <button class="canvas-block__action-btn" data-action="delete" title="Delete">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
          </button>
        </div>
        ${content}
      </div>`;
  },

  /**
   * Get current viewport mode
   */
  getViewport() {
    return (window.App && App.currentViewport) || 'desktop';
  },

  /**
   * Check if a block should be hidden in the current viewport
   */
  isBlockHidden(block, viewport) {
    if (!viewport) viewport = this.getViewport();
    if (viewport === 'mobile' && block.hideOnMobile) return true;
    if (viewport === 'desktop' && block.hideOnDesktop) return true;
    return false;
  },

  /**
   * Render a structure (row with columns)
   */
  renderStructure(block, selectedClass, hiddenClass) {
    const gs = EmailState.data.globalStyles;
    const totalWidth = gs.contentWidth - 40;
    const viewport = this.getViewport();
    const isMobile = viewport === 'mobile';
    const shouldStack = isMobile && block.mobileStackColumns !== false && block.layout.length > 1;
    
    let columnsHtml = '';
    block.layout.forEach((widthPct, colIdx) => {
      let cellContent = '';

      if (block.columns[colIdx] && block.columns[colIdx].length > 0) {
        block.columns[colIdx].forEach(child => {
          cellContent += this.renderBlock(child);
        });
      }

      // Add empty state text if no blocks, otherwise it's just a drop zone container
      if (!cellContent) {
        cellContent = `
          <div style="min-height:60px;display:flex;align-items:center;justify-content:center;border:2px dashed rgba(100,100,130,0.2);margin:4px;border-radius:4px;">
            <span style="color:#999;font-size:12px;font-family:Inter,sans-serif;">Drop here</span>
          </div>`;
      }

      if (shouldStack) {
        columnsHtml += `<div class="drop-zone-col" data-parent-id="${block.id}" data-col-index="${colIdx}" style="width:100%;padding:0;">${cellContent}</div>`;
      } else {
        columnsHtml += `<td class="drop-zone-col" data-parent-id="${block.id}" data-col-index="${colIdx}" valign="top" style="width:${widthPct}%;padding:0;">${cellContent}</td>`;
      }
    });

    const isHidden = this.isBlockHidden(block, viewport);
    const hiddenBadge = isHidden
      ? `<div class="canvas-block__hidden-badge">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
           Hidden on ${viewport}
         </div>`
      : '';

    const bgImageStyle = block.bgImage ? `background-image:url(${block.bgImage});background-size:cover;background-position:center;` : '';
    const borderStyle = block.border ? `border:${block.border};` : '';
    const radiusStyle = block.borderRadius ? `border-radius:${block.borderRadius};overflow:hidden;` : '';
    const wrapperStyle = `background-color:${block.bgColor || '#ffffff'};${bgImageStyle}${borderStyle}${radiusStyle}padding:${block.padding || '0'};`;

    const layoutHtml = shouldStack
      ? `<div style="display:flex;flex-direction:column;${wrapperStyle}">${columnsHtml}</div>`
      : `<table cellpadding="0" cellspacing="0" style="width:100%;max-width:100%;table-layout:fixed;${wrapperStyle}"><tr>${columnsHtml}</tr></table>`;

    return `
      <div class="canvas-block ${selectedClass} ${hiddenClass || ''}" data-block-id="${block.id}" data-block-type="structure">
        <div class="canvas-block__type-label">Structure${shouldStack ? ' (stacked)' : ''}</div>
        ${hiddenBadge}
        <div class="canvas-block__actions">
          <button class="canvas-block__action-btn" data-action="duplicate" title="Duplicate">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          </button>
          <button class="canvas-block__action-btn" data-action="delete" title="Delete">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
          </button>
        </div>
        ${layoutHtml}
      </div>`;
  },

  // ---- Individual block renderers ----

  renderTextBlock(block) {
    const gs = EmailState.data.globalStyles;
    const isMobile = window.App && App.currentViewport === 'mobile';
    const fontSize = (isMobile && block.mobileFontSize) ? block.mobileFontSize : (block.fontSize || gs.fontSize);
    const align = (isMobile && block.mobileAlign) ? block.mobileAlign : (block.align || 'left');
    const bgColor = block.bgColor && block.bgColor !== 'transparent' ? block.bgColor : 'transparent';
    const textColor = block.textColor || gs.textColor;
    const fontFamily = block.fontFamily || gs.fontFamily;
    const lineHeight = block.lineHeight || '1.5';
    
    return `
      <div style="background-color:${bgColor};padding:${block.padding || '10px 20px'};font-family:${fontFamily};font-size:${fontSize};color:${textColor};text-align:${align};line-height:${lineHeight};">
        <div class="editable-text" data-block-id="${block.id}">${block.content}</div>
      </div>`;
  },

  renderImageBlock(block) {
    const isMobile = window.App && App.currentViewport === 'mobile';
    const align = (isMobile && block.mobileAlign) ? block.mobileAlign : (block.align || 'center');
    const borderStyle = block.border ? `border:${block.border};` : '';
    const radiusStyle = block.borderRadius && block.borderRadius !== '0px' ? `border-radius:${block.borderRadius};` : '';
    const imgStyle = `max-width:100%;width:${block.width || '100%'};display:block;margin:0 auto;${borderStyle}${radiusStyle}`;
    const src = block.src || '';

    if (!src) {
      const bgColor = block.bgColor && block.bgColor !== 'transparent' ? block.bgColor : 'transparent';
      return `
        <div style="background-color:${bgColor};padding:${block.padding || '10px 20px'};text-align:${align};">
          <div style="background:#f0f0f0;border:2px dashed #ccc;padding:40px 20px;text-align:center;border-radius:4px;">
            <svg style="width:32px;height:32px;color:#aaa;margin-bottom:8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
            </svg>
            <div style="color:#888;font-size:13px;font-family:Inter,sans-serif;">Click to add image URL</div>
          </div>
        </div>`;
    }

    const linkStart = block.link ? `<a href="${block.link}" target="_blank" style="text-decoration:none;">` : '';
    const linkEnd = block.link ? '</a>' : '';
    const bgColor = block.bgColor && block.bgColor !== 'transparent' ? block.bgColor : 'transparent';

    return `
      <div style="background-color:${bgColor};padding:${block.padding || '10px 20px'};text-align:${align};">
        ${linkStart}<img src="${src}" alt="${block.alt || ''}" style="${imgStyle}border:0;outline:none;" />${linkEnd}
      </div>`;
  },

  renderButtonBlock(block) {
    const isMobile = window.App && App.currentViewport === 'mobile';
    const align = (isMobile && block.mobileAlign) ? block.mobileAlign : (block.align || 'center');
    const borderStyle = block.border ? `border:${block.border};` : '';
    const fontWeight = block.fontWeight || 'bold';
    const btnStyle = `
      display:${block.fullWidth ? 'block' : 'inline-block'};
      background:${block.bgColor};
      color:${block.textColor};
      font-family:${EmailState.data.globalStyles.fontFamily};
      font-size:${block.fontSize};
      font-weight:${fontWeight};
      text-decoration:none;
      padding:12px 30px;
      border-radius:${block.borderRadius};
      text-align:center;
      ${borderStyle}
      ${block.fullWidth ? 'width:100%;box-sizing:border-box;' : ''}
    `.replace(/\n/g, '');

    return `
      <div style="padding:${block.padding || '10px 20px'};text-align:${align};">
        <a href="${block.link || '#'}" target="_blank" style="${btnStyle}">${block.text}</a>
      </div>`;
  },

  renderDividerBlock(block) {
    return `
      <div style="padding:${block.padding || '10px 20px'};">
        <hr style="border:none;border-top:${block.thickness} ${block.style} ${block.color};width:${block.width};margin:0 auto;" />
      </div>`;
  },

  renderSpacerBlock(block) {
    return `<div style="height:${block.height};line-height:${block.height};font-size:1px;">&nbsp;</div>`;
  },

  renderSocialBlock(block) {
    const socialIcons = {
      facebook: 'F',
      twitter: '𝕏',
      instagram: 'IG',
      youtube: '▶',
      linkedin: 'in',
    };

    const socialColors = {
      facebook: '#1877F2',
      twitter: '#000000',
      instagram: '#E4405F',
      youtube: '#FF0000',
      linkedin: '#0A66C2',
    };

    let icons = '';
    (block.icons || []).forEach(icon => {
      if (!icon.show) return;
      const size = parseInt(block.iconSize) || 24;
      icons += `
        <a href="${icon.url || '#'}" target="_blank" style="display:inline-block;margin:0 8px;text-decoration:none;">
          <div style="width:${size + 12}px;height:${size + 12}px;background:${socialColors[icon.platform] || '#333'};border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:${Math.floor(size * 0.55)}px;font-weight:bold;font-family:Arial,sans-serif;line-height:1;">
            ${socialIcons[icon.platform] || '?'}
          </div>
        </a>`;
    });

    return `<div style="padding:${block.padding || '15px 20px'};text-align:${block.align || 'center'};">${icons}</div>`;
  },

  renderMenuBlock(block) {
    let items = '';
    (block.items || []).forEach((item, i) => {
      if (i > 0) items += '<span style="color:#ccc;margin:0 5px;">|</span>';
      items += `<a href="${item.link || '#'}" target="_blank" style="font-family:${block.fontFamily || 'Arial'};font-size:${block.fontSize || '14px'};color:${block.color || '#232429'};text-decoration:none;font-weight:600;letter-spacing:0.5px;">${item.text}</a>`;
    });
    return `<div style="padding:${block.padding || '10px 20px'};text-align:${block.align || 'center'};">${items}</div>`;
  },

  renderHtmlBlock(block) {
    return `<div style="padding:${block.padding || '0'};">${block.code}</div>`;
  },

  /**
   * Bind click/action events on rendered blocks
   */
  bindBlockEvents() {
    // Block selection
    document.querySelectorAll('.canvas-block').forEach(el => {
      el.addEventListener('click', (e) => {
        // Don't select if clicking action buttons
        if (e.target.closest('.canvas-block__action-btn')) return;
        // Don't select if editing text
        if (e.target.closest('[contenteditable="true"]')) return;
        
        e.stopPropagation();
        const blockId = el.dataset.blockId;
        EmailState.selectBlock(blockId);
      });
    });

    // Action buttons
    document.querySelectorAll('.canvas-block__action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const blockEl = btn.closest('.canvas-block');
        const blockId = blockEl.dataset.blockId;

        switch (action) {
          case 'delete':
            // Check if it's a child block inside a structure
            const parentInfo = EmailState.findParent(blockId);
            if (parentInfo) {
              parentInfo.parent.columns[parentInfo.colIndex].splice(parentInfo.childIndex, 1);
              EmailState.saveSnapshot();
              EmailState.save();
              EmailState.notify('blockRemoved');
            } else {
              EmailState.removeBlock(blockId);
            }
            break;
          case 'duplicate':
            EmailState.duplicateBlock(blockId);
            break;
          case 'move':
            // Just select it for now - dragging handles reorder
            EmailState.selectBlock(blockId);
            break;
          case 'select-parent':
            const parent = EmailState.findParent(blockId);
            if (parent) {
              EmailState.selectBlock(parent.parent.id);
            }
            break;
        }
      });
    });

    // Inline text editing
    document.querySelectorAll('.editable-text').forEach(el => {
      el.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        el.contentEditable = 'true';
        el.focus();

        // Select all text on first double-click
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      });

      el.addEventListener('blur', () => {
        el.contentEditable = 'false';
        const blockId = el.dataset.blockId;
        const content = el.innerHTML;
        
        // Update content in state
        const block = EmailState.getBlock(blockId);
        if (block && block.content !== content) {
          EmailState.updateBlockWithSnapshot(blockId, { content });
        }
      });

      el.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          el.contentEditable = 'false';
          el.blur();
        }
      });
    });

    // Make blocks draggable for reordering
    document.querySelectorAll('.canvas-block[data-block-type]').forEach(el => {
      // Only top-level blocks
      if (el.parentElement.id === 'canvas-email' || el.parentElement.classList.contains('canvas-email')) {
        // Skip - DragDrop handles this
      }
    });
  },

  /**
   * Initialize
   */
  init() {
    // Click on canvas background to deselect
    const canvasArea = document.querySelector('.canvas-area');
    if (canvasArea) {
      canvasArea.addEventListener('click', (e) => {
        if (e.target.closest('.canvas-block')) return;
        EmailState.deselectAll();
      });
    }

    // Listen for state changes
    EmailState.on((changeType) => {
      this.render();
    });
  }
};

window.Canvas = Canvas;
