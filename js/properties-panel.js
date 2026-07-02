// ==========================================================================
// Email Newsletter Builder — Properties Panel (Right Panel)
// ==========================================================================

const PropertiesPanel = {
  activeTab: 'properties',

  /**
   * Render the panel based on current state
   */
  render() {
    const body = document.getElementById('properties-panel-body');
    if (!body) return;

    if (this.activeTab === 'global') {
      body.innerHTML = this.renderGlobalStyles();
    } else {
      if (EmailState.data.selectedInlineImageId) {
        body.innerHTML = this.renderInlineImageProps(EmailState.data.selectedInlineImageId);
      } else {
        const selected = EmailState.getSelectedBlock();
        if (selected) {
          body.innerHTML = this.renderBlockProperties(selected);
        } else {
          body.innerHTML = this.renderEmptyState();
        }
      }
    }

    this.bindEvents();
  },

  /**
   * Render properties for a selected inline image
   */
  renderInlineImageProps(imageId) {
    const img = document.querySelector(`img[data-inline-id="${imageId}"]`);
    if (!img) return this.renderEmptyState();

    const src = img.getAttribute('src') || '';
    const width = img.style.width || 'auto';
    const height = img.style.height || '1.2em';
    const marginLeft = img.style.marginLeft || '0';
    const marginRight = img.style.marginRight || '0';
    const marginTop = img.style.marginTop || '0';
    const marginBottom = img.style.marginBottom || '0';
    
    const paddingTop = img.style.paddingTop || '0';
    const paddingBottom = img.style.paddingBottom || '0';
    const paddingLeft = img.style.paddingLeft || '0';
    const paddingRight = img.style.paddingRight || '0';
    
    const vAlign = img.style.verticalAlign || 'middle';
    const display = img.style.display || 'inline-block';
    const cssFloat = img.style.float || 'none';
    
    // Check if it has mobile hide class
    const isHiddenMobile = img.classList.contains('hide-on-mobile');
    const isHiddenDesktop = img.classList.contains('hide-on-desktop');

    const numericWidth = parseInt(img.style.width) || '';
    const radius = parseInt(img.style.borderRadius) || 0;
    
    // Helper for number inputs
    const numGroup = (val, prop) => `
      <div class="prop-number-group">
        <button class="prop-number-btn btn-minus" data-target="${prop}">-</button>
        <input class="prop-number-input inline-img-prop" type="text" value="${val}" data-img-prop="${prop}" id="input-${prop}" />
        <button class="prop-number-btn btn-plus" data-target="${prop}">+</button>
      </div>`;

    return `
      <div class="prop-group">
        <div class="prop-group__title">Inline Image</div>
        
        <div class="prop-row" style="flex-direction:column;align-items:stretch;">
          <span class="prop-row__label" style="margin-bottom:4px;">Image Source URL</span>
          <input class="prop-input inline-img-prop" type="url" value="${src}" data-img-prop="src" placeholder="https://..." />
        </div>

        <div class="prop-row">
          <span class="prop-row__label">Width</span>
          ${numGroup(numericWidth, 'width')}
        </div>
        
        <div class="prop-row">
          <span class="prop-row__label">Text Wrapping</span>
          <div class="text-wrap-group">
            <button class="text-wrap-btn ${cssFloat === 'none' && display !== 'block' ? 'active' : ''}" data-wrap="inline" title="Inline">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
            </button>
            <button class="text-wrap-btn ${cssFloat === 'left' ? 'active' : ''}" data-wrap="left" title="Float Left">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="8" width="6" height="8" rx="1"/><line x1="14" y1="8" x2="20" y2="8"/><line x1="14" y1="12" x2="20" y2="12"/><line x1="14" y1="16" x2="20" y2="16"/><line x1="4" y1="4" x2="20" y2="4"/><line x1="4" y1="20" x2="20" y2="20"/></svg>
            </button>
            <button class="text-wrap-btn ${cssFloat === 'right' ? 'active' : ''}" data-wrap="right" title="Float Right">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="14" y="8" width="6" height="8" rx="1"/><line x1="4" y1="8" x2="10" y2="8"/><line x1="4" y1="12" x2="10" y2="12"/><line x1="4" y1="16" x2="10" y2="16"/><line x1="4" y1="4" x2="20" y2="4"/><line x1="4" y1="20" x2="20" y2="20"/></svg>
            </button>
            <button class="text-wrap-btn ${display === 'block' && cssFloat === 'none' ? 'active' : ''}" data-wrap="block" title="Block">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
            </button>
          </div>
        </div>

        <div class="prop-row">
          <span class="prop-row__label">Border Radius</span>
          ${numGroup(radius, 'borderRadius')}
        </div>
        
        <div class="prop-group__title" style="margin-top:20px;">Margins on Desktop</div>
        <div class="prop-cross-layout">
          <div class="prop-cross-top">${numGroup(parseInt(marginTop) || 0, 'marginTop')}</div>
          <div class="prop-cross-left">${numGroup(parseInt(marginLeft) || 0, 'marginLeft')}</div>
          <div class="prop-cross-center">
            <svg style="width:16px;height:16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div class="prop-cross-right">${numGroup(parseInt(marginRight) || 0, 'marginRight')}</div>
          <div class="prop-cross-bottom">${numGroup(parseInt(marginBottom) || 0, 'marginBottom')}</div>
        </div>
        
        <div class="prop-group__title" style="margin-top:20px;">Visibility</div>
        <div class="prop-row">
          <span class="prop-row__label">Hide on Desktop</span>
          <div class="prop-toggle inline-img-toggle ${isHiddenDesktop ? 'active' : ''}" data-img-toggle="hide-on-desktop">
            <div class="prop-toggle__knob"></div>
          </div>
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Hide on Mobile</span>
          <div class="prop-toggle inline-img-toggle ${isHiddenMobile ? 'active' : ''}" data-img-toggle="hide-on-mobile">
            <div class="prop-toggle__knob"></div>
          </div>
        </div>
        
        <div class="prop-row" style="margin-top: 24px; justify-content: center;">
           <button class="prop-input" id="btn-delete-inline-img" style="color: #ef4444; border-color: #ef4444; width: 100%;">Delete Inline Image</button>
        </div>
        <div class="prop-row" style="margin-top: 8px; justify-content: center;">
           <button class="prop-input" id="btn-back-to-text" style="width: 100%;">Back to Text Properties</button>
        </div>
      </div>`;
  },

  /**
   * Empty state when no block is selected
   */
  renderEmptyState() {
    return `
      <div class="props-empty">
        <svg class="props-empty__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"/>
        </svg>
        <div class="props-empty__title">No Block Selected</div>
        <div class="props-empty__text">Click on a block in the canvas to edit its properties, or switch to Global Styles.</div>
      </div>`;
  },

  /**
   * Render properties for a selected block
   */
  renderBlockProperties(block) {
    switch (block.type) {
      case 'text': return this.renderTextProps(block);
      case 'image': return this.renderImageProps(block);
      case 'button': return this.renderButtonProps(block);
      case 'divider': return this.renderDividerProps(block);
      case 'spacer': return this.renderSpacerProps(block);
      case 'social': return this.renderSocialProps(block);
      case 'menu': return this.renderMenuProps(block);
      case 'html': return this.renderHtmlProps(block);
      case 'structure': return this.renderStructureProps(block);
      default: return '<div class="props-empty"><div class="props-empty__text">No properties available</div></div>';
    }
  },

  // ---- Block-specific property renderers ----

  renderTextProps(block) {
    const gs = EmailState.data.globalStyles;
    return `
      <div class="prop-group">
        <div class="prop-group__title">Text Block</div>
        ${this.renderAlignmentRow(block.align || 'left', 'text-align')}
        <div class="prop-row" style="margin-top:4px;">
          <span class="prop-row__label">HTML Tag</span>
          <select class="prop-input prop-input--sm" data-prop="tag">
            <option value="div" ${block.tag === 'div' || !block.tag ? 'selected' : ''}>Normal</option>
            <option value="p" ${block.tag === 'p' ? 'selected' : ''}>Paragraph (p)</option>
            <option value="h1" ${block.tag === 'h1' ? 'selected' : ''}>Heading 1 (h1)</option>
            <option value="h2" ${block.tag === 'h2' ? 'selected' : ''}>Heading 2 (h2)</option>
            <option value="h3" ${block.tag === 'h3' ? 'selected' : ''}>Heading 3 (h3)</option>
            <option value="h4" ${block.tag === 'h4' ? 'selected' : ''}>Heading 4 (h4)</option>
          </select>
        </div>
        <div class="prop-row" style="margin-top:4px;">
          <span class="prop-row__label">Text Color</span>
          ${this.renderColorPicker(block.textColor || '', 'textColor')}
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Font Size</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.fontSize || ''}" data-prop="fontSize" placeholder="Inherit" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Mobile Size</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.mobileFontSize || ''}" data-prop="mobileFontSize" placeholder="Inherit" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Font Family</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.fontFamily || ''}" data-prop="fontFamily" placeholder="Inherit" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Line Height</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.lineHeight || '1.5'}" data-prop="lineHeight" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Background</span>
          ${this.renderColorPicker(block.bgColor || 'transparent', 'bgColor')}
        </div>
        ${this.renderBorderProps(block)}
        <div class="prop-row">
          <span class="prop-row__label">Margin (Outside)</span>
          <input class="prop-input prop-input--md" type="text" value="${block.margin || '0'}" data-prop="margin" placeholder="0" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Padding (Inside)</span>
          <input class="prop-input prop-input--md" type="text" value="${block.padding || '10px 20px'}" data-prop="padding" />
        </div>
        <div class="prop-group">
          <div class="prop-group__title">Formatting & Insert</div>
          <div class="prop-row" style="gap: 6px;">
            <button class="prop-input rte-btn" data-rte-action="bold" title="Bold" style="width:32px;height:32px;padding:0;display:flex;align-items:center;justify-content:center;font-weight:bold;cursor:pointer;">B</button>
            <button class="prop-input rte-btn" data-rte-action="italic" title="Italic" style="width:32px;height:32px;padding:0;display:flex;align-items:center;justify-content:center;font-style:italic;cursor:pointer;">I</button>
            <button class="prop-input rte-btn" data-rte-action="underline" title="Underline" style="width:32px;height:32px;padding:0;display:flex;align-items:center;justify-content:center;text-decoration:underline;cursor:pointer;">U</button>
            <button class="prop-input rte-btn" data-rte-action="link" title="Insert Link" style="width:32px;height:32px;padding:0;display:flex;align-items:center;justify-content:center;cursor:pointer;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></button>
            <button class="prop-input rte-btn" data-rte-action="image" title="Insert Image" style="width:32px;height:32px;padding:0;display:flex;align-items:center;justify-content:center;cursor:pointer;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></button>
          </div>
          <p style="font-size:11px;color:var(--text-muted);line-height:1.4;margin-top:8px;">Highlight text and use these tools to format or insert inline elements.</p>
        </div>
      </div>
      <div class="prop-group">
        <div class="prop-group__title">Tip</div>
        <p style="font-size:12px;color:var(--text-muted);line-height:1.6;">Double-click the text block in the canvas to edit content inline.</p>
      </div>
      ${this.renderMobileSettings(block)}`;
  },

  renderImageProps(block) {
    return `
      <div class="prop-group">
        <div class="prop-group__title">Image Block</div>
        <div class="prop-row" style="flex-direction:column;align-items:stretch;">
          <span class="prop-row__label" style="margin-bottom:4px;">Image URL</span>
          <input class="prop-input" type="url" value="${block.src || ''}" data-prop="src" placeholder="https://example.com/image.jpg" />
        </div>
        <div class="prop-row" style="flex-direction:column;align-items:stretch;margin-top:12px;">
          <span class="prop-row__label" style="margin-bottom:4px;">Alt Text</span>
          <input class="prop-input" type="text" value="${block.alt || ''}" data-prop="alt" placeholder="Image description" />
        </div>
        <div class="prop-row" style="flex-direction:column;align-items:stretch;margin-top:12px;">
          <span class="prop-row__label" style="margin-bottom:4px;">Link URL</span>
          <input class="prop-input" type="url" value="${block.link || ''}" data-prop="link" placeholder="https://..." />
        </div>
        <div class="prop-row" style="margin-top:12px;">
          <span class="prop-row__label">Width</span>
          <input class="prop-input prop-input--md" type="text" value="${block.width || '100%'}" data-prop="width" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Responsive (Mobile 100%)</span>
          <div class="toggle-switch ${block.responsive !== false ? 'toggle-switch--active' : ''}" data-prop="responsive" data-toggle></div>
        </div>
        ${this.renderAlignmentRow(block.align || 'center', 'align')}
        <div class="prop-row" style="margin-top:4px;">
          <span class="prop-row__label">Background</span>
          ${this.renderColorPicker(block.bgColor || 'transparent', 'bgColor')}
        </div>
        ${this.renderBorderProps(block)}
        <div class="prop-row">
          <span class="prop-row__label">Margin (Outside)</span>
          <input class="prop-input prop-input--md" type="text" value="${block.margin || '0'}" data-prop="margin" placeholder="0" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Padding (Inside)</span>
          <input class="prop-input prop-input--md" type="text" value="${block.padding || '10px 20px'}" data-prop="padding" />
        </div>
      </div>
      ${this.renderMobileSettings(block)}`;
  },

  renderButtonProps(block) {
    const gs = EmailState.data.globalStyles;
    return `
      <div class="prop-group">
        <div class="prop-group__title">Button Block</div>
        <div class="prop-row" style="flex-direction:column;align-items:stretch;">
          <span class="prop-row__label" style="margin-bottom:4px;">Button Text</span>
          <input class="prop-input" type="text" value="${block.text || ''}" data-prop="text" />
        </div>
        <div class="prop-row" style="flex-direction:column;align-items:stretch;margin-top:12px;">
          <span class="prop-row__label" style="margin-bottom:4px;">Link URL</span>
          <input class="prop-input" type="url" value="${block.link || '#'}" data-prop="link" />
        </div>
        <div class="prop-row" style="margin-top:12px;">
          <span class="prop-row__label">Background</span>
          ${this.renderColorPicker(block.bgColor || gs.buttonBgColor, 'bgColor')}
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Text Color</span>
          ${this.renderColorPicker(block.textColor || gs.buttonTextColor, 'textColor')}
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Font Size</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.fontSize || ''}" data-prop="fontSize" placeholder="Inherit" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Mobile Size</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.mobileFontSize || ''}" data-prop="mobileFontSize" placeholder="Inherit" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Font Weight</span>
          <select class="prop-select" data-prop="fontWeight" style="width: 80px;">
            <option value="normal" ${block.fontWeight === 'normal' ? 'selected' : ''}>Normal</option>
            <option value="bold" ${block.fontWeight === 'bold' || !block.fontWeight ? 'selected' : ''}>Bold</option>
          </select>
        </div>
        ${this.renderBorderProps(block)}
        ${this.renderAlignmentRow(block.align || 'center', 'align')}
        <div class="prop-row">
          <span class="prop-row__label">Full Width</span>
          <div class="toggle-switch ${block.fullWidth ? 'toggle-switch--active' : ''}" data-prop="fullWidth" data-toggle></div>
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Margin (Outside)</span>
          <input class="prop-input prop-input--md" type="text" value="${block.margin || '0'}" data-prop="margin" placeholder="0" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Padding (Inside)</span>
          <input class="prop-input prop-input--md" type="text" value="${block.padding || '10px 20px'}" data-prop="padding" />
        </div>
      </div>
      ${this.renderMobileSettings(block)}`;
  },

  renderDividerProps(block) {
    return `
      <div class="prop-group">
        <div class="prop-group__title">Divider Block</div>
        <div class="prop-row">
          <span class="prop-row__label">Color</span>
          ${this.renderColorPicker(block.color || '#cccccc', 'color')}
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Thickness</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.thickness || '1px'}" data-prop="thickness" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Width</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.width || '100%'}" data-prop="width" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Style</span>
          <select class="prop-select" data-prop="style" style="width:120px;">
            <option value="solid" ${block.style === 'solid' ? 'selected' : ''}>Solid</option>
            <option value="dashed" ${block.style === 'dashed' ? 'selected' : ''}>Dashed</option>
            <option value="dotted" ${block.style === 'dotted' ? 'selected' : ''}>Dotted</option>
          </select>
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Padding</span>
          <input class="prop-input prop-input--md" type="text" value="${block.padding || '10px 20px'}" data-prop="padding" />
        </div>
      </div>
      ${this.renderMobileSettings(block)}`;
  },

  renderSpacerProps(block) {
    return `
      <div class="prop-group">
        <div class="prop-group__title">Spacer Block</div>
        <div class="prop-row">
          <span class="prop-row__label">Height</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.height || '30px'}" data-prop="height" />
        </div>
      </div>
      ${this.renderMobileSettings(block)}`;
  },

  renderSocialProps(block) {
    let iconsHtml = '';
    (block.icons || []).forEach((icon, i) => {
      iconsHtml += `
        <div class="prop-row" style="border:1px solid var(--border-color);border-radius:6px;padding:8px;margin-bottom:8px;flex-direction:column;align-items:stretch;">
          <div style="display:flex;align-items:center;gap:8px;width:100%;">
            <span style="font-weight:600;text-transform:capitalize;font-size:12px;min-width:65px;">${icon.platform}</span>
            <input class="prop-input" type="url" value="${icon.url || ''}" data-social-url="${i}" placeholder="Link URL" style="flex:1;font-size:11px;" />
            <div class="toggle-switch ${icon.show ? 'toggle-switch--active' : ''}" data-social-toggle="${i}" data-toggle style="flex-shrink:0;"></div>
          </div>
          <div style="display:${icon.show ? 'flex' : 'none'};align-items:center;gap:8px;width:100%;margin-top:8px;">
            <span style="font-size:11px;color:var(--text-muted);min-width:65px;">Image URL</span>
            <input class="prop-input" type="url" value="${icon.imageUrl || ''}" data-social-image="${i}" placeholder="Leave empty for default" style="flex:1;font-size:11px;" />
          </div>
        </div>`;
    });

    return `
      <div class="prop-group">
        <div class="prop-group__title">Social Icons</div>
        ${iconsHtml}
        <div class="prop-row" style="margin-top:12px;">
          <span class="prop-row__label">Icon Size</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.iconSize || '24px'}" data-prop="iconSize" />
        </div>
        ${this.renderAlignmentRow(block.align || 'center', 'align')}
      </div>
      ${this.renderMobileSettings(block)}`;
  },

  renderMenuProps(block) {
    let itemsHtml = '';
    (block.items || []).forEach((item, i) => {
      itemsHtml += `
        <div style="display:flex;gap:6px;margin-bottom:6px;">
          <input class="prop-input" type="text" value="${item.text}" data-menu-text="${i}" placeholder="Label" style="flex:1;font-size:11px;" />
          <input class="prop-input" type="url" value="${item.link}" data-menu-link="${i}" placeholder="URL" style="flex:1;font-size:11px;" />
          <button class="toolbar-btn--icon" data-remove-menu="${i}" title="Remove" style="flex-shrink:0;width:28px;height:28px;color:var(--accent-red);">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>`;
    });

    return `
      <div class="prop-group">
        <div class="prop-group__title">Menu Block</div>
        <div style="margin-bottom:12px;">
          <span class="prop-row__label" style="margin-bottom:6px;display:block;">Menu Items</span>
          ${itemsHtml}
          <button class="btn btn--secondary" data-action="add-menu-item" style="width:100%;margin-top:4px;font-size:11px;padding:6px;">+ Add Item</button>
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Text Color</span>
          ${this.renderColorPicker(block.color || '#232429', 'color')}
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Font Family</span>
          <input class="prop-input" type="text" value="${block.fontFamily || ''}" data-prop="fontFamily" placeholder="Inherit" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Font Size</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.fontSize || '14px'}" data-prop="fontSize" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Mobile Size</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.mobileFontSize || ''}" data-prop="mobileFontSize" placeholder="Inherit" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Width</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.width || '100%'}" data-prop="width" placeholder="100%" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Font Weight</span>
          <select class="prop-select" data-prop="fontWeight" style="width: 80px;">
            <option value="normal" ${block.fontWeight === 'normal' ? 'selected' : ''}>Normal</option>
            <option value="600" ${block.fontWeight === '600' || !block.fontWeight ? 'selected' : ''}>Semi-Bold</option>
            <option value="bold" ${block.fontWeight === 'bold' ? 'selected' : ''}>Bold</option>
          </select>
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Full Width</span>
          <div class="toggle-switch ${block.fullWidth ? 'toggle-switch--active' : ''}" data-prop="fullWidth" data-toggle></div>
        </div>
        ${this.renderAlignmentRow(block.align || 'center', 'align')}
      </div>
      ${this.renderMobileSettings(block)}`;
  },

  renderHtmlProps(block) {
    return `
      <div class="prop-group">
        <div class="prop-group__title">HTML Block</div>
        <div style="margin-bottom:12px;">
          <span class="prop-row__label" style="margin-bottom:4px;display:block;">HTML Code</span>
          <textarea class="prop-textarea" data-prop="code" rows="8" style="font-family:var(--font-mono);font-size:11px;">${Utils.escapeHTML(block.code || '')}</textarea>
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Padding</span>
          <input class="prop-input prop-input--md" type="text" value="${block.padding || '0'}" data-prop="padding" />
        </div>
      </div>
      ${this.renderMobileSettings(block)}`;
  },

  renderStructureProps(block) {
    let colsHtml = `
      <div class="prop-row">
        <span class="prop-row__label">Columns</span>
        <select class="prop-select" id="prop-columns" style="width: 140px;">
          <option value="1" ${block.columns.length === 1 ? 'selected' : ''}>1 Column</option>
          <option value="2" ${block.columns.length === 2 ? 'selected' : ''}>2 Columns</option>
          <option value="3" ${block.columns.length === 3 ? 'selected' : ''}>3 Columns</option>
          <option value="4" ${block.columns.length === 4 ? 'selected' : ''}>4 Columns</option>
        </select>
      </div>`;

    if (block.columns.length === 2) {
      layoutHtml = `
        <div class="prop-row" style="margin-top:4px;">
          <span class="prop-row__label">Layout</span>
          <select class="prop-select" id="prop-layout" style="width: 140px;">
            <option value="50,50" ${block.layout.join(',') === '50,50' ? 'selected' : ''}>50% / 50%</option>
            <option value="33,67" ${block.layout.join(',') === '33,67' ? 'selected' : ''}>33% / 67%</option>
            <option value="67,33" ${block.layout.join(',') === '67,33' ? 'selected' : ''}>67% / 33%</option>
            <option value="25,75" ${block.layout.join(',') === '25,75' ? 'selected' : ''}>25% / 75%</option>
            <option value="75,25" ${block.layout.join(',') === '75,25' ? 'selected' : ''}>75% / 25%</option>
            <option value="15,85" ${block.layout.join(',') === '15,85' ? 'selected' : ''}>15% / 85%</option>
            <option value="85,15" ${block.layout.join(',') === '85,15' ? 'selected' : ''}>85% / 15%</option>
          </select>
        </div>`;
    } else if (block.columns.length === 3) {
      layoutHtml = `
        <div class="prop-row" style="margin-top:4px;">
          <span class="prop-row__label">Layout</span>
          <select class="prop-select" id="prop-layout" style="width: 140px;">
            <option value="33,33,34" ${block.layout.join(',') === '33,33,34' ? 'selected' : ''}>33.3% / 33.3% / 33.3%</option>
            <option value="25,25,50" ${block.layout.join(',') === '25,25,50' ? 'selected' : ''}>25% / 25% / 50%</option>
            <option value="50,25,25" ${block.layout.join(',') === '50,25,25' ? 'selected' : ''}>50% / 25% / 25%</option>
            <option value="25,50,25" ${block.layout.join(',') === '25,50,25' ? 'selected' : ''}>25% / 50% / 25%</option>
          </select>
        </div>`;
    } else if (block.columns.length === 4) {
      layoutHtml = `
        <div class="prop-row" style="margin-top:4px;">
          <span class="prop-row__label">Layout</span>
          <span style="font-size:12px;color:var(--text-muted);">25% / 25% / 25% / 25%</span>
        </div>`;
    } else {
      layoutHtml = `
        <div class="prop-row" style="margin-top:4px;">
          <span class="prop-row__label">Layout</span>
          <span style="font-size:12px;color:var(--text-muted);">100%</span>
        </div>`;
    }

    return `
      <div class="prop-group">
        <div class="prop-group__title">Structure / Row</div>
        <div class="prop-row">
          <span class="prop-row__label">Background Color</span>
          ${this.renderColorPicker(block.bgColor || '#ffffff', 'bgColor')}
        </div>
        <div class="prop-row" style="flex-direction:column;align-items:stretch;margin-top:12px;">
          <span class="prop-row__label" style="margin-bottom:4px;">Background Image URL</span>
          <input class="prop-input" type="url" value="${block.bgImage || ''}" data-prop="bgImage" placeholder="https://..." />
        </div>
        ${this.renderBorderProps(block)}
        <div class="prop-row">
          <span class="prop-row__label">Padding</span>
          <input class="prop-input prop-input--md" type="text" value="${block.padding || '0'}" data-prop="padding" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Col Gap (Horiz)</span>
          <input class="prop-input prop-input--sm" type="number" value="${block.colGapH || 0}" data-prop="colGapH" placeholder="0" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Col Gap (Vert)</span>
          <input class="prop-input prop-input--sm" type="number" value="${block.colGapV || 0}" data-prop="colGapV" placeholder="0" />
        </div>
        ${colsHtml}
        ${layoutHtml}
        <div class="prop-group__title" style="margin-top: 20px;">Column Styles (Equal Height)</div>
        ${block.layout.map((width, i) => `
          <div class="accordion">
            <div class="accordion__header">
              Column ${i + 1} (${width}%)
              <svg class="accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div class="accordion__body">
              <div class="accordion__content">
                <div class="prop-row">
                  <span class="prop-row__label">Background</span>
                  ${this.renderColorPicker(block['colBg_' + i] || 'transparent', 'colBg_' + i)}
                </div>
                <div class="prop-row">
                  <span class="prop-row__label">Border</span>
                  <input class="prop-input prop-input--md" type="text" value="${block['colBorder_' + i] || ''}" data-prop="colBorder_${i}" placeholder="1px solid #ccc" />
                </div>
                <div class="prop-row">
                  <span class="prop-row__label">Padding</span>
                  <input class="prop-input prop-input--md" type="text" value="${block['colPadding_' + i] || ''}" data-prop="colPadding_${i}" placeholder="Top Right Bottom Left" />
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      ${this.renderMobileSettings(block)}`;
  },

  renderBorderProps(block) {
    return `
      <div class="accordion">
        <div class="accordion__header">
          Borders &amp; Radius
          <svg class="accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="accordion__body">
          <div class="accordion__content">
            <div class="prop-row">
              <span class="prop-row__label">All Sides</span>
              <input class="prop-input prop-input--md" type="text" value="${block.border || ''}" data-prop="border" placeholder="e.g. 1px solid #ccc" />
            </div>
            <div class="prop-row">
              <span class="prop-row__label">Top</span>
              <input class="prop-input prop-input--md" type="text" value="${block.borderTop || ''}" data-prop="borderTop" placeholder="e.g. 1px solid #ccc" />
            </div>
            <div class="prop-row">
              <span class="prop-row__label">Right</span>
              <input class="prop-input prop-input--md" type="text" value="${block.borderRight || ''}" data-prop="borderRight" placeholder="e.g. 1px solid #ccc" />
            </div>
            <div class="prop-row">
              <span class="prop-row__label">Bottom</span>
              <input class="prop-input prop-input--md" type="text" value="${block.borderBottom || ''}" data-prop="borderBottom" placeholder="e.g. 1px solid #ccc" />
            </div>
            <div class="prop-row">
              <span class="prop-row__label">Left</span>
              <input class="prop-input prop-input--md" type="text" value="${block.borderLeft || ''}" data-prop="borderLeft" placeholder="e.g. 1px solid #ccc" />
            </div>
            <div class="prop-row">
              <span class="prop-row__label">Border Radius</span>
              <input class="prop-input prop-input--sm" type="text" value="${block.borderRadius || '0px'}" data-prop="borderRadius" />
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ---- Global Styles ----

  renderGlobalStyles() {
    const gs = EmailState.data.globalStyles;

    return `
      <!-- Email Metadata -->
      <div class="prop-group">
        <div class="prop-group__title">
          <svg style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;color:var(--accent-green);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Email Metadata
        </div>
        <div class="prop-row" style="flex-direction:column;align-items:stretch;">
          <span class="prop-row__label" style="margin-bottom:4px;">Subject Line</span>
          <input class="prop-input" type="text" value="${Utils.escapeHTML(EmailState.data.subjectLine)}" data-meta="subjectLine" placeholder="e.g. Your Monthly Newsletter 📬" />
        </div>
        <div class="prop-row" style="flex-direction:column;align-items:stretch;margin-top:12px;">
          <span class="prop-row__label" style="margin-bottom:4px;">Preview Text</span>
          <textarea class="prop-textarea" data-meta="previewText" rows="2" placeholder="The snippet shown after the subject line in inbox..."  style="font-size:12px;min-height:44px;">${Utils.escapeHTML(EmailState.data.previewText)}</textarea>
          <span style="font-size:10px;color:var(--text-muted);margin-top:4px;line-height:1.4;">Appears after the subject line in email clients. Recommended: 40–130 characters.</span>
        </div>
      </div>

      <div class="prop-group">
        <div class="prop-group__title">Global Styles &amp; Layout</div>
        <div class="prop-row">
          <span class="prop-row__label">Background Color</span>
          ${this.renderColorPicker(gs.backgroundColor, 'g-backgroundColor')}
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Content Width</span>
          <div class="number-control">
            <button class="number-control__btn" data-num-dec="g-contentWidth">−</button>
            <input type="number" value="${gs.contentWidth}" data-global="contentWidth" min="400" max="800" />
            <button class="number-control__btn" data-num-inc="g-contentWidth">+</button>
          </div>
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Alignment</span>
          ${this.renderAlignmentRow(gs.contentAlignment, 'g-contentAlignment', true)}
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Underline Links</span>
          <div class="toggle-switch ${gs.underlineLinks ? 'toggle-switch--active' : ''}" data-global-toggle="underlineLinks" data-toggle></div>
        </div>
      </div>

      <!-- Font Styles -->
      <div class="accordion accordion--open">
        <div class="accordion__header">
          Body Font
          <svg class="accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="accordion__body">
          <div class="accordion__content">
            <div class="prop-row">
              <span class="prop-row__label">Font</span>
              <select class="prop-select" data-global="fontFamily" style="width:140px;">
                <option value="Arial, sans-serif" ${gs.fontFamily.includes('Arial') ? 'selected' : ''}>Arial</option>
                <option value="'Lato', sans-serif" ${gs.fontFamily.includes('Lato') ? 'selected' : ''}>Lato</option>
                <option value="Georgia, serif" ${gs.fontFamily.includes('Georgia') ? 'selected' : ''}>Georgia</option>
                <option value="'Times New Roman', serif" ${gs.fontFamily.includes('Times') ? 'selected' : ''}>Times New Roman</option>
                <option value="Verdana, sans-serif" ${gs.fontFamily.includes('Verdana') ? 'selected' : ''}>Verdana</option>
                <option value="'Courier New', monospace" ${gs.fontFamily.includes('Courier') ? 'selected' : ''}>Courier New</option>
              </select>
            </div>
            <div class="prop-row">
              <span class="prop-row__label">Size</span>
              <input class="prop-input prop-input--sm" type="text" value="${gs.fontSize}" data-global="fontSize" />
            </div>
            <div class="prop-row">
              <span class="prop-row__label">Color</span>
              ${this.renderColorPicker(gs.textColor, 'g-textColor')}
            </div>
            <div class="prop-row">
              <span class="prop-row__label">Link Color</span>
              ${this.renderColorPicker(gs.linkColor, 'g-linkColor')}
            </div>
          </div>
        </div>
      </div>

      <!-- Heading Styles -->
      <div class="accordion">
        <div class="accordion__header">
          Heading Styles
          <svg class="accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="accordion__body">
          <div class="accordion__content">
            <div class="prop-row">
              <span class="prop-row__label">H1 Size</span>
              <input class="prop-input prop-input--sm" type="text" value="${gs.h1Size}" data-global="h1Size" />
            </div>
            <div class="prop-row">
              <span class="prop-row__label">H1 Color</span>
              ${this.renderColorPicker(gs.h1Color, 'g-h1Color')}
            </div>
            <div class="prop-row">
              <span class="prop-row__label">H2 Size</span>
              <input class="prop-input prop-input--sm" type="text" value="${gs.h2Size}" data-global="h2Size" />
            </div>
            <div class="prop-row">
              <span class="prop-row__label">H2 Color</span>
              ${this.renderColorPicker(gs.h2Color, 'g-h2Color')}
            </div>
            <div class="prop-row">
              <span class="prop-row__label">H3 Size</span>
              <input class="prop-input prop-input--sm" type="text" value="${gs.h3Size}" data-global="h3Size" />
            </div>
            <div class="prop-row">
              <span class="prop-row__label">H3 Color</span>
              ${this.renderColorPicker(gs.h3Color, 'g-h3Color')}
            </div>
          </div>
        </div>
      </div>

      <!-- Button Styles -->
      <div class="accordion">
        <div class="accordion__header">
          Button Styles
          <svg class="accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="accordion__body">
          <div class="accordion__content">
            <div class="prop-row">
              <span class="prop-row__label">BG Color</span>
              ${this.renderColorPicker(gs.buttonBgColor, 'g-buttonBgColor')}
            </div>
            <div class="prop-row">
              <span class="prop-row__label">Text Color</span>
              ${this.renderColorPicker(gs.buttonTextColor, 'g-buttonTextColor')}
            </div>
            <div class="prop-row">
              <span class="prop-row__label">Radius</span>
              <input class="prop-input prop-input--sm" type="text" value="${gs.buttonBorderRadius}" data-global="buttonBorderRadius" />
            </div>
            <div class="prop-row">
              <span class="prop-row__label">Font Size</span>
              <input class="prop-input prop-input--sm" type="text" value="${gs.buttonFontSize}" data-global="buttonFontSize" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Responsive / Mobile Styles -->
      <div class="accordion">
        <div class="accordion__header">
          <svg style="width:14px;height:14px;margin-right:6px;color:var(--accent-blue);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          Responsive / Mobile
          <svg class="accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="accordion__body">
          <div class="accordion__content">
            <div class="prop-row">
              <span class="prop-row__label">Body Size</span>
              <input class="prop-input prop-input--sm" type="text" value="${gs.mobileFontSize || ''}" data-global="mobileFontSize" placeholder="Inherit" />
            </div>
            <div class="prop-row">
              <span class="prop-row__label">H1 Size</span>
              <input class="prop-input prop-input--sm" type="text" value="${gs.mobileH1Size || ''}" data-global="mobileH1Size" placeholder="Inherit" />
            </div>
            <div class="prop-row">
              <span class="prop-row__label">H2 Size</span>
              <input class="prop-input prop-input--sm" type="text" value="${gs.mobileH2Size || ''}" data-global="mobileH2Size" placeholder="Inherit" />
            </div>
            <div class="prop-row">
              <span class="prop-row__label">H3 Size</span>
              <input class="prop-input prop-input--sm" type="text" value="${gs.mobileH3Size || ''}" data-global="mobileH3Size" placeholder="Inherit" />
            </div>
            <div class="prop-row">
              <span class="prop-row__label">Button Size</span>
              <input class="prop-input prop-input--sm" type="text" value="${gs.mobileButtonFontSize || ''}" data-global="mobileButtonFontSize" placeholder="Inherit" />
            </div>
          </div>
        </div>
      </div>`;
  },

  // ---- Shared rendering helpers ----

  renderColorPicker(value, propKey) {
    return `
      <div class="color-picker-wrap">
        <div class="color-swatch" style="background:${value};">
          <input type="color" value="${value}" data-color="${propKey}" />
        </div>
        <input class="color-hex-input" type="text" value="${value}" data-color-hex="${propKey}" />
      </div>`;
  },

  renderAlignmentRow(value, propKey, isGlobal = false) {
    const makeBtn = (align, icon) => {
      const active = value === align ? 'align-btn--active' : '';
      return `<button class="align-btn ${active}" data-align="${align}" data-align-prop="${propKey}">${icon}</button>`;
    };

    return `
      <div class="prop-row" style="margin-top:8px;">
        ${!isGlobal ? '<span class="prop-row__label">Alignment</span>' : ''}
        <div class="align-buttons">
          ${makeBtn('left', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="15" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="17" y2="18"/></svg>')}
          ${makeBtn('center', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="6" x2="18" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="5" y1="18" x2="19" y2="18"/></svg>')}
          ${makeBtn('right', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="9" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="7" y1="18" x2="21" y2="18"/></svg>')}
        </div>
      </div>`;
  },

  /**
   * Render responsive / mobile settings for any block
   */
  renderMobileSettings(block) {
    let extraSettings = '';

    // Structure: stack columns on mobile
    if (block.type === 'structure' && block.layout && block.layout.length > 1) {
      extraSettings += `
        <div class="prop-row">
          <span class="prop-row__label">
            <svg style="width:13px;height:13px;margin-right:3px;vertical-align:-1px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/></svg>
            Stack columns
          </span>
          <div class="toggle-switch ${block.mobileStackColumns !== false ? 'toggle-switch--active' : ''}" data-prop="mobileStackColumns" data-toggle></div>
        </div>
        <span style="font-size:10px;color:var(--text-muted);margin-top:-8px;display:block;margin-bottom:8px;line-height:1.4;">Columns become single column on mobile</span>`;
    }

    // Button: full width on mobile
    if (block.type === 'button') {
      extraSettings += `
        <div class="prop-row">
          <span class="prop-row__label">
            <svg style="width:13px;height:13px;margin-right:3px;vertical-align:-1px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="10" rx="3"/><path d="M8 12h8"/></svg>
            Full width button
          </span>
          <div class="toggle-switch ${block.mobileFullWidth !== false ? 'toggle-switch--active' : ''}" data-prop="mobileFullWidth" data-toggle></div>
        </div>`;
    }

    // Text: mobile font size
    if (block.type === 'text') {
      extraSettings += `
        <div class="prop-row">
          <span class="prop-row__label">Font size</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.mobileFontSize || ''}" data-prop="mobileFontSize" placeholder="e.g. 16px" />
        </div>
        <span style="font-size:10px;color:var(--text-muted);margin-top:-8px;display:block;margin-bottom:8px;line-height:1.4;">Override text size on mobile</span>`;
    }

    // Text, Image, Button: mobile alignment
    if (['text', 'image', 'button'].includes(block.type)) {
      extraSettings += this.renderAlignmentRow(block.mobileAlign || '', 'mobileAlign');
    }
    
    // All blocks: mobile padding and margin
    extraSettings += `
      <div class="prop-row">
        <span class="prop-row__label">Padding</span>
        <input class="prop-input prop-input--md" type="text" value="${block.mobilePadding || ''}" data-prop="mobilePadding" placeholder="Inherit" />
      </div>
      <div class="prop-row">
        <span class="prop-row__label">Margin</span>
        <input class="prop-input prop-input--md" type="text" value="${block.mobileMargin || ''}" data-prop="mobileMargin" placeholder="Inherit" />
      </div>`;

    return `
      <div class="accordion">
        <div class="accordion__header">
          <svg style="width:14px;height:14px;margin-right:6px;color:var(--accent-blue);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          Responsive / Mobile
          <svg class="accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="accordion__body">
          <div class="accordion__content">
            <div class="prop-row">
              <span class="prop-row__label">
                <svg style="width:13px;height:13px;margin-right:3px;vertical-align:-1px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                Hide on mobile
              </span>
              <div class="toggle-switch ${block.hideOnMobile ? 'toggle-switch--active' : ''}" data-prop="hideOnMobile" data-toggle></div>
            </div>
            <div class="prop-row">
              <span class="prop-row__label">
                <svg style="width:13px;height:13px;margin-right:3px;vertical-align:-1px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                Hide on desktop
              </span>
              <div class="toggle-switch ${block.hideOnDesktop ? 'toggle-switch--active' : ''}" data-prop="hideOnDesktop" data-toggle></div>
            </div>
            ${extraSettings}
          </div>
        </div>
      </div>`;
  },

  /**
   * Bind events for property controls
   */
  bindEvents() {
    const body = document.getElementById('properties-panel-body');
    if (!body) return;

    const selectedBlock = EmailState.getSelectedBlock();
    const blockId = selectedBlock?.id;

    // Layout change
    const layoutSelect = document.getElementById('prop-layout');
    if (layoutSelect && blockId) {
      layoutSelect.addEventListener('change', (e) => {
        const layout = e.target.value.split(',').map(Number);
        EmailState.updateBlockWithSnapshot(blockId, { layout });
        Canvas.render();
      });
    }

    // Columns change
    const colsSelect = document.getElementById('prop-columns');
    if (colsSelect && blockId) {
      colsSelect.addEventListener('change', (e) => {
        const newCount = parseInt(e.target.value, 10);
        let currentCols = selectedBlock.columns || [];
        
        if (newCount > currentCols.length) {
          for (let i = currentCols.length; i < newCount; i++) {
            currentCols.push([]);
          }
        } else if (newCount < currentCols.length) {
          const lastValidCol = currentCols[newCount - 1];
          for (let i = newCount; i < currentCols.length; i++) {
            lastValidCol.push(...currentCols[i]);
          }
          currentCols = currentCols.slice(0, newCount);
        }
        
        let layout = [];
        if (newCount === 1) layout = [100];
        else if (newCount === 2) layout = [50, 50];
        else if (newCount === 3) layout = [33, 33, 34];
        else if (newCount === 4) layout = [25, 25, 25, 25];

        EmailState.updateBlockWithSnapshot(blockId, { columns: currentCols, layout });
        Canvas.render();
        PropertiesPanel.render(selectedBlock);
      });
    }

    // RTE formatting buttons
    body.querySelectorAll('.rte-btn').forEach(btn => {
      // Prevent losing focus on the text editor when clicking formatting buttons
      btn.addEventListener('mousedown', (e) => e.preventDefault());
      
      btn.addEventListener('click', (e) => {
        const action = btn.dataset.rteAction;
        let val = null;
        if (action === 'link') {
          val = prompt('Enter link URL (e.g. https://example.com):');
          if (!val) return;
          document.execCommand('createLink', false, val);
        } else if (action === 'image') {
          val = prompt('Enter image URL:');
          if (!val) return;
          const sel = window.getSelection();
          if (sel.rangeCount > 0) {
            sel.getRangeAt(0).collapse(true); // Collapse to start so it doesn't replace text
          }
          const imgHtml = `<img src="${val}" style="height: 1.2em; width: auto; vertical-align: middle; margin-right: 6px; display: inline-block;" alt="icon" />`;
          document.execCommand('insertHTML', false, imgHtml);
        } else {
          document.execCommand(action, false, null);
        }

        // Save the updated HTML back to the block state
        if (blockId) {
          const editable = document.querySelector(`.editable-text[data-block-id="${blockId}"]`);
          if (editable) {
            EmailState.updateBlockWithSnapshot(blockId, { content: editable.innerHTML });
          }
        }
      });
    });

    // Inline Image properties handling
    const imageId = EmailState.data.selectedInlineImageId;
    if (imageId) {
      body.querySelectorAll('.inline-img-prop').forEach(input => {
        const handler = Utils.debounce(() => {
          const prop = input.dataset.imgProp;
          const img = document.querySelector(`img[data-inline-id="${imageId}"]`);
          if (!img) return;
          
          if (prop === 'src') {
            img.setAttribute('src', input.value);
          } else {
            img.style[prop] = input.value;
          }
          
          const editable = img.closest('.editable-text');
          if (editable) {
            const blockEl = editable.closest('.canvas-block');
            if (blockEl) {
              EmailState.updateBlockWithSnapshot(blockEl.dataset.blockId, { content: editable.innerHTML });
            }
          }
        }, 300);
        
        input.addEventListener('input', handler);
        input.addEventListener('change', handler);
      });
      
      // Text wrap buttons
      body.querySelectorAll('.text-wrap-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          body.querySelectorAll('.text-wrap-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const wrap = btn.dataset.wrap;
          const img = document.querySelector(`img[data-inline-id="${imageId}"]`);
          if (!img) return;
          
          if (wrap === 'block') {
            img.style.display = 'block';
            img.style.float = 'none';
          } else if (wrap === 'left') {
            img.style.display = 'inline-block';
            img.style.float = 'left';
            img.style.marginRight = img.style.marginRight || '10px';
          } else if (wrap === 'right') {
            img.style.display = 'inline-block';
            img.style.float = 'right';
            img.style.marginLeft = img.style.marginLeft || '10px';
          } else {
            img.style.display = 'inline-block';
            img.style.float = 'none'; // reset float
          }
          
          const editable = img.closest('.editable-text');
          if (editable) {
            const blockEl = editable.closest('.canvas-block');
            if (blockEl) {
              EmailState.updateBlockWithSnapshot(blockEl.dataset.blockId, { content: editable.innerHTML });
            }
          }
        });
      });
      
      // Inline image number +/- buttons
      body.querySelectorAll('.prop-number-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const isPlus = btn.classList.contains('btn-plus');
          const target = btn.dataset.target;
          const input = document.getElementById(`input-${target}`);
          if (!input) return;
          
          let val = parseInt(input.value) || 0;
          val += isPlus ? 1 : -1;
          
          // Width / radius can't be negative
          if ((target === 'width' || target === 'borderRadius') && val < 0) {
            val = 0;
          }
          
          input.value = val + 'px'; // assume px for incrementing
          
          // Manually dispatch input event to trigger the save handler
          input.dispatchEvent(new Event('input'));
        });
      });
      
      // Inline image toggles (hide on mobile/desktop)
      body.querySelectorAll('.inline-img-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
          const isActive = toggle.classList.toggle('active');
          const className = toggle.dataset.imgToggle;
          const img = document.querySelector(`img[data-inline-id="${imageId}"]`);
          if (!img) return;
          
          if (isActive) {
            img.classList.add(className);
          } else {
            img.classList.remove(className);
          }
          
          const editable = img.closest('.editable-text');
          if (editable) {
            const blockEl = editable.closest('.canvas-block');
            if (blockEl) {
              EmailState.updateBlockWithSnapshot(blockEl.dataset.blockId, { content: editable.innerHTML });
            }
          }
        });
      });
      
      const deleteBtn = document.getElementById('btn-delete-inline-img');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
          const img = document.querySelector(`img[data-inline-id="${imageId}"]`);
          if (!img) return;
          const editable = img.closest('.editable-text');
          img.remove();
          
          if (editable) {
            const blockEl = editable.closest('.canvas-block');
            if (blockEl) {
              EmailState.updateBlockWithSnapshot(blockEl.dataset.blockId, { content: editable.innerHTML });
            }
          }
          EmailState.selectInlineImage(null);
          PropertiesPanel.render();
        });
      }
      
      const backBtn = document.getElementById('btn-back-to-text');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          EmailState.selectInlineImage(null);
          PropertiesPanel.render();
        });
      }
    }

    // Email metadata inputs (subject line, preview text)
    body.querySelectorAll('[data-meta]').forEach(input => {
      const handler = Utils.debounce(() => {
        const key = input.dataset.meta;
        EmailState.data[key] = input.value;
        EmailState.save();
      }, 300);
      input.addEventListener('input', handler);
      input.addEventListener('change', handler);
    });

    // Simple prop inputs (skip toggles — they have their own handler)
    body.querySelectorAll('[data-prop]:not([data-toggle])').forEach(input => {
      const handler = Utils.debounce(() => {
        if (!blockId) return;
        const prop = input.dataset.prop;
        const parentInfo = EmailState.findParent(blockId);
        if (parentInfo) {
          EmailState.updateChildBlock(parentInfo.parent.id, parentInfo.colIndex, blockId, { [prop]: input.value });
          Canvas.render();
        } else {
          EmailState.updateBlock(blockId, { [prop]: input.value });
          Canvas.render();
        }
      }, 300);

      input.addEventListener('input', handler);
      input.addEventListener('change', handler);
    });

    // Color pickers
    body.querySelectorAll('[data-color]').forEach(input => {
      input.addEventListener('input', (e) => {
        const key = input.dataset.color;
        const hexInput = body.querySelector(`[data-color-hex="${key}"]`);
        if (hexInput) hexInput.value = e.target.value;

        if (key.startsWith('g-')) {
          const globalKey = key.substring(2);
          EmailState.updateGlobalStyles({ [globalKey]: e.target.value });
        } else if (blockId) {
          EmailState.updateBlock(blockId, { [key]: e.target.value });
          Canvas.render();
        }
      });
    });

    // Color hex inputs
    body.querySelectorAll('[data-color-hex]').forEach(input => {
      input.addEventListener('change', () => {
        const key = input.dataset.colorHex;
        let val = input.value.trim();
        if (!val.startsWith('#')) val = '#' + val;

        const swatch = body.querySelector(`[data-color="${key}"]`);
        if (swatch) swatch.value = val;
        swatch?.parentElement?.style && (swatch.parentElement.style.background = val);

        if (key.startsWith('g-')) {
          const globalKey = key.substring(2);
          EmailState.updateGlobalStyles({ [globalKey]: val });
        } else if (blockId) {
          EmailState.updateBlock(blockId, { [key]: val });
          Canvas.render();
        }
      });
    });

    // Toggle switches
    body.querySelectorAll('[data-toggle]').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const isActive = toggle.classList.toggle('toggle-switch--active');

        if (toggle.dataset.prop && blockId) {
          const parentInfo = EmailState.findParent(blockId);
          if (parentInfo) {
            EmailState.updateChildBlock(parentInfo.parent.id, parentInfo.colIndex, blockId, { [toggle.dataset.prop]: isActive });
          } else {
            EmailState.updateBlock(blockId, { [toggle.dataset.prop]: isActive });
          }
          Canvas.render();
        } else if (toggle.dataset.globalToggle) {
          EmailState.updateGlobalStyles({ [toggle.dataset.globalToggle]: isActive });
        } else if (toggle.dataset.socialToggle !== undefined) {
          const idx = parseInt(toggle.dataset.socialToggle);
          if (selectedBlock?.icons?.[idx] !== undefined) {
            selectedBlock.icons[idx].show = isActive;
            EmailState.save();
            Canvas.render();
          }
        }
      });
    });

    // Alignment buttons
    body.querySelectorAll('[data-align]').forEach(btn => {
      btn.addEventListener('click', () => {
        const prop = btn.dataset.alignProp;
        const val = btn.dataset.align;

        // Update active state visually
        btn.closest('.align-buttons').querySelectorAll('.align-btn').forEach(b => b.classList.remove('align-btn--active'));
        btn.classList.add('align-btn--active');

        if (prop.startsWith('g-')) {
          const globalKey = prop.substring(2);
          EmailState.updateGlobalStyles({ [globalKey]: val });
        } else if (blockId) {
          const actualProp = prop === 'text-align' ? 'align' : prop;
          const parentInfo = EmailState.findParent(blockId);
          if (parentInfo) {
            EmailState.updateChildBlock(parentInfo.parent.id, parentInfo.colIndex, blockId, { [actualProp]: val });
          } else {
            EmailState.updateBlock(blockId, { [actualProp]: val });
          }
          Canvas.render();
        }
      });
    });

    // Global style inputs
    body.querySelectorAll('[data-global]').forEach(input => {
      const handler = Utils.debounce(() => {
        const key = input.dataset.global;
        let val = input.value;
        if (key === 'contentWidth') val = parseInt(val) || 600;
        EmailState.updateGlobalStyles({ [key]: val });
      }, 300);

      input.addEventListener('input', handler);
      input.addEventListener('change', handler);
    });

    // Number control +/- buttons
    body.querySelectorAll('[data-num-inc], [data-num-dec]').forEach(btn => {
      btn.addEventListener('click', () => {
        const isInc = btn.dataset.numInc !== undefined;
        const key = btn.dataset.numInc || btn.dataset.numDec;
        const input = btn.closest('.number-control').querySelector('input');
        if (!input) return;

        let val = parseInt(input.value) || 0;
        val += isInc ? 10 : -10;
        val = Math.max(400, Math.min(800, val));
        input.value = val;
        input.dispatchEvent(new Event('change'));
      });
    });

    // Accordion toggles
    body.querySelectorAll('.accordion__header').forEach(header => {
      header.addEventListener('click', () => {
        header.parentElement.classList.toggle('accordion--open');
      });
    });

    // Social URL inputs
    body.querySelectorAll('[data-social-url]').forEach(input => {
      input.addEventListener('change', () => {
        const idx = parseInt(input.dataset.socialUrl);
        if (selectedBlock?.icons?.[idx] !== undefined) {
          selectedBlock.icons[idx].url = input.value;
          EmailState.save();
        }
      });
    });

    // Social Image inputs
    body.querySelectorAll('[data-social-image]').forEach(input => {
      input.addEventListener('change', () => {
        const idx = parseInt(input.dataset.socialImage);
        if (selectedBlock?.icons?.[idx] !== undefined) {
          selectedBlock.icons[idx].imageUrl = input.value;
          EmailState.save();
          Canvas.render();
        }
      });
    });

    // Menu item inputs
    body.querySelectorAll('[data-menu-text]').forEach(input => {
      input.addEventListener('change', () => {
        const idx = parseInt(input.dataset.menuText);
        if (selectedBlock?.items?.[idx] !== undefined) {
          selectedBlock.items[idx].text = input.value;
          EmailState.save();
          Canvas.render();
        }
      });
    });

    body.querySelectorAll('[data-menu-link]').forEach(input => {
      input.addEventListener('change', () => {
        const idx = parseInt(input.dataset.menuLink);
        if (selectedBlock?.items?.[idx] !== undefined) {
          selectedBlock.items[idx].link = input.value;
          EmailState.save();
        }
      });
    });

    body.querySelectorAll('[data-remove-menu]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.removeMenu);
        if (selectedBlock?.items) {
          selectedBlock.items.splice(idx, 1);
          EmailState.save();
          Canvas.render();
          this.render();
        }
      });
    });

    // Add menu item
    body.querySelector('[data-action="add-menu-item"]')?.addEventListener('click', () => {
      if (selectedBlock?.items) {
        selectedBlock.items.push({ text: 'NEW', link: '#' });
        EmailState.save();
        Canvas.render();
        this.render();
      }
    });
  },

  /**
   * Switch tabs
   */
  setTab(tab) {
    this.activeTab = tab;
    document.querySelectorAll('.panel-right__tab').forEach(t => {
      t.classList.toggle('panel-right__tab--active', t.dataset.tab === tab);
    });
    this.render();
  },

  /**
   * Initialize
   */
  init() {
    // Tab click handlers
    document.querySelectorAll('.panel-right__tab').forEach(tab => {
      tab.addEventListener('click', () => this.setTab(tab.dataset.tab));
    });

    // Listen to state changes
    EmailState.on((changeType) => {
      if (changeType === 'inlineImageSelected' || changeType === 'blockSelected' || changeType === 'blockDeselected') {
        // Handle visual selection outline for inline images
        document.querySelectorAll('.inline-image-selected').forEach(img => img.classList.remove('inline-image-selected'));
        if (EmailState.data.selectedInlineImageId) {
          const selectedImg = document.querySelector(`img[data-inline-id="${EmailState.data.selectedInlineImageId}"]`);
          if (selectedImg) selectedImg.classList.add('inline-image-selected');
        }

        if (this.activeTab === 'properties') {
          this.render();
        }
      }
      if (changeType === 'globalStylesUpdated') {
        Canvas.render();
      }
    });

    this.render();
  }
};

window.PropertiesPanel = PropertiesPanel;
