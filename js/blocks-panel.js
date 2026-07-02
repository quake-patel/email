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
    { id: '2col-15-85', label: '2 Columns (15/85) - Icon Left', columns: [15, 85] },
    { id: '2col-85-15', label: '2 Columns (85/15) - Icon Right', columns: [85, 15] },
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
        bgColor: '',
        textColor: '',
        borderRadius: '',
        fontSize: '',
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
        fontFamily: '',
        fontSize: '14px',
        mobileFontSize: '',
        color: '#232429',
        align: 'center',
        padding: '10px 20px',
        fullWidth: false,
        width: '100%',
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
    } else if (this.activeTab === 'components') {
      container.innerHTML = this.renderStoredComponents();
    } else if (this.activeTab === 'layers') {
      container.innerHTML = this.renderLayers();
    } else {
      container.innerHTML = this.renderContentBlocks();
    }

    this.bindEvents();
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
   * Render stored components grid
   */
  renderStoredComponents() {
    let html = '<div class="panel-section-title" style="font-size:10px; font-weight:800; color:var(--text-muted); letter-spacing:1px; margin-bottom: 8px;">SAVED COMPONENTS</div>';
    const components = EmailState.getStoredComponents();
    
    if (components.length === 0) {
      html += '<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 12px;">No saved components yet. Save a block from the canvas to see it here.</div>';
      return html;
    }

    html += '<div class="blocks-grid">';

    components.forEach(c => {
      const isStructure = c.data.type === 'structure';
      const icon = isStructure 
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>'
        : this.getIcon(this.contentBlocks.find(b => b.type === c.data.type)?.icon || 'html');

      html += `
        <div class="block-card" style="position:relative;" draggable="true" data-component-id="${c.id}">
          <button class="delete-component-btn" data-id="${c.id}" style="position:absolute;top:4px;right:4px;background:none;border:none;color:#999;cursor:pointer;padding:2px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px;height:12px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div class="block-card__icon" style="color:var(--accent-blue); margin-bottom: 8px;">${icon}</div>
          <div class="block-card__label" style="font-size: 11px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 4px;" title="${c.name}">${c.name}</div>
        </div>`;
    });

    html += '</div>';
    return html;
  },

  /**
   * Render layers (tree view of email)
   */
  renderLayers() {
    let html = '<div class="panel-section-title" style="font-size:10px; font-weight:800; color:var(--text-muted); letter-spacing:1px; margin-bottom: 8px;">LAYERS</div>';
    
    const blocks = EmailState.getBlocks();
    if (blocks.length === 0) {
      html += '<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 12px;">No blocks added yet.</div>';
      return html;
    }

    html += '<div class="layers-tree" style="display:flex; flex-direction:column; gap:2px; overflow-y:auto; padding-bottom: 20px;">';
    
    const selectedId = EmailState.data.selectedBlockId;

    const renderNode = (node, depth, parentId = null, colIndex = null, childIndex = null) => {
      const isSelected = selectedId === node.id;
      const bg = isSelected ? 'rgba(139, 92, 246, 0.1)' : 'transparent';
      const color = isSelected ? 'var(--accent-blue)' : 'var(--text-color)';
      const weight = isSelected ? '600' : '400';
      const pl = depth * 12 + 8;
      
      let icon = '';
      let label = '';
      if (node.type === 'structure') {
        icon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="21"/></svg>';
        label = 'Structure';
      } else {
        const blockDef = this.contentBlocks.find(b => b.type === node.type);
        icon = this.getIcon(blockDef ? blockDef.icon : 'html').replace('viewBox', 'style="width:14px;height:14px;" viewBox');
        label = blockDef ? blockDef.label : node.type;
      }
      
      let res = `
        <div class="layer-item" draggable="true" data-id="${node.id}" data-parent-id="${parentId || ''}" data-col-index="${colIndex !== null ? colIndex : ''}" data-child-index="${childIndex !== null ? childIndex : ''}" style="display:flex; align-items:center; padding: 6px 8px; padding-left: ${pl}px; background:${bg}; color:${color}; font-weight:${weight}; cursor:pointer; border-radius:4px; font-size:12px; gap:8px;">
          <span style="opacity:0.7; display:flex;">${icon}</span>
          <span>${label}</span>
        </div>
      `;

      if (node.columns) {
        node.columns.forEach((col, idx) => {
          res += `
            <div class="layer-col" data-parent-id="${node.id}" data-col-index="${idx}" style="padding-left:${pl + 12}px; font-size:10px; color:var(--text-muted); margin:2px 0; min-height:16px;">Column ${idx + 1}</div>
          `;
          col.forEach((child, cidx) => {
            res += renderNode(child, depth + 2, node.id, idx, cidx);
          });
        });
      }
      
      return res;
    };

    blocks.forEach((b, idx) => {
      html += renderNode(b, 0, null, null, idx);
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
   * Bind events to rendered items
   */
  bindEvents() {
    // Layers click and drag events
    if (this.activeTab === 'layers') {
      const items = document.querySelectorAll('.layer-item');
      items.forEach(item => {
        item.addEventListener('click', () => {
          const id = item.dataset.id;
          if (EmailState.data.selectedBlockId === id) {
             EmailState.deselectAll();
          } else {
             EmailState.selectBlock(id);
          }
        });

        item.addEventListener('dragstart', (e) => {
          e.stopPropagation();
          e.dataTransfer.setData('application/x-layer-id', item.dataset.id);
          e.dataTransfer.effectAllowed = 'move';
          item.style.opacity = '0.5';
        });

        item.addEventListener('dragend', () => {
          item.style.opacity = '1';
          document.querySelectorAll('.layer-drop-target').forEach(el => el.classList.remove('layer-drop-target'));
        });

        item.addEventListener('dragover', (e) => {
          e.preventDefault();
          e.stopPropagation();
          document.querySelectorAll('.layer-drop-target').forEach(el => el.classList.remove('layer-drop-target'));
          
          const rect = item.getBoundingClientRect();
          const isTopHalf = (e.clientY - rect.top) < (rect.height / 2);
          
          item.style.borderTop = isTopHalf ? '2px solid var(--accent-green)' : '';
          item.style.borderBottom = !isTopHalf ? '2px solid var(--accent-green)' : '';
          item.classList.add('layer-drop-target');
        });

        item.addEventListener('dragleave', (e) => {
          item.style.borderTop = '';
          item.style.borderBottom = '';
          item.classList.remove('layer-drop-target');
        });

        item.addEventListener('drop', (e) => {
          e.preventDefault();
          e.stopPropagation();
          item.style.borderTop = '';
          item.style.borderBottom = '';
          item.classList.remove('layer-drop-target');

          const draggedId = e.dataTransfer.getData('application/x-layer-id');
          if (!draggedId || draggedId === item.dataset.id) return;

          const rect = item.getBoundingClientRect();
          const isTopHalf = (e.clientY - rect.top) < (rect.height / 2);

          const parentId = item.dataset.parentId;
          const colIndex = item.dataset.colIndex !== '' ? parseInt(item.dataset.colIndex) : null;
          let childIndex = item.dataset.childIndex !== '' ? parseInt(item.dataset.childIndex) : null;

          if (!isTopHalf && childIndex !== null) {
            childIndex += 1;
          }

          if (parentId) {
            EmailState.moveBlockById(draggedId, { type: 'column', parentId, colIndex, childIndex });
          } else {
            EmailState.moveBlockById(draggedId, { type: 'top', dropIndex: childIndex });
          }
        });
      });

      // Allow dropping into empty columns
      document.querySelectorAll('.layer-col').forEach(colEl => {
        colEl.addEventListener('dragover', (e) => {
          e.preventDefault();
          e.stopPropagation();
          document.querySelectorAll('.layer-drop-target').forEach(el => el.classList.remove('layer-drop-target'));
          colEl.style.textDecoration = 'underline';
          colEl.style.color = 'var(--accent-green)';
          colEl.classList.add('layer-drop-target');
        });
        colEl.addEventListener('dragleave', (e) => {
          colEl.style.textDecoration = '';
          colEl.style.color = '';
          colEl.classList.remove('layer-drop-target');
        });
        colEl.addEventListener('drop', (e) => {
          e.preventDefault();
          e.stopPropagation();
          colEl.style.textDecoration = '';
          colEl.style.color = '';
          colEl.classList.remove('layer-drop-target');
          
          const draggedId = e.dataTransfer.getData('application/x-layer-id');
          if (!draggedId) return;

          const parentId = colEl.dataset.parentId;
          const colIndex = parseInt(colEl.dataset.colIndex);
          EmailState.moveBlockById(draggedId, { type: 'column', parentId, colIndex, childIndex: 0 });
        });
      });
    }

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
    document.querySelectorAll('.block-card[data-block-type][draggable]').forEach(card => {
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

    // Stored components
    document.querySelectorAll('.block-card[data-component-id][draggable]').forEach(card => {
      card.addEventListener('dragstart', (e) => {
        const compId = card.dataset.componentId;
        e.dataTransfer.setData('application/x-stored-component', compId);
        
        const cMeta = EmailState.getStoredComponents().find(c => c.id === compId);
        if (cMeta && cMeta.data.type === 'structure') {
          // This allows drag-drop.js to correctly disable column drops for structure components
          e.dataTransfer.setData('application/x-is-structure', 'true');
        }

        e.dataTransfer.effectAllowed = 'copy';
        card.style.opacity = '0.5';

        const ghost = document.createElement('div');
        ghost.className = 'drag-ghost';
        const cName = EmailState.getStoredComponents().find(c => c.id === compId)?.name || 'Component';
        ghost.textContent = cName;
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, 50, 18);
        setTimeout(() => ghost.remove(), 0);
      });

      card.addEventListener('dragend', () => {
        card.style.opacity = '1';
      });
    });

    // Delete component buttons
    document.querySelectorAll('.delete-component-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Delete this saved component?')) {
          EmailState.deleteStoredComponent(btn.dataset.id);
          this.render();
        }
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
    
    // Listen to state changes to re-render if active
    EmailState.on((changeType) => {
      if (changeType === 'componentsChanged' && this.activeTab === 'components') {
        this.render();
      }
      if (this.activeTab === 'layers' && [
        'blockAdded', 'blockRemoved', 'blockMoved', 'blockUpdated', 
        'reset', 'undo', 'redo', 'blockSelected', 'blockDeselected'
      ].includes(changeType)) {
        this.render();
      }
    });

    this.render();
  }
};

window.BlocksPanel = BlocksPanel;
