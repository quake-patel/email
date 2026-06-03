// ==========================================================================
// Email Newsletter Builder — Drag & Drop System
// ==========================================================================

const DragDrop = {
  isDragging: false,
  dragType: null, // 'new-structure', 'new-block', 'reorder'
  dragData: null,

  /**
   * Initialize drag and drop on the canvas
   */
  init() {
    const canvasEmail = document.getElementById('canvas-email');
    if (!canvasEmail) return;

    canvasEmail.addEventListener('dragover', (e) => this.handleDragOver(e));
    canvasEmail.addEventListener('dragleave', (e) => this.handleDragLeave(e));
    canvasEmail.addEventListener('drop', (e) => this.handleDrop(e));
    canvasEmail.addEventListener('dragenter', (e) => {
      e.preventDefault();
    });

    // Re-bind after renders
    EmailState.on(() => {
      this.rebindCanvasDrag();
    });
  },

  /**
   * Re-bind drag events after canvas re-render
   */
  rebindCanvasDrag() {
    const canvasEmail = document.getElementById('canvas-email');
    if (!canvasEmail) return;

    // Make ALL blocks draggable for reordering (top-level and nested)
    canvasEmail.querySelectorAll('.canvas-block[data-block-type]').forEach((el) => {
      // Don't bind again if already bound
      if (el.dataset.dragBound) return;
      el.dataset.dragBound = 'true';
      el.draggable = true;

      el.addEventListener('dragstart', (e) => {
        // Don't drag when editing text
        if (e.target.closest('[contenteditable="true"]')) {
          e.preventDefault();
          return;
        }

        e.stopPropagation();
        this.isDragging = true;
        this.dragType = 'reorder';
        this.dragData = { blockId: el.dataset.blockId };
        e.dataTransfer.setData('application/x-reorder', el.dataset.blockId);
        e.dataTransfer.effectAllowed = 'move';
        el.style.opacity = '0.4';

        const ghost = document.createElement('div');
        ghost.className = 'drag-ghost';
        ghost.textContent = 'Moving block...';
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, 60, 18);
        setTimeout(() => ghost.remove(), 0);
      });

      el.addEventListener('dragend', () => {
        el.style.opacity = '1';
        this.isDragging = false;
        this.dragType = null;
        this.dragData = null;
        this.clearDropZones();
      });
    });
  },

  /**
   * Handle drag over canvas
   */
  handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';

    const isStructure = e.dataTransfer.types.includes('application/x-structure-id') || e.dataTransfer.types.includes('application/x-reorder');

    let dropZone = e.target.closest('.drop-zone');
    let dropZoneCol = isStructure ? null : e.target.closest('.drop-zone-col');
    const emptyCanvas = e.target.closest('#canvas-drop-empty');

    if (!dropZone && !dropZoneCol && !emptyCanvas) {
      const zones = Array.from(document.querySelectorAll('.drop-zone'));
      let closestZone = null;
      let minDistance = Infinity;
      zones.forEach(zone => {
        const rect = zone.getBoundingClientRect();
        const zoneY = rect.top + rect.height / 2;
        const distance = Math.abs(e.clientY - zoneY);
        // Add a threshold so it only snaps if reasonably close, 
        // but for structures we can snap anywhere if they are not over emptyCanvas
        if (distance < minDistance) {
          minDistance = distance;
          closestZone = zone;
        }
      });
      if (closestZone) dropZone = closestZone;
    }

    // Clear previous active zones
    document.querySelectorAll('.drop-zone--active, .drop-zone--hover').forEach(z => {
      z.classList.remove('drop-zone--active', 'drop-zone--hover');
    });

    if (dropZone) {
      dropZone.classList.add('drop-zone--active', 'drop-zone--hover');
    } else if (dropZoneCol) {
      dropZoneCol.classList.add('drop-zone--hover');
    } else if (emptyCanvas) {
      emptyCanvas.style.outline = '2px dashed var(--accent-green)';
      emptyCanvas.style.outlineOffset = '-2px';
    }
  },

  /**
   * Handle drag leave
   */
  handleDragLeave(e) {
    const dropZone = e.target.closest('.drop-zone');
    const dropZoneCol = e.target.closest('.drop-zone-col');
    if (dropZone) {
      dropZone.classList.remove('drop-zone--hover');
    }
    if (dropZoneCol) {
      dropZoneCol.classList.remove('drop-zone--hover');
    }

    const emptyCanvas = e.target.closest('#canvas-drop-empty');
    if (emptyCanvas) {
      emptyCanvas.style.outline = '';
      emptyCanvas.style.outlineOffset = '';
    }
  },

  /**
   * Handle drop on canvas
   */
  handleDrop(e) {
    e.preventDefault();
    this.clearDropZones();

    const isStructure = e.dataTransfer.types.includes('application/x-structure-id');
    const emptyCanvas = e.target.closest('#canvas-drop-empty');

    let dropZone = e.target.closest('.drop-zone');
    let dropZoneCol = isStructure ? null : e.target.closest('.drop-zone-col');

    if (!dropZone && !dropZoneCol && !emptyCanvas) {
      const zones = Array.from(document.querySelectorAll('.drop-zone'));
      let closestZone = null;
      let minDistance = Infinity;
      zones.forEach(zone => {
        const rect = zone.getBoundingClientRect();
        const zoneY = rect.top + rect.height / 2;
        const distance = Math.abs(e.clientY - zoneY);
        if (distance < minDistance) {
          minDistance = distance;
          closestZone = zone;
        }
      });
      if (closestZone) dropZone = closestZone;
    }

    // Determine drop index
    let dropIndex = -1;
    if (dropZone) {
      dropIndex = parseInt(dropZone.dataset.dropIndex);
    } else if (emptyCanvas) {
      dropIndex = 0;
    }

    // Check what's being dropped
    const structureId = e.dataTransfer.getData('application/x-structure-id');
    const blockType = e.dataTransfer.getData('application/x-block-type');
    const reorderIdx = e.dataTransfer.getData('application/x-reorder');

    // Handle drop into a column
    if (dropZoneCol) {
      const parentId = dropZoneCol.dataset.parentId;
      const colIndex = parseInt(dropZoneCol.dataset.colIndex);
      
      if (structureId || blockType) {
        this.dropIntoColumn(parentId, colIndex, structureId, blockType);
      } else if (reorderIdx) {
        // reorderIdx is now blockId
        EmailState.moveBlockById(reorderIdx, { type: 'column', parentId, colIndex });
      }
      return;
    }

    if (structureId) {
      // New structure from panel
      const structDef = BlocksPanel.structures.find(s => s.id === structureId);
      if (structDef) {
        const structure = BlocksPanel.createStructure(structDef);
        EmailState.addBlock(structure, dropIndex);
        Utils.showToast('Structure added');
      }
    } else if (blockType) {
      // New content block from panel
      const block = BlocksPanel.createBlock(blockType);
      if (block) {
        EmailState.addBlock(block, dropIndex);
        EmailState.selectBlock(block.id);
        Utils.showToast(`${blockType.charAt(0).toUpperCase() + blockType.slice(1)} block added`);
      }
    } else if (reorderIdx) {
      // Reorder existing block to top-level
      EmailState.moveBlockById(reorderIdx, { type: 'top', dropIndex });
    }
  },

  /**
   * Drop a block into a structure column
   */
  dropIntoColumn(parentId, colIndex, structureId, blockType) {
    const parent = EmailState.getBlock(parentId);
    if (!parent || parent.type !== 'structure') return;

    if (blockType) {
      const block = BlocksPanel.createBlock(blockType);
      if (block && parent.columns[colIndex]) {
        parent.columns[colIndex].push(block);
        EmailState.saveSnapshot();
        EmailState.save();
        EmailState.selectBlock(block.id);
        EmailState.notify('blockAdded', block);
        Utils.showToast(`${blockType} added to column`);
      }
    }
  },

  /**
   * Clear all drop zone visual states
   */
  clearDropZones() {
    document.querySelectorAll('.drop-zone--active, .drop-zone--hover').forEach(z => {
      z.classList.remove('drop-zone--active', 'drop-zone--hover');
    });
    const emptyCanvas = document.getElementById('canvas-drop-empty');
    if (emptyCanvas) {
      emptyCanvas.style.outline = '';
      emptyCanvas.style.outlineOffset = '';
    }
  }
};

window.DragDrop = DragDrop;
