// Legacy Android 5.0 - 7.1.2 Webview Polyfills
(function() {
  if (typeof globalThis === 'undefined') { window.globalThis = window; }
  if (!Object.fromEntries) {
    Object.fromEntries = function(entries) {
      if (!entries) return {};
      var obj = {};
      for (var i = 0; i < entries.length; i++) {
        var pair = entries[i];
        if (pair) obj[pair[0]] = pair[1];
      }
      return obj;
    };
  }
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(l, p) {
      l = l >> 0;
      p = String(typeof p !== 'undefined' ? p : ' ');
      if (this.length > l) return String(this);
      var s = String(this);
      while (s.length < l) s = p + s;
      return s;
    };
  }
  if (!String.prototype.padEnd) {
    String.prototype.padEnd = function(l, p) {
      l = l >> 0;
      p = String(typeof p !== 'undefined' ? p : ' ');
      if (this.length > l) return String(this);
      var s = String(this);
      while (s.length < l) s = s + p;
      return s;
    };
  }
  if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(search, repl) {
      return this.split(search).join(repl);
    };
  }
  if (!Array.prototype.flat) {
    Array.prototype.flat = function(depth) {
      depth = depth === undefined ? 1 : Number(depth);
      var res = [];
      (function flatten(arr, d) {
        for (var i = 0; i < arr.length; i++) {
          if (Array.isArray(arr[i]) && d > 0) flatten(arr[i], d - 1);
          else res.push(arr[i]);
        }
      })(this, depth);
      return res;
    };
  }
})();
