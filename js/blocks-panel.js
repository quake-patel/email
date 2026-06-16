// ==========================================================================
// Email Newsletter Builder — Blocks Panel (Left Panel)
// ==========================================================================

const BlocksPanel = {
  activeTab: 'structures',

  // Structure definitions
  structures: [
    { id: '1col', label: '1 Column', columns: [100] },
    { id: '2col-50', label: '2 Columns (50/50)', columns: [50, 50] },
    { id: '2col-33-67', label: '2 Columns (33/67)', columns: [33, 67] },
    { id: '2col-67-33', label: '2 Columns (67/33)', columns: [67, 33] },
    { id: '2col-25-75', label: '2 Columns (25/75)', columns: [25, 75] },
    { id: '2col-75-25', label: '2 Columns (75/25)', columns: [75, 25] },
    { id: '3col', label: '3 Columns', columns: [33, 33, 34] },
    { id: '4col', label: '4 Columns', columns: [25, 25, 25, 25] },
  ],

  // Content block definitions
  contentBlocks: [
    { type: 'text', label: 'Text', icon: 'text' },
    { type: 'image', label: 'Image', icon: 'image' },
    { type: 'button', label: 'Button', icon: 'button' },
    { type: 'divider', label: 'Divider', icon: 'divider' },
    { type: 'spacer', label: 'Spacer', icon: 'spacer' },
    { type: 'social', label: 'Social', icon: 'social' },
    { type: 'menu', label: 'Menu', icon: 'menu' },
    { type: 'html', label: 'HTML', icon: 'html' },
  ],

  /**
   * Get icon SVG for a block type
   */
  getIcon(iconName) {
    const icons = {
      text: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>',
      image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
      button: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="10" rx="3"/><path d="M8 12h8"/></svg>',
      divider: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18"/></svg>',
      spacer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14"/><path d="M5 5h14"/><path d="M5 19h14"/></svg>',
      social: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
      menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>',
      html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    };
    return icons[iconName] || '';
  },

  /**
   * Create a default block object for a given type
   */
  createBlock(type) {
    const gs = EmailState.data.globalStyles;
    const defaults = {
      text: {
        type: 'text',
        content: '<p style="margin:0;">Enter your text here. Edit this to add your content.</p>',
        align: 'left',
        padding: '10px 20px',
        textColor: '',      // Empty means inherit from global
        fontSize: '',       // Empty means inherit from global
        lineHeight: '1.5',
        fontFamily: '',     // Empty means inherit from global
        hideOnMobile: false,
        hideOnDesktop: false,
        mobileFontSize: '',
      },
      image: {
        type: 'image',
        src: '',
        alt: '',
        link: '',
        width: '100%',
        align: 'center',
        padding: '10px 20px',
        borderRadius: '0px',
        border: '',
        responsive: true,
      },
      button: {
        type: 'button',
        text: 'SHOP NOW',
        link: '#',
        bgColor: gs.buttonBgColor,
        textColor: gs.buttonTextColor,
        borderRadius: gs.buttonBorderRadius,
        fontSize: gs.buttonFontSize,
        fontWeight: 'bold',
        border: '',
        padding: '10px 20px',
        align: 'center',
        fullWidth: false,
        hideOnMobile: false,
        hideOnDesktop: false,
        mobileFullWidth: true,
      },
      divider: {
        type: 'divider',
        color: '#cccccc',
        thickness: '1px',
        width: '100%',
        style: 'solid',
        padding: '10px 20px',
      },
      spacer: {
        type: 'spacer',
        height: '30px',
      },
      social: {
        type: 'social',
        icons: [
          { platform: 'facebook', url: '#', show: true },
          { platform: 'twitter', url: '#', show: true },
          { platform: 'instagram', url: '#', show: true },
          { platform: 'youtube', url: '#', show: true },
          { platform: 'linkedin', url: '#', show: false },
          { platform: 'custom 1', url: '#', imageUrl: '', show: false },
          { platform: 'custom 2', url: '#', imageUrl: '', show: false },
        ],
        iconSize: '24px',
        align: 'center',
        padding: '15px 20px',
      },
      menu: {
        type: 'menu',
        items: [
          { text: 'HOME', link: '#' },
          { text: 'ABOUT', link: '#' },
          { text: 'SHOP', link: '#' },
          { text: 'CONTACT', link: '#' },
        ],
        fontFamily: gs.fontFamily,
        fontSize: '14px',
        color: '#232429',
        align: 'center',
        padding: '10px 20px',
        fullWidth: false,
      },
      html: {
        type: 'html',
        code: '<div style="padding: 10px; text-align: center; color: #666;">Custom HTML block</div>',
        padding: '0',
      },
    };

    const block = {
      id: Utils.generateId(type),
      ...defaults[type],
    };

    return block;
  },

  /**
   * Create a structure (row with columns)
   */
  createStructure(structureDef) {
    return {
      id: Utils.generateId('structure'),
      type: 'structure',
      layout: structureDef.columns,
      columns: structureDef.columns.map(() => []),
      bgColor: '#ffffff',
      bgImage: '',
      border: '',
      borderRadius: '0px',
      padding: '0',
      hideOnMobile: false,
      hideOnDesktop: false,
      mobileStackColumns: true,
    };
  },

  render() {
    const container = document.getElementById('blocks-panel-body');
    if (!container) return;

    if (this.activeTab === 'structures') {
      container.innerHTML = this.renderStructures();
    } else {
      container.innerHTML = this.renderContentBlocks();
    }

    this.bindDragEvents();
  },

  /**
   * Render structures grid
   */
  renderStructures() {
    let html = '<div class="panel-section-title" style="font-size:10px; font-weight:800; color:var(--text-muted); letter-spacing:1px; margin-bottom: 8px;">LAYOUT STRUCTURES</div>';
    html += '<div class="structures-grid">';

    this.structures.forEach(s => {
      const colsHtml = s.columns.map(w =>
        `<div class="structure-card__col" style="flex:${w} 0 0%"></div>`
      ).join('');

      html += `
        <div class="structure-card" draggable="true" data-structure-id="${s.id}">
          <div class="structure-card__preview">${colsHtml}</div>
        </div>`;
    });

    html += '</div>';
    return html;
  },

  /**
   * Render content blocks grid
   */
  renderContentBlocks() {
    let html = '<div class="panel-section-title" style="font-size:10px; font-weight:800; color:var(--text-muted); letter-spacing:1px; margin-bottom: 8px;">CONTENT BLOCKS</div>';
    html += '<div class="blocks-grid">';

    this.contentBlocks.forEach(b => {
      html += `
        <div class="block-card" draggable="true" data-block-type="${b.type}">
          <div class="block-card__icon" style="color:var(--accent-green); margin-bottom: 8px;">${this.getIcon(b.icon)}</div>
          <div class="block-card__label" style="font-size: 11px; color: var(--text-secondary);">${b.label}</div>
        </div>`;
    });

    html += '</div>';
    return html;
  },

  /**
   * Switch tabs
   */
  setTab(tab) {
    this.activeTab = tab;
    document.querySelectorAll('.panel-left .panel-tab').forEach(t => {
      t.classList.toggle('panel-tab--active', t.dataset.tab === tab);
    });
    this.render();
  },

  /**
   * Bind drag events to draggable items
   */
  bindDragEvents() {
    // Structures
    document.querySelectorAll('.structure-card[draggable]').forEach(card => {
      card.addEventListener('dragstart', (e) => {
        const structId = card.dataset.structureId;
        e.dataTransfer.setData('application/x-structure-id', structId);
        e.dataTransfer.effectAllowed = 'copy';
        card.style.opacity = '0.5';

        // Custom drag image
        const ghost = document.createElement('div');
        ghost.className = 'drag-ghost';
        ghost.textContent = this.structures.find(s => s.id === structId)?.label || 'Structure';
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, 60, 18);
        setTimeout(() => ghost.remove(), 0);
      });

      card.addEventListener('dragend', () => {
        card.style.opacity = '1';
      });
    });

    // Content blocks
    document.querySelectorAll('.block-card[draggable]').forEach(card => {
      card.addEventListener('dragstart', (e) => {
        const blockType = card.dataset.blockType;
        e.dataTransfer.setData('application/x-block-type', blockType);
        e.dataTransfer.effectAllowed = 'copy';
        card.style.opacity = '0.5';

        const ghost = document.createElement('div');
        ghost.className = 'drag-ghost';
        ghost.textContent = this.contentBlocks.find(b => b.type === blockType)?.label || 'Block';
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, 50, 18);
        setTimeout(() => ghost.remove(), 0);
      });

      card.addEventListener('dragend', () => {
        card.style.opacity = '1';
      });
    });
  },

  /**
   * Initialize
   */
  init() {
    // Tab click handlers
    document.querySelectorAll('.panel-left .panel-tab').forEach(tab => {
      tab.addEventListener('click', () => this.setTab(tab.dataset.tab));
    });
    this.render();
  }
};

window.BlocksPanel = BlocksPanel;
