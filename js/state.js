// ==========================================================================
// Email Newsletter Builder — State Management
// ==========================================================================

const EmailState = {
  // Current state
  data: {
    templateId: null,
    templateName: 'My Newsletter',
    subjectLine: '',
    previewText: '',
    globalStyles: {
      backgroundColor: '#f6f6f6',
      contentWidth: 600,
      contentAlignment: 'center',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      textColor: '#333333',
      linkColor: '#2CB543',
      underlineLinks: true,
      headingFont: 'Arial, sans-serif',
      h1Size: '28px',
      h1Color: '#232429',
      h2Size: '22px',
      h2Color: '#232429',
      h3Size: '18px',
      h3Color: '#232429',
      buttonBgColor: '#f4001e',
      buttonTextColor: '#ffffff',
      buttonBorderRadius: '0px',
      buttonFontSize: '16px',
      mobileFontSize: '',
      mobileH1Size: '',
      mobileH2Size: '',
      mobileH3Size: '',
      mobileButtonFontSize: '',
    },
    blocks: [],
    selectedBlockId: null,
    selectedInlineImageId: null,
  },

  // Undo/redo
  history: [],
  historyIndex: -1,
  maxHistory: 50,

  // Listeners
  listeners: [],

  /**
   * Initialize state (load from localStorage or default)
   */
  init() {
    const saved = localStorage.getItem('emailBuilderState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.data = { ...this.data, ...parsed };
        this.data.selectedBlockId = null;
        this.data.selectedInlineImageId = null;
      } catch (e) {
        console.warn('Failed to load saved state:', e);
      }
    }
    this.saveSnapshot();
  },

  /**
   * Subscribe to state changes
   */
  on(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },

  /**
   * Notify all listeners of a change
   */
  notify(changeType, payload) {
    this.listeners.forEach(fn => fn(changeType, payload));
  },

  /**
   * Save a snapshot for undo
   */
  saveSnapshot() {
    const snapshot = Utils.deepClone(this.data);
    delete snapshot.selectedBlockId;
    delete snapshot.selectedInlineImageId;

    // Truncate forward history
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(snapshot);

    if (this.history.length > this.maxHistory) {
      this.history.shift();
    } else {
      this.historyIndex++;
    }
  },

  /**
   * Persist to localStorage
   */
  save() {
    try {
      const toSave = Utils.deepClone(this.data);
      delete toSave.selectedBlockId;
      delete toSave.selectedInlineImageId;
      localStorage.setItem('emailBuilderState', JSON.stringify(toSave));
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
  },

  /**
   * Undo last change
   */
  undo() {
    if (this.historyIndex <= 0) return false;
    this.historyIndex--;
    const snapshot = Utils.deepClone(this.history[this.historyIndex]);
    this.data = { ...snapshot, selectedBlockId: null, selectedInlineImageId: null };
    this.save();
    this.notify('undo');
    return true;
  },

  /**
   * Redo last undone change
   */
  redo() {
    if (this.historyIndex >= this.history.length - 1) return false;
    this.historyIndex++;
    const snapshot = Utils.deepClone(this.history[this.historyIndex]);
    this.data = { ...snapshot, selectedBlockId: null, selectedInlineImageId: null };
    this.save();
    this.notify('redo');
    return true;
  },

  canUndo() { return this.historyIndex > 0; },
  canRedo() { return this.historyIndex < this.history.length - 1; },

  // ---- Block operations ----

  /**
   * Add a block at a given index
   */
  addBlock(block, index = -1) {
    if (index < 0 || index >= this.data.blocks.length) {
      this.data.blocks.push(block);
    } else {
      this.data.blocks.splice(index, 0, block);
    }
    this.saveSnapshot();
    this.save();
    this.notify('blockAdded', block);
  },

  /**
   * Remove a block by ID
   */
  removeBlock(blockId) {
    const idx = this.data.blocks.findIndex(b => b.id === blockId);
    if (idx === -1) return;
    const removed = this.data.blocks.splice(idx, 1)[0];
    if (this.data.selectedBlockId === blockId) {
      this.data.selectedBlockId = null;
    }
    if (this.data.selectedInlineImageId) {
      this.data.selectedInlineImageId = null;
    }
    this.saveSnapshot();
    this.save();
    this.notify('blockRemoved', removed);
  },

  /**
   * Duplicate a block
   */
  duplicateBlock(blockId) {
    let parentInfo = this.findParent(blockId);
    let targetArray = null;
    let idx = -1;

    if (parentInfo) {
      targetArray = parentInfo.parent.columns[parentInfo.colIndex];
      idx = parentInfo.childIndex;
    } else {
      targetArray = this.data.blocks;
      idx = targetArray.findIndex(b => b.id === blockId);
    }

    if (idx === -1 || !targetArray) return;

    const clone = Utils.deepClone(targetArray[idx]);
    clone.id = Utils.generateId(clone.type);
    // Also generate new IDs for children
    if (clone.columns) {
      clone.columns.forEach(col => {
        col.forEach(child => {
          child.id = Utils.generateId(child.type);
        });
      });
    }
    targetArray.splice(idx + 1, 0, clone);
    this.saveSnapshot();
    this.save();
    this.notify('blockDuplicated', clone);
  },

  moveBlockUp(blockId) {
    let parentInfo = this.findParent(blockId);

    if (parentInfo) {
      let targetArray = parentInfo.parent.columns[parentInfo.colIndex];
      let idx = parentInfo.childIndex;
      
      if (idx > 0) {
        // Swap with previous
        const temp = targetArray[idx];
        targetArray[idx] = targetArray[idx - 1];
        targetArray[idx - 1] = temp;
      } else {
        // Move to previous structure if possible
        let structIdx = this.data.blocks.findIndex(b => b.id === parentInfo.parent.id);
        if (structIdx > 0) {
          let prevStruct = this.data.blocks[structIdx - 1];
          let targetColIdx = Math.min(parentInfo.colIndex, prevStruct.columns.length - 1);
          let block = targetArray.splice(idx, 1)[0];
          prevStruct.columns[targetColIdx].push(block);
        } else {
          return; // nowhere to move
        }
      }
    } else {
      let targetArray = this.data.blocks;
      let idx = targetArray.findIndex(b => b.id === blockId);
      if (idx <= 0 || !targetArray) return;
      // Swap with previous
      const temp = targetArray[idx];
      targetArray[idx] = targetArray[idx - 1];
      targetArray[idx - 1] = temp;
    }

    this.saveSnapshot();
    this.save();
    this.notify('blockMoved');
  },

  moveBlockDown(blockId) {
    let parentInfo = this.findParent(blockId);

    if (parentInfo) {
      let targetArray = parentInfo.parent.columns[parentInfo.colIndex];
      let idx = parentInfo.childIndex;
      
      if (idx < targetArray.length - 1) {
        // Swap with next
        const temp = targetArray[idx];
        targetArray[idx] = targetArray[idx + 1];
        targetArray[idx + 1] = temp;
      } else {
        // Move to next structure if possible
        let structIdx = this.data.blocks.findIndex(b => b.id === parentInfo.parent.id);
        if (structIdx !== -1 && structIdx < this.data.blocks.length - 1) {
          let nextStruct = this.data.blocks[structIdx + 1];
          let targetColIdx = Math.min(parentInfo.colIndex, nextStruct.columns.length - 1);
          let block = targetArray.splice(idx, 1)[0];
          nextStruct.columns[targetColIdx].unshift(block);
        } else {
          return; // nowhere to move
        }
      }
    } else {
      let targetArray = this.data.blocks;
      let idx = targetArray.findIndex(b => b.id === blockId);
      if (idx === -1 || idx >= targetArray.length - 1 || !targetArray) return;
      // Swap with next
      const temp = targetArray[idx];
      targetArray[idx] = targetArray[idx + 1];
      targetArray[idx + 1] = temp;
    }

    this.saveSnapshot();
    this.save();
    this.notify('blockMoved');
  },

  /**
   * Move block to previous column
   */
  moveBlockLeft(blockId) {
    const parentInfo = this.findParent(blockId);
    if (!parentInfo || parentInfo.colIndex <= 0) return;
    const block = parentInfo.parent.columns[parentInfo.colIndex].splice(parentInfo.childIndex, 1)[0];
    parentInfo.parent.columns[parentInfo.colIndex - 1].push(block);
    this.saveSnapshot();
    this.save();
    this.notify('blockMoved');
  },

  /**
   * Move block to next column
   */
  moveBlockRight(blockId) {
    const parentInfo = this.findParent(blockId);
    if (!parentInfo || parentInfo.colIndex >= parentInfo.parent.columns.length - 1) return;
    const block = parentInfo.parent.columns[parentInfo.colIndex].splice(parentInfo.childIndex, 1)[0];
    parentInfo.parent.columns[parentInfo.colIndex + 1].push(block);
    this.saveSnapshot();
    this.save();
    this.notify('blockMoved');
  },

  /**
   * Move a block from one index to another (top-level only)
   */
  moveBlock(fromIndex, toIndex) {
    if (fromIndex === toIndex) return;
    const [block] = this.data.blocks.splice(fromIndex, 1);
    this.data.blocks.splice(toIndex > fromIndex ? toIndex - 1 : toIndex, 0, block);
    this.saveSnapshot();
    this.save();
    this.notify('blockMoved');
  },

  /**
   * Move any block by ID to a new location (top-level or column)
   */
  moveBlockById(blockId, targetInfo) {
    let block = null;
    let oldParentInfo = this.findParent(blockId);

    // Remove block from old location
    if (oldParentInfo) {
      block = oldParentInfo.parent.columns[oldParentInfo.colIndex].splice(oldParentInfo.childIndex, 1)[0];
    } else {
      const idx = this.data.blocks.findIndex(b => b.id === blockId);
      if (idx !== -1) block = this.data.blocks.splice(idx, 1)[0];
    }

    if (!block) return;

    // Insert block into new location
    if (targetInfo.type === 'column') {
      const parent = this.data.blocks.find(b => b.id === targetInfo.parentId);
      if (parent && parent.columns[targetInfo.colIndex]) {
        if (targetInfo.childIndex !== undefined) {
          parent.columns[targetInfo.colIndex].splice(targetInfo.childIndex, 0, block);
        } else {
          parent.columns[targetInfo.colIndex].push(block);
        }
      } else {
        // Fallback to end of top-level
        this.data.blocks.push(block);
      }
    } else {
      // Top level
      let dropIndex = targetInfo.dropIndex;
      // Adjust index if we removed a top-level block before the drop index
      if (!oldParentInfo && targetInfo.fromIndex < dropIndex) {
        dropIndex = Math.max(0, dropIndex - 1);
      }
      if (dropIndex < 0 || dropIndex >= this.data.blocks.length) {
        this.data.blocks.push(block);
      } else {
        this.data.blocks.splice(dropIndex, 0, block);
      }
    }

    this.saveSnapshot();
    this.save();
    this.notify('blockMoved');
  },

  /**
   * Update a block's properties (searches children too)
   */
  updateBlock(blockId, updates) {
    // Try top-level first
    let block = this.data.blocks.find(b => b.id === blockId);
    if (block) {
      Object.assign(block, updates);
      this.save();
      this.notify('blockUpdated', block);
      return;
    }
    // Search inside structure columns
    for (const b of this.data.blocks) {
      if (b.columns) {
        for (const col of b.columns) {
          const child = col.find(c => c.id === blockId);
          if (child) {
            Object.assign(child, updates);
            this.save();
            this.notify('blockUpdated', b);
            return;
          }
        }
      }
    }
  },

  /**
   * Update a block and save snapshot (for significant changes)
   */
  updateBlockWithSnapshot(blockId, updates) {
    let block = this.data.blocks.find(b => b.id === blockId);
    if (block) {
      Object.assign(block, updates);
      this.saveSnapshot();
      this.save();
      this.notify('blockUpdated', block);
      return;
    }
    for (const b of this.data.blocks) {
      if (b.columns) {
        for (const col of b.columns) {
          const child = col.find(c => c.id === blockId);
          if (child) {
            Object.assign(child, updates);
            this.saveSnapshot();
            this.save();
            this.notify('blockUpdated', b);
            return;
          }
        }
      }
    }
  },

  /**
   * Update a child block inside a structure
   */
  updateChildBlock(parentId, colIndex, childId, updates) {
    const parent = this.data.blocks.find(b => b.id === parentId);
    if (!parent || !parent.columns || !parent.columns[colIndex]) return;
    const child = parent.columns[colIndex].find(c => c.id === childId);
    if (!child) return;
    Object.assign(child, updates);
    this.save();
    this.notify('blockUpdated', parent);
  },

  /**
   * Select a block
   */
  selectBlock(blockId) {
    this.data.selectedBlockId = blockId;
    this.data.selectedInlineImageId = null;
    this.save();
    this.notify('blockSelected', blockId);
  },

  /**
   * Select an inline image
   */
  selectInlineImage(imageId) {
    this.data.selectedInlineImageId = imageId;
    this.save();
    this.notify('inlineImageSelected', imageId);
  },

  /**
   * Deselect
   */
  deselectAll() {
    this.data.selectedBlockId = null;
    this.data.selectedInlineImageId = null;
    this.notify('blockDeselected');
  },

  /**
   * Get selected block
   */
  getSelectedBlock() {
    if (!this.data.selectedBlockId) return null;
    // Search top-level
    let block = this.data.blocks.find(b => b.id === this.data.selectedBlockId);
    if (block) return block;
    // Search inside structures
    for (const b of this.data.blocks) {
      if (b.columns) {
        for (const col of b.columns) {
          const child = col.find(c => c.id === this.data.selectedBlockId);
          if (child) return child;
        }
      }
    }
    return null;
  },

  /**
   * Find parent structure of a child block
   */
  findParent(childId) {
    for (const b of this.data.blocks) {
      if (b.columns) {
        for (let ci = 0; ci < b.columns.length; ci++) {
          const idx = b.columns[ci].findIndex(c => c.id === childId);
          if (idx !== -1) return { parent: b, colIndex: ci, childIndex: idx };
        }
      }
    }
    return null;
  },

  /**
   * Update global styles
   */
  updateGlobalStyles(updates) {
    Object.assign(this.data.globalStyles, updates);
    this.saveSnapshot();
    this.save();
    this.notify('globalStylesUpdated');
  },

  /**
   * Update template name
   */
  setTemplateName(name) {
    this.data.templateName = name;
    this.save();
  },

  /**
   * Reset to blank state
   */
  reset() {
    this.data.blocks = [];
    this.data.selectedBlockId = null;
    this.saveSnapshot();
    this.save();
    this.notify('reset');
  },

  /**
   * Get all blocks
   */
  getBlocks() {
    return this.data.blocks;
  },

  /**
   * Get block by ID
   */
  getBlock(blockId) {
    let block = this.data.blocks.find(b => b.id === blockId);
    if (block) return block;
    for (const b of this.data.blocks) {
      if (b.columns) {
        for (const col of b.columns) {
          const child = col.find(c => c.id === blockId);
          if (child) return child;
        }
      }
    }
    return null;
  },

  // ---- Template Storage / Gallery ----

  saveToGallery() {
    if (!this.data.templateId) {
      this.data.templateId = Utils.generateId('tpl');
    }
    
    const templates = this.getGalleryTemplates();
    const existingIdx = templates.findIndex(t => t.id === this.data.templateId);
    
    const snapshot = Utils.deepClone(this.data);
    delete snapshot.selectedBlockId;

    const templateMeta = {
      id: this.data.templateId,
      name: this.data.templateName,
      date: new Date().getTime(),
      data: snapshot
    };

    if (existingIdx !== -1) {
      templates[existingIdx] = templateMeta;
    } else {
      templates.push(templateMeta);
    }
    
    localStorage.setItem('emailBuilderTemplates', JSON.stringify(templates));
    this.save();
    return true;
  },

  getGalleryTemplates() {
    return JSON.parse(localStorage.getItem('emailBuilderTemplates') || '[]').sort((a,b) => b.date - a.date);
  },

  loadFromGallery(id) {
    const templates = this.getGalleryTemplates();
    const tpl = templates.find(t => t.id === id);
    if (tpl) {
      this.data = { ...Utils.deepClone(tpl.data), selectedBlockId: null };
      this.history = [];
      this.historyIndex = -1;
      this.saveSnapshot();
      this.save();
      this.notify('reset');
      return true;
    }
    return false;
  },

  deleteFromGallery(id) {
    let templates = this.getGalleryTemplates();
    templates = templates.filter(t => t.id !== id);
    localStorage.setItem('emailBuilderTemplates', JSON.stringify(templates));
    
    if (this.data.templateId === id) {
      this.data.templateId = null;
      this.save();
    }
  },

  startNewTemplate() {
    this.reset();
    this.data.templateId = Utils.generateId('tpl');
    this.data.templateName = 'New Template';
    this.history = [];
    this.historyIndex = -1;
    this.saveSnapshot();
    this.save();
    this.notify('reset');
  },

  // ---- Component Storage ----

  saveComponent(block, name) {
    let components = this.getStoredComponents();
    const componentMeta = {
      id: Utils.generateId('comp'),
      name: name || (block.type.charAt(0).toUpperCase() + block.type.slice(1) + ' Component'),
      date: new Date().getTime(),
      data: Utils.deepClone(block)
    };
    components.push(componentMeta);
    localStorage.setItem('emailBuilderComponents', JSON.stringify(components));
    this.notify('componentsChanged');
    return componentMeta;
  },

  getStoredComponents() {
    return JSON.parse(localStorage.getItem('emailBuilderComponents') || '[]').sort((a,b) => b.date - a.date);
  },

  deleteStoredComponent(id) {
    let components = this.getStoredComponents();
    components = components.filter(c => c.id !== id);
    localStorage.setItem('emailBuilderComponents', JSON.stringify(components));
    this.notify('componentsChanged');
  }
};

window.EmailState = EmailState;
