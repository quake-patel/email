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

    // 8. Bind responsive preview toggle
    this.bindResponsiveToggle();

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

    // Clear all
    document.getElementById('btn-clear')?.addEventListener('click', () => {
      if (confirm('Clear all blocks? This cannot be undone.')) {
        EmailState.reset();
        Utils.showToast('Canvas cleared');
      }
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
        if (widthText) widthText.textContent = config.width + 'px';

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
  }
};

// Boot when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());

window.App = App;
