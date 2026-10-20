import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Handle WordPress/WooCommerce background AJAX endpoints gracefully
app.all(['/wp-admin/admin-ajax.php', '/'], (req, res, next) => {
  if (req.query['wc-ajax'] || (req.path && req.path.includes('admin-ajax.php'))) {
    return res.json({
      success: true,
      data: { sent_count: 0 },
      fragments: {},
      cart_hash: ''
    });
  }
  next();
});

app.post('*', (req, res, next) => {
  if (req.xhr || req.headers['content-type']?.includes('json') || req.path.includes('wp-admin') || req.query['wc-ajax']) {
    return res.json({ success: true, data: {} });
  }
  next();
});

const indexPath = path.join(__dirname, 'reference', 'index.html');
let cachedHtml = null;

function getSafeHtml() {
  if (!cachedHtml) {
    const rawHtml = fs.readFileSync(indexPath, 'utf-8');
    const guardScript = `
<script>
(function() {
  // 1. Wrap ResizeObserver with requestAnimationFrame to prevent notification loops in iframe
  if (typeof window.ResizeObserver !== 'undefined') {
    var OriginalResizeObserver = window.ResizeObserver;
    window.ResizeObserver = class ResizeObserver extends OriginalResizeObserver {
      constructor(callback) {
        super(function(entries, observer) {
          window.requestAnimationFrame(function() {
            try {
              callback(entries, observer);
            } catch (err) {
              // Benign ResizeObserver notification error handled
            }
          });
        });
      }
    };
  }

  // 2. Intercept and suppress ResizeObserver notifications, cross-origin, and legacy tracker errors
  window.addEventListener('error', function(e) {
    var msg = (e && e.message) ? String(e.message) : '';
    var lower = msg.toLowerCase();
    var filename = (e && e.filename) ? String(e.filename) : '';
    if (
      lower.indexOf('resizeobserver') !== -1 ||
      msg === 'Script error.' ||
      msg.indexOf('Script error') !== -1 ||
      (filename && filename.indexOf(window.location.host) === -1) ||
      (e.target && (e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK'))
    ) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      return true;
    }
  }, true);

  // 3. Intercept unhandled promise rejections (e.g. from analytics network calls)
  window.addEventListener('unhandledrejection', function(e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
  }, true);

  // 4. Fallback standard onerror
  window.onerror = function(msg, url, line, col, err) {
    var str = typeof msg === 'string' ? msg.toLowerCase() : '';
    if (
      str.indexOf('resizeobserver') !== -1 ||
      str === 'script error.' ||
      str.indexOf('script error') !== -1 ||
      (url && url.indexOf(window.location.host) === -1)
    ) {
      return true;
    }
  };

  // 5. Safe stubs for globals expected by WordPress / LiteSpeed / Google / FB trackers
  window.n2const = window.n2const || { prefersReducedMotion: false };
  window._N2 = window._N2 || { _r: [], _d: [], r: function(){}, d: function(){} };
  window._N2.SmartSliderSimple = window._N2.SmartSliderSimple || function() {};
  window._N2.SmartSliderWidgetArrowImage = window._N2.SmartSliderWidgetArrowImage || function() {};
  window._N2.SmartSliderWidgetBulletTransition = window._N2.SmartSliderWidgetBulletTransition || function() {};
  
  window.grecaptcha = window.grecaptcha || {
    render: function() { return 0; },
    reset: function() {},
    ready: function(cb) { if (cb) cb(); },
    execute: function() { return Promise.resolve(''); }
  };
  window.fbq = window.fbq || function() {};
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function() { window.dataLayer.push(arguments); };
})();
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
`;
    // Inject right at top of <head>
    cachedHtml = rawHtml.replace(/<head[^>]*>/i, function(match) {
      return match + guardScript;
    });
  }
  return cachedHtml;
}

// Serve homepage with guard script injected
app.get(['/', '/index.html'], (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(getSafeHtml());
});

// Serve static assets from reference directory
app.use(express.static(path.join(__dirname, 'reference'), {
  index: false
}));

// Route fallback for client navigation
app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(getSafeHtml());
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
