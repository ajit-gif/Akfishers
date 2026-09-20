/* ============================================================
   AK FISHERS — Shared App Logic
   Header, cart, wishlist, toasts, mobile menu
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Icons ---------- */
  var ICONS = {
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1.6"/><circle cx="19" cy="21" r="1.6"/><path d="M2.5 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L21.5 7H6"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.5 3.5-7"/></svg>',
    knife: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l13.5-13.5a3.5 3.5 0 0 1 5 5L8 22H3v-5z"/><path d="M14 7l3 3"/></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
    snow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 2v20M4 6l16 12M20 6L4 18"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.7-10-9.3C.6 8.6 2.4 5 5.8 5c2 0 3.4 1 4.2 2.4C10.8 6 12.2 5 14.2 5c3.4 0 5.2 3.6 3.8 6.7C19.5 16.3 12 21 12 21z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7L5.8 21l1.6-7L2 9.2l7.1-.6z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4L11 3H4v7l10.4 10.6a2 2 0 0 0 2.8 0l3.4-3.4a2 2 0 0 0 0-2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1v-10.5z"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
    logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
    wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z"/></svg>',
    cash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M12 12v4"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.5 9a9 9 0 0 1 14.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0 0 20.5 15"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15l4-6 4 3 5-8"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 20l-6 2V6l6-2 6 2 6-2v16l-6 2-6-2z"/><path d="M9 4v16M15 6v16"/></svg>',
    boxOpen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
    filter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M22 3H2l8 9.5V19l4 2v-8.5z"/></svg>'
  };

  window.AKF_ICONS = ICONS;

  /* ---------- Cart store ---------- */
  var CART_KEY = "akf_cart";
  var WISH_KEY = "akf_wishlist";
  var USER_KEY = "akf_user";

  function readCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
  }
  function writeCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
    window.dispatchEvent(new CustomEvent("akf:cartchange", { detail: cart }));
  }
  function readWish() {
    try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; } catch (e) { return []; }
  }
  function writeWish(w) {
    localStorage.setItem(WISH_KEY, JSON.stringify(w));
    window.dispatchEvent(new CustomEvent("akf:wishchange", { detail: w }));
  }

  window.AKF_CART = {
    get: readCart,
    set: writeCart,
    add: function (productId, weight, cut, qty) {
      var cart = readCart();
      var existing = cart.find(function (i) { return i.id === productId && i.weight === weight && i.cut === cut; });
      if (existing) {
        existing.qty += qty || 1;
      } else {
        cart.push({ id: productId, weight: weight, cut: cut, qty: qty || 1 });
      }
      writeCart(cart);
      return cart;
    },
    remove: function (productId, weight, cut) {
      var cart = readCart().filter(function (i) { return !(i.id === productId && i.weight === weight && i.cut === cut); });
      writeCart(cart);
      return cart;
    },
    updateQty: function (productId, weight, cut, qty) {
      var cart = readCart();
      var item = cart.find(function (i) { return i.id === productId && i.weight === weight && i.cut === cut; });
      if (item) {
        item.qty = Math.max(1, qty);
        writeCart(cart);
      }
      return cart;
    },
    clear: function () { writeCart([]); },
    count: function () {
      return readCart().reduce(function (n, i) { return n + i.qty; }, 0);
    },
    subtotal: function () {
      return readCart().reduce(function (sum, i) {
        var p = akfGetProduct(i.id);
        if (!p) return sum;
        var price = i.weight ? p.price * (i.weight / 1000) : p.price;
        return sum + price * i.qty;
      }, 0);
    },
    items: function () {
      return readCart().map(function (i) {
        var p = akfGetProduct(i.id);
        if (!p) return null;
        return { item: i, product: p, lineTotal: (i.weight ? p.price * (i.weight / 1000) : p.price) * i.qty };
      }).filter(function (x) { return x; });
    }
  };

  window.AKF_WISH = {
    get: readWish,
    toggle: function (id) {
      var w = readWish();
      var idx = w.indexOf(id);
      if (idx > -1) { w.splice(idx, 1); } else { w.push(id); }
      writeWish(w);
      return w.indexOf(id) > -1;
    },
    has: function (id) { return readWish().indexOf(id) > -1; }
  };

  /* ----------------------------------------------------------------
     User / auth  —  the server (PHP session cookie) is the source of
     truth. localStorage holds only a non-sensitive display cache so
     the header can render instantly; it is re-checked against
     /api/me.php on every page load.
  ---------------------------------------------------------------- */
  var GUEST_KEY = "akf_guest";
  var API = "/api/";

  function apiFetch(path, opts) {
    opts = opts || {};
    opts.credentials = "same-origin";
    opts.headers = Object.assign({ "Accept": "application/json" }, opts.headers || {});
    var ctrl = window.AbortController ? new AbortController() : null;
    if (ctrl) { opts.signal = ctrl.signal; setTimeout(function () { ctrl.abort(); }, 15000); }
    return fetch(API + path, opts).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (body) {
        return { status: r.status, ok: r.ok, body: body || {} };
      });
    }).catch(function (err) {
      var timedOut = err && err.name === "AbortError";
      return {
        status: 0, ok: false,
        body: { error: timedOut ? "timeout" : "network",
                message: timedOut
                  ? "The request timed out. Please try again."
                  : "Can't reach the server. Check your connection and try again." }
      };
    });
  }

  function cacheUser(u) {
    try {
      if (u) localStorage.setItem(USER_KEY, JSON.stringify(u));
      else localStorage.removeItem(USER_KEY);
    } catch (e) {}
    window.dispatchEvent(new CustomEvent("akf:userchange", { detail: u || null }));
  }

  window.AKF_USER = {
    /* authenticated user (display cache); null if not logged in */
    get: function () { try { return JSON.parse(localStorage.getItem(USER_KEY)) || null; } catch (e) { return null; } },

    /* best-effort details for pre-filling forms: logged-in user, else last guest */
    prefill: function () {
      var u = window.AKF_USER.get();
      if (u && !u.isAdmin) return u;      // admins shop as guests, not as "the customer"
      try { return JSON.parse(localStorage.getItem(GUEST_KEY)) || null; } catch (e) { return null; }
    },
    saveGuest: function (d) { try { localStorage.setItem(GUEST_KEY, JSON.stringify(d)); } catch (e) {} },

    /* true once the server has answered /api/me.php with a real status */
    backendReady: null,

    /* re-verify session with the server; updates the cache. Never rejects. */
    refresh: function () {
      return apiFetch("me.php").then(function (res) {
        window.AKF_USER.backendReady = (res.status !== 0 && res.status !== 503);
        var u = res.ok && res.body && res.body.user ? res.body.user : null;
        cacheUser(u);
        return u;
      }).catch(function () {
        window.AKF_USER.backendReady = false;
        return window.AKF_USER.get();   // offline / timeout: keep showing the cache
      });
    },

    login: function (identifier, password) {
      return apiFetch("login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier, password: password })
      }).then(function (res) {
        if (res.ok && res.body.user) { cacheUser(res.body.user); return { ok: true, user: res.body.user }; }
        return { ok: false, status: res.status, error: res.body.error || "error", message: res.body.message || "Login failed.", fields: res.body.fields };
      });
    },

    signup: function (payload) {
      return apiFetch("signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (res.ok && res.body.user) { cacheUser(res.body.user); return { ok: true, user: res.body.user }; }
        return { ok: false, status: res.status, error: res.body.error || "error", message: res.body.message || "Sign up failed.", fields: res.body.fields };
      });
    },

    updateProfile: function (payload) {
      return apiFetch("profile.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (res.ok && res.body.user) { cacheUser(res.body.user); return { ok: true, user: res.body.user }; }
        return { ok: false, status: res.status, error: res.body.error || "error", message: res.body.message || "Update failed.", fields: res.body.fields };
      });
    },

    logout: function () {
      return apiFetch("logout.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" })
        .catch(function () {})
        .then(function () { cacheUser(null); });
    }
  };

  /* ---------- Toast ---------- */
  function toast(msg, type) {
    type = type || "success";
    var wrap = document.querySelector(".toast-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "toast-wrap";
      document.body.appendChild(wrap);
    }
    var t = document.createElement("div");
    t.className = "toast " + type;
    t.innerHTML = '<span class="t-icon">' + (type === "success" ? ICONS.check : type === "error" ? ICONS.alert : ICONS.info) + '</span><span>' + msg + '</span>';
    wrap.appendChild(t);
    setTimeout(function () {
      t.classList.add("hide");
      setTimeout(function () { t.remove(); }, 320);
    }, 3200);
  }
  window.AKF_TOAST = toast;

  /* ---------- Cart badge ---------- */
  function updateCartBadge() {
    var count = AKF_CART.count();
    document.querySelectorAll(".cart-count").forEach(function (el) {
      el.textContent = count;
      el.style.display = count > 0 ? "grid" : "none";
    });
  }

  /* ---------- Header render ---------- */
  function renderHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var user = AKF_USER.get();
    var isAdmin = !!(user && user.isAdmin);
    var accountHref = isAdmin ? "/admin" : "/account";
    var accountLabel = isAdmin ? "Admin" : (user ? (user.name || "Account").split(" ")[0] : "Login");

    header.innerHTML =
      '<div class="top-strip">' +
        '<div class="container strip-inner">' +
          '<span>🚚 We deliver across <strong>Mumbai</strong> · Free delivery above ₹999</span>' +
          '<span>·</span>' +
          '<span>Please place orders 1 day in advance</span>' +
        '</div>' +
      '</div>' +
      '<div class="container">' +
        '<div class="header-main">' +
          '<button class="h-action h-action--mobile" data-open-menu aria-label="Menu">' + ICONS.menu + '</button>' +
          '<a class="logo" href="/" aria-label="AK Fishers — home">' +
            '<img class="logo-img" src="/assets/images/logo.png?v=11" alt="AK Fishers — Fresh From The Sea" width="180" height="100">' +
          '</a>' +
          '<div class="loc-selector" data-locator>' +
            '<span class="loc-icon">' + ICONS.pin + '</span>' +
            '<span><span class="loc-label">Deliver to</span><br><span class="loc-value" data-loc-value>Mumbai</span></span>' +
          '</div>' +
          '<div class="header-search">' +
            '<input type="text" placeholder="Search pomfret, prawns, surmai…" data-search-input aria-label="Search products">' +
            '<span class="search-icon">' + ICONS.search + '</span>' +
            '<div class="search-suggest" data-search-suggest></div>' +
          '</div>' +
          '<div class="header-actions">' +
            '<a class="h-action" href="' + accountHref + '" title="Account">' + ICONS.user + '<span>' + accountLabel + '</span></a>' +
            '<a class="h-action" href="/cart" title="Cart">' + ICONS.cart + '<span>Cart</span><span class="cart-count" style="display:none">0</span></a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<nav class="nav-bar"><div class="container nav-inner">' +
        '<div class="mega">' +
          '<a class="nav-link active" href="/shop">' + ICONS.grid + ' Categories <span class="caret">▼</span></a>' +
          '<div class="mega-panel">' +
            AKF_CATEGORIES.map(function (c) {
              return '<a href="/shop?cat=' + c.id + '"><img src="' + c.img + '" alt=""><span>' + c.name + '<small>' + c.marathi + ' · ' + akfCategoryCount(c.id) + ' items</small></span></a>';
            }).join("") +
          '</div>' +
        '</div>' +
        '<a class="nav-link" href="/shop?sort=popular">Best Sellers</a>' +
        '<a class="nav-link" href="/shop?cat=crabs">Crab &amp; Shellfish</a>' +
        '<a class="nav-link" href="/shop?cat=smallfish">Local Catch</a>' +
        '<a class="nav-link" href="/about">About Us</a>' +
        '<a class="nav-link" href="/contact">Contact</a>' +
      '</div></nav>';

    // Mobile menu must live on <body>, not inside .site-header — the header's
    // backdrop-filter makes it a containing block that would trap position:fixed.
    var existingMenu = document.querySelector("[data-mobile-menu]");
    if (existingMenu) existingMenu.remove();
    document.body.insertAdjacentHTML("beforeend",
      '<div class="mobile-menu" data-mobile-menu>' +
        '<div class="mm-backdrop" data-close-menu></div>' +
        '<div class="mm-panel">' +
          '<div class="mm-head"><a class="logo" href="/" aria-label="AK Fishers — home"><img class="logo-img" src="/assets/images/logo.png?v=11" alt="AK Fishers" width="150" height="83"></a>' +
          '<button class="mm-close" data-close-menu aria-label="Close menu">' + ICONS.close + '</button></div>' +
          '<div class="mm-search"><input type="text" placeholder="Search seafood…" data-mm-search></div>' +
          '<div class="mm-group"><h4>Categories</h4>' +
            AKF_CATEGORIES.map(function (c) {
              return '<a href="/shop?cat=' + c.id + '"><img src="' + c.img + '" alt="">' + c.name + '<span class="mm-arrow">›</span></a>';
            }).join("") +
          '</div>' +
          '<div class="mm-divider"></div>' +
          '<div class="mm-group"><h4>Quick Links</h4>' +
            '<a href="/shop">' + ICONS.grid + ' Shop All</a>' +
            '<a href="/about">' + ICONS.info + ' About Us</a>' +
            '<a href="/contact">' + ICONS.phone + ' Contact</a>' +
            '<a href="/account">' + ICONS.user + ' My Account</a>' +
            '<a href="/cart">' + ICONS.cart + ' My Cart</a>' +
          '</div>' +
        '</div>' +
      '</div>');

    bindHeaderEvents();
    updateCartBadge();
  }

  /* ---------- Header events ---------- */
  function bindHeaderEvents() {
    var menu = document.querySelector("[data-mobile-menu]");
    document.querySelectorAll("[data-open-menu]").forEach(function (b) {
      b.addEventListener("click", function () { menu.classList.add("open"); document.body.style.overflow = "hidden"; });
    });
    document.querySelectorAll("[data-close-menu]").forEach(function (b) {
      b.addEventListener("click", function () { menu.classList.remove("open"); document.body.style.overflow = ""; });
    });

    var searchInput = document.querySelector("[data-search-input]");
    var suggest = document.querySelector("[data-search-suggest]");
    if (searchInput && suggest) {
      searchInput.addEventListener("input", function () {
        var q = searchInput.value.trim().toLowerCase();
        if (q.length < 2) { suggest.classList.remove("open"); return; }
        var matches = AKF_PRODUCTS.filter(function (p) {
          return p.name.toLowerCase().indexOf(q) > -1 || p.marathi.indexOf(q) > -1 || p.category.indexOf(q) > -1;
        }).slice(0, 6);
        if (!matches.length) {
          suggest.innerHTML = '<a style="cursor:default;color:var(--muted)">No matches for "' + searchInput.value + '"</a>';
        } else {
          suggest.innerHTML = matches.map(function (p) {
            return '<a href="/product?id=' + p.id + '"><img src="' + p.img + '" alt=""><span><span class="s-name">' + p.name + '</span><br><span class="s-marathi">' + p.marathi + ' · from ' + akfFormatINR(p.price) + '/kg</span></span></a>';
          }).join("");
        }
        suggest.classList.add("open");
      });
      document.addEventListener("click", function (e) {
        if (!e.target.closest(".header-search")) suggest.classList.remove("open");
      });
      searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && searchInput.value.trim()) {
          window.location.href = "/shop?q=" + encodeURIComponent(searchInput.value.trim());
        }
      });
    }

    var mmSearch = document.querySelector("[data-mm-search]");
    if (mmSearch) {
      mmSearch.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && mmSearch.value.trim()) {
          window.location.href = "/shop?q=" + encodeURIComponent(mmSearch.value.trim());
        }
      });
    }

    var locator = document.querySelector("[data-locator]");
    if (locator) {
      locator.addEventListener("click", function () {
        var saved = localStorage.getItem("akf_pincode");
        var val = saved ? saved : "";
        var input = prompt("Enter your delivery pincode:", val);
        if (input && /^\d{6}$/.test(input.trim())) {
          var area = akfFindArea(input.trim());
          localStorage.setItem("akf_pincode", input.trim());
          var locValue = document.querySelector("[data-loc-value]");
          if (locValue) locValue.textContent = area ? area.area : input.trim();
          toast(area ? "Delivery available in " + area.area : "We'll try to deliver to " + input.trim(), area ? "success" : "info");
        } else if (input) {
          toast("Please enter a valid 6-digit pincode", "error");
        }
      });
    }
  }

  /* ---------- Footer render ---------- */
  function renderFooter() {
    var footer = document.querySelector(".site-footer");
    if (!footer) return;
    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-top">' +
          '<div class="footer-brand">' +
            '<a class="logo logo--footer" href="/" aria-label="AK Fishers — home"><img class="logo-img" src="/assets/images/logo.png?v=11" alt="AK Fishers — Fresh From The Sea" width="200" height="111"></a>' +
            '<p>AK Fishers Supplier LLP — fresh seafood delivered from the sea to your doorstep across Mumbai. Carefully selected catch, hygienically cleaned, packed with care.</p>' +
            '<div class="footer-social">' +
              '<a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>' +
              '<a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>' +
              '<a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-4.5 31 31 0 0 0-.4-4.5zM9.8 15.3V8.7l5.8 3.3z"/></svg></a>' +
              '<a href="#" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.4l4.4 5.9zm-1.1 18h1.7L7.1 3.9H5.3z"/></svg></a>' +
            '</div>' +
          '</div>' +
          '<div class="footer-col"><h4>Quick Links</h4><ul>' +
            '<li><a href="/">Home</a></li>' +
            '<li><a href="/shop">Shop</a></li>' +
            '<li><a href="/shop">Categories</a></li>' +
            '<li><a href="/about">About Us</a></li>' +
            '<li><a href="/contact">Contact Us</a></li>' +
          '</ul></div>' +
          '<div class="footer-col"><h4>Customer Links</h4><ul>' +
            '<li><a href="/account">My Account</a></li>' +
            '<li><a href="/account#orders">My Orders</a></li>' +
            '<li><a href="/delivery">Delivery Information</a></li>' +
            '<li><a href="/privacy">Privacy Policy</a></li>' +
            '<li><a href="/terms">Terms &amp; Conditions</a></li>' +
          '</ul></div>' +
          '<div class="footer-col"><h4>Get In Touch</h4><ul class="footer-contact">' +
            '<li>' + ICONS.phone + '<span><a href="tel:+918108106522">+91 81081 06522</a><br><span style="font-size:12px">Mon–Sun, 7 AM – 9 PM</span></span></li>' +
            '<li>' + ICONS.whatsapp + '<span><a href="https://wa.me/918108106522" target="_blank" rel="noopener">WhatsApp Us</a></span></li>' +
            '<li>' + ICONS.mail + '<span><a href="mailto:akfisheriesofficial@gmail.com">akfisheriesofficial@gmail.com</a></span></li>' +
            '<li>' + ICONS.pin + '<span>Sassoon Dock, Ganesh Murti Nagar,<br>Cuffe Parade, Mumbai, Maharashtra 400005</span></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© ' + new Date().getFullYear() + ' AK Fishers Supplier LLP · All rights reserved · Website Designed by Taniya</span>' +
          '<div class="pay-badges"><span>UPI</span><span>VISA</span><span>Mastercard</span><span>RuPay</span><span>COD</span></div>' +
        '</div>' +
      '</div>';
  }

  /* ---------- Global click delegation (add to cart, wishlist) ---------- */
  document.addEventListener("click", function (e) {
    var addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      e.preventDefault();
      var id = addBtn.getAttribute("data-add");
      var p = akfGetProduct(id);
      if (!p) return;
      var weight = p.weights[1] || p.weights[0] || 500;
      var cut = p.cuts[0];
      AKF_CART.add(id, weight, cut, 1);
      toast(p.name + " added to cart", "success");
      return;
    }

    var wishBtn = e.target.closest("[data-wish]");
    if (wishBtn) {
      var wid = wishBtn.getAttribute("data-wish");
      var active = AKF_WISH.toggle(wid);
      wishBtn.classList.toggle("active", active);
      toast(active ? "Added to wishlist" : "Removed from wishlist", active ? "success" : "info");
      return;
    }
  });

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();

    // Keep the header in sync with the auth state, then re-verify with the server.
    window.addEventListener("akf:userchange", function () { renderHeader(); });
    AKF_USER.refresh();

    // Restore pincode
    var savedPin = localStorage.getItem("akf_pincode");
    if (savedPin) {
      var area = akfFindArea(savedPin);
      var locValue = document.querySelector("[data-loc-value]");
      if (locValue) locValue.textContent = area ? area.area : savedPin;
    }

    // Wishlist state
    document.querySelectorAll("[data-wish]").forEach(function (b) {
      if (AKF_WISH.has(b.getAttribute("data-wish"))) b.classList.add("active");
    });
  });
})();