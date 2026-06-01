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
      const selected = EmailState.getSelectedBlock();
      if (selected) {
        body.innerHTML = this.renderBlockProperties(selected);
      } else {
        body.innerHTML = this.renderEmptyState();
      }
    }

    this.bindEvents();
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
          <span class="prop-row__label">Text Color</span>
          ${this.renderColorPicker(block.textColor || '', 'textColor')}
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Font Size</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.fontSize || ''}" data-prop="fontSize" placeholder="Inherit" />
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
        <div class="prop-row">
          <span class="prop-row__label">Padding</span>
          <input class="prop-input prop-input--md" type="text" value="${block.padding || '10px 20px'}" data-prop="padding" />
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
        ${this.renderAlignmentRow(block.align || 'center', 'align')}
        <div class="prop-row" style="margin-top:4px;">
          <span class="prop-row__label">Background</span>
          ${this.renderColorPicker(block.bgColor || 'transparent', 'bgColor')}
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Border</span>
          <input class="prop-input prop-input--md" type="text" value="${block.border || ''}" data-prop="border" placeholder="e.g. 1px solid #ccc" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Border Radius</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.borderRadius || '0px'}" data-prop="borderRadius" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Padding</span>
          <input class="prop-input prop-input--md" type="text" value="${block.padding || '10px 20px'}" data-prop="padding" />
        </div>
      </div>
      ${this.renderMobileSettings(block)}`;
  },

  renderButtonProps(block) {
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
          ${this.renderColorPicker(block.bgColor || '#f4001e', 'bgColor')}
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Text Color</span>
          ${this.renderColorPicker(block.textColor || '#ffffff', 'textColor')}
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Font Size</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.fontSize || '16px'}" data-prop="fontSize" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Font Weight</span>
          <select class="prop-select" data-prop="fontWeight" style="width: 80px;">
            <option value="normal" ${block.fontWeight === 'normal' ? 'selected' : ''}>Normal</option>
            <option value="bold" ${block.fontWeight === 'bold' || !block.fontWeight ? 'selected' : ''}>Bold</option>
          </select>
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Border</span>
          <input class="prop-input prop-input--md" type="text" value="${block.border || ''}" data-prop="border" placeholder="2px solid #000" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Border Radius</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.borderRadius || '0px'}" data-prop="borderRadius" />
        </div>
        ${this.renderAlignmentRow(block.align || 'center', 'align')}
        <div class="prop-row">
          <span class="prop-row__label">Full Width</span>
          <div class="toggle-switch ${block.fullWidth ? 'toggle-switch--active' : ''}" data-prop="fullWidth" data-toggle></div>
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
        <div class="prop-row" style="border:1px solid var(--border-color);border-radius:6px;padding:8px;margin-bottom:8px;">
          <div style="display:flex;align-items:center;gap:8px;flex:1;">
            <span style="font-weight:600;text-transform:capitalize;font-size:12px;min-width:65px;">${icon.platform}</span>
            <input class="prop-input" type="url" value="${icon.url || ''}" data-social-url="${i}" placeholder="URL" style="flex:1;font-size:11px;" />
          </div>
          <div class="toggle-switch ${icon.show ? 'toggle-switch--active' : ''}" data-social-toggle="${i}" data-toggle style="margin-left:8px;flex-shrink:0;"></div>
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
          <span class="prop-row__label">Font Size</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.fontSize || '14px'}" data-prop="fontSize" />
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
        <div class="prop-row" style="margin-top:12px;">
          <span class="prop-row__label">Border</span>
          <input class="prop-input prop-input--md" type="text" value="${block.border || ''}" data-prop="border" placeholder="1px solid #ccc" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Border Radius</span>
          <input class="prop-input prop-input--sm" type="text" value="${block.borderRadius || '0px'}" data-prop="borderRadius" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Padding</span>
          <input class="prop-input prop-input--md" type="text" value="${block.padding || '0'}" data-prop="padding" />
        </div>
        <div class="prop-row">
          <span class="prop-row__label">Layout</span>
          <span style="font-size:12px;color:var(--text-muted);">${block.layout.join(' / ')}%</span>
        </div>
      </div>
      ${this.renderMobileSettings(block)}`;
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
      if (changeType === 'blockSelected' || changeType === 'blockDeselected') {
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
