// ==========================================================================
// Email Newsletter Builder — App Bootstrap
// ==========================================================================

const App = {
  /**
   * Initialize the entire application
   */
  init() {
    // 1. Init state
    EmailState.init();

    // 1.5 Init Theme
    if (localStorage.getItem('theme-dark') === 'true') {
      document.body.classList.add('theme-dark');
    }

    // 2. Init modules
    BlocksPanel.init();
    Canvas.init();
    DragDrop.init();
    PropertiesPanel.init();


    // 3. Initial render
    Canvas.render();

    // 4. Bind toolbar events
    this.bindToolbar();

    // 5. Bind keyboard shortcuts
    this.bindKeyboard();

    // 6. Bind export dropdown
    this.bindExportDropdown();

    // 7. Bind code modal
    this.bindCodeModal();

    // 7.5 Bind templates modal
    this.bindTemplatesModal();

    // 8. Bind responsive preview toggle
    this.bindResponsiveToggle();

    // 8.5 Bind sidebar resizers
    this.bindResizers();

    // 9. Set template name
    const nameInput = document.getElementById('template-name-input');
    if (nameInput) {
      nameInput.value = EmailState.data.templateName;
      nameInput.addEventListener('change', () => {
        EmailState.setTemplateName(nameInput.value);
      });
    }

    // 10. Update undo/redo button states
    this.updateUndoRedo();
    EmailState.on(() => this.updateUndoRedo());

    console.log('📧 Email Newsletter Builder initialized');
  },

  // Current viewport mode
  currentViewport: 'desktop',

  /**
   * Bind toolbar button events
   */
  bindToolbar() {
    // Undo
    document.getElementById('btn-undo')?.addEventListener('click', () => {
      EmailState.undo();
    });

    // Redo
    document.getElementById('btn-redo')?.addEventListener('click', () => {
      EmailState.redo();
    });

    // Preview
    document.getElementById('btn-preview')?.addEventListener('click', () => {
      ExportEngine.previewInTab();
    });

    // Code view
    document.getElementById('btn-code')?.addEventListener('click', () => {
      ExportEngine.showCodeView();
    });

    // Save
    document.getElementById('btn-save')?.addEventListener('click', () => {
      EmailState.saveToGallery();
      Utils.showToast('Template stored successfully', 'success');
    });

    // Clear all
    document.getElementById('btn-clear')?.addEventListener('click', () => {
      Utils.customConfirm('Clear all blocks? This cannot be undone.', () => {
        EmailState.reset();
        Utils.showToast('Canvas cleared');
      });
    });

    // Theme toggle
    document.getElementById('btn-theme-toggle')?.addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
      const isDark = document.body.classList.contains('theme-dark');
      localStorage.setItem('theme-dark', isDark);
      Utils.showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled');
    });
  },

  /**
   * Bind keyboard shortcuts
   */
  bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target.closest('input, textarea, [contenteditable="true"]')) return;

      // Ctrl+Z - Undo
      if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        EmailState.undo();
      }

      // Ctrl+Y or Ctrl+Shift+Z - Redo
      if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'Z')) {
        e.preventDefault();
        EmailState.redo();
      }

      // Delete/Backspace - Remove selected block
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const selected = EmailState.data.selectedBlockId;
        if (selected) {
          e.preventDefault();
          const parentInfo = EmailState.findParent(selected);
          if (parentInfo) {
            parentInfo.parent.columns[parentInfo.colIndex].splice(parentInfo.childIndex, 1);
            EmailState.saveSnapshot();
            EmailState.save();
            EmailState.notify('blockRemoved');
          } else {
            EmailState.removeBlock(selected);
          }
        }
      }

      // Escape - Deselect
      if (e.key === 'Escape') {
        EmailState.deselectAll();
        ExportEngine.closeCodeView();
      }
    });
  },

  /**
   * Update undo/redo button disabled states
   */
  updateUndoRedo() {
    const undoBtn = document.getElementById('btn-undo');
    const redoBtn = document.getElementById('btn-redo');

    if (undoBtn) {
      undoBtn.classList.toggle('toolbar-btn--disabled', !EmailState.canUndo());
    }
    if (redoBtn) {
      redoBtn.classList.toggle('toolbar-btn--disabled', !EmailState.canRedo());
    }
  },

  /**
   * Bind export dropdown toggle
   */
  bindExportDropdown() {
    const exportBtn = document.getElementById('btn-export');
    const dropdown = document.getElementById('export-dropdown');

    if (!exportBtn || !dropdown) return;

    exportBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('export-dropdown--visible');
    });

    // Close on outside click
    document.addEventListener('click', () => {
      dropdown.classList.remove('export-dropdown--visible');
    });

    dropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Export actions
    document.getElementById('export-copy')?.addEventListener('click', () => {
      ExportEngine.copyToClipboard();
      dropdown.classList.remove('export-dropdown--visible');
    });

    document.getElementById('export-download')?.addEventListener('click', () => {
      ExportEngine.downloadFile();
      dropdown.classList.remove('export-dropdown--visible');
    });

    document.getElementById('export-preview')?.addEventListener('click', () => {
      ExportEngine.previewInTab();
      dropdown.classList.remove('export-dropdown--visible');
    });

    document.getElementById('export-save-json')?.addEventListener('click', () => {
      ExportEngine.downloadJson();
      dropdown.classList.remove('export-dropdown--visible');
    });

    document.getElementById('import-json-input')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        ExportEngine.importJson(file);
      }
      dropdown.classList.remove('export-dropdown--visible');
      // Reset input so it can be loaded again
      e.target.value = '';
    });
  },

  /**
   * Bind templates modal
   */
  bindTemplatesModal() {
    const modal = document.getElementById('templates-modal');
    const container = document.getElementById('templates-list-container');
    const nameInput = document.getElementById('template-name-input');

    const openModal = () => {
      this.renderTemplatesList(container);
      modal?.classList.add('modal-overlay--visible');
    };

    const closeModal = () => {
      modal?.classList.remove('modal-overlay--visible');
    };

    document.getElementById('btn-templates')?.addEventListener('click', openModal);
    document.getElementById('templates-modal-close')?.addEventListener('click', closeModal);
    document.getElementById('templates-modal-done')?.addEventListener('click', closeModal);
    
    document.getElementById('templates-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'templates-modal') closeModal();
    });

    document.getElementById('btn-new-template')?.addEventListener('click', () => {
      Utils.customConfirm('Create a new blank template? Unsaved changes to the current template will be lost.', () => {
        EmailState.startNewTemplate();
        if (nameInput) nameInput.value = EmailState.data.templateName;
        closeModal();
        Utils.showToast('Started new template');
      });
    });

    // Handle template actions inside modal
    container?.addEventListener('click', (e) => {
      const btnLoad = e.target.closest('.btn-load-template');
      const btnDelete = e.target.closest('.btn-delete-template');

      if (btnLoad) {
        const id = btnLoad.dataset.id;
        Utils.customConfirm('Load this template? Unsaved changes will be lost.', () => {
          EmailState.loadFromGallery(id);
          if (nameInput) nameInput.value = EmailState.data.templateName;
          closeModal();
          Utils.showToast('Template loaded');
        });
      }

      if (btnDelete) {
        const id = btnDelete.dataset.id;
        Utils.customConfirm('Are you sure you want to delete this template permanently?', () => {
          EmailState.deleteFromGallery(id);
          this.renderTemplatesList(container);
          Utils.showToast('Template deleted');
        });
      }
    });
  },

  renderTemplatesList(container) {
    if (!container) return;
    const templates = EmailState.getGalleryTemplates();
    if (templates.length === 0) {
      container.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">No stored templates yet.</div>';
      return;
    }

    container.innerHTML = templates.map(t => {
      const d = new Date(t.date);
      const dateStr = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
      const isActive = t.id === EmailState.data.templateId ? '<span style="background: #2CB543; color: white; padding: 2px 6px; border-radius: 12px; font-size: 11px; margin-left: 8px;">Active</span>' : '';
      
      return `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #eee;">
          <div>
            <div style="font-weight: 600; color: #333;">${Utils.escapeHTML(t.name)}${isActive}</div>
            <div style="font-size: 12px; color: #888; margin-top: 4px;">Last saved: ${dateStr}</div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn--secondary btn-load-template" data-id="${t.id}">Load</button>
            <button class="btn btn-delete-template" data-id="${t.id}" style="color: #f4001e; background: transparent; border: 1px solid #f4001e; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Delete</button>
          </div>
        </div>
      `;
    }).join('');
  },

  /**
   * Bind code modal close
   */
  bindCodeModal() {
    document.getElementById('code-modal-close')?.addEventListener('click', () => {
      ExportEngine.closeCodeView();
    });

    document.getElementById('code-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'code-modal') {
        ExportEngine.closeCodeView();
      }
    });

    document.getElementById('code-copy-btn')?.addEventListener('click', () => {
      ExportEngine.copyToClipboard();
    });
  },

  /**
   * Bind responsive preview toggle (Desktop / Tablet / Mobile)
   */
  bindResponsiveToggle() {
    const viewportSizes = {
      desktop: { width: 600, label: 'Desktop', icon: 'monitor' },
      tablet:  { width: 480, label: 'Tablet',  icon: 'tablet' },
      mobile:  { width: 375, label: 'Mobile',  icon: 'phone' },
    };

    const wrapper = document.getElementById('canvas-wrapper');
    const widthText = document.getElementById('canvas-width-text');
    const widthBadge = document.getElementById('canvas-width-badge');
    const toggleBtns = document.querySelectorAll('.responsive-toggle__btn');

    if (!wrapper || !toggleBtns.length) return;

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const viewport = btn.dataset.viewport;
        if (viewport === this.currentViewport) return;

        this.currentViewport = viewport;
        const config = viewportSizes[viewport];

        // Update active button
        toggleBtns.forEach(b => b.classList.remove('responsive-toggle__btn--active'));
        btn.classList.add('responsive-toggle__btn--active');

        // Update canvas wrapper class
        wrapper.classList.remove('canvas-wrapper--tablet', 'canvas-wrapper--mobile');
        if (viewport === 'tablet') wrapper.classList.add('canvas-wrapper--tablet');
        if (viewport === 'mobile') wrapper.classList.add('canvas-wrapper--mobile');

        // Update width badge
        if (widthText) {
          widthText.textContent = viewport === 'desktop' && window.EmailState ? EmailState.data.globalStyles.contentWidth + 'px' : config.width + 'px';
        }

        // Update badge icon
        if (widthBadge) {
          const svg = widthBadge.querySelector('svg');
          if (svg) {
            if (viewport === 'desktop') {
              svg.innerHTML = '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>';
            } else if (viewport === 'tablet') {
              svg.innerHTML = '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>';
            } else {
              svg.innerHTML = '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>';
            }
          }
        }
        // Re-render canvas to apply mobile-specific block settings
        Canvas.render();

        Utils.showToast(`${config.label} preview — ${config.width}px`);
      });
    });
  },

  /**
   * Bind sidebar drag-to-resize
   */
  bindResizers() {
    const resizerLeft = document.getElementById('resizer-left');
    const resizerRight = document.getElementById('resizer-right');
    const root = document.documentElement;
    let isResizing = false;
    let currentResizer = null;

    const onMouseMove = (e) => {
      if (!isResizing) return;
      e.preventDefault();
      
      if (currentResizer === 'left') {
        const newWidth = Math.max(150, Math.min(e.clientX, 500));
        root.style.setProperty('--panel-left-width', `${newWidth}px`);
      } else if (currentResizer === 'right') {
        const newWidth = Math.max(200, Math.min(window.innerWidth - e.clientX, 600));
        root.style.setProperty('--panel-right-width', `${newWidth}px`);
      }
    };

    const onMouseUp = () => {
      if (isResizing) {
        isResizing = false;
        currentResizer = null;
        document.body.style.cursor = 'default';
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        if (resizerLeft) resizerLeft.classList.remove('is-resizing');
        if (resizerRight) resizerRight.classList.remove('is-resizing');
      }
    };

    if (resizerLeft) {
      resizerLeft.addEventListener('mousedown', (e) => {
        isResizing = true;
        currentResizer = 'left';
        document.body.style.cursor = 'col-resize';
        resizerLeft.classList.add('is-resizing');
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    }

    if (resizerRight) {
      resizerRight.addEventListener('mousedown', (e) => {
        isResizing = true;
        currentResizer = 'right';
        document.body.style.cursor = 'col-resize';
        resizerRight.classList.add('is-resizing');
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    }
  }
};

// Boot when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());

window.App = App;
