// ==========================================================================
// Email Newsletter Builder — Utilities
// ==========================================================================

const Utils = {
  /**
   * Generate a unique ID
   */
  generateId(prefix = 'block') {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
  },

  /**
   * Deep clone an object
   */
  deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch {
      return obj;
    }
  },

  /**
   * Sanitize HTML to prevent XSS (basic)
   */
  sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  /**
   * Convert hex to RGB object
   */
  hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  },

  /**
   * Convert RGB to hex
   */
  rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  },

  /**
   * Parse inline styles string into an object
   */
  parseStyles(styleStr) {
    const styles = {};
    if (!styleStr) return styles;
    styleStr.split(';').forEach(s => {
      const [key, val] = s.split(':').map(p => p?.trim());
      if (key && val) styles[key] = val;
    });
    return styles;
  },

  /**
   * Convert styles object to inline string
   */
  stylesToString(stylesObj) {
    return Object.entries(stylesObj)
      .map(([key, val]) => `${key}:${val}`)
      .join(';');
  },

  /**
   * Debounce function
   */
  debounce(fn, delay = 250) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  /**
   * Show a toast notification
   */
  showToast(message, type = 'success', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    const iconSvg = type === 'success'
      ? '<svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>'
      : '<svg class="toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toast-out 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  /**
   * Escape HTML entities for code display
   */
  escapeHTML(str) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return str.replace(/[&<>"']/g, c => map[c]);
  },

  /**
   * Check if a color is light or dark
   */
  isLightColor(hex) {
    const { r, g, b } = Utils.hexToRgb(hex);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  }
};

window.Utils = Utils;
