/* Ever Clean Services — shared behaviour for index.html and service.html.
   All clicks are bound here (no inline handlers). */
(function () {
  "use strict";

  var DATA = window.EVERCLEAN;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Icons (inline SVG, stroke = currentColor) ---------- */
  var S = 'xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  var ICONS = {
    menu: '<svg ' + S + ' viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg ' + S + ' viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    search: '<svg ' + S + ' viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    instagram: '<svg ' + S + ' viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>',
    sparkle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5c.5 4.9 2.6 9 10.5 10.5C14.6 13.5 12.5 17.6 12 22.5 11.5 17.6 9.4 13.5 1.5 12 9.4 10.5 11.5 6.4 12 1.5z"/></svg>',
    pin: '<svg ' + S + ' viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    camera: '<svg ' + S + ' viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    check: '<svg ' + S + ' viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    homes: '<svg ' + S + ' viewBox="0 0 64 64" stroke-width="2.2"><path d="M8 30L32 10l24 20"/><path d="M14 26v28h36V26"/><rect x="27" y="38" width="10" height="16"/><rect x="18" y="32" width="7" height="7"/><rect x="39" y="32" width="7" height="7"/><path d="M42 14v-4h5v8"/><path d="M54 6l1.2 3 3 1.2-3 1.2L54 14.4l-1.2-3-3-1.2 3-1.2z" fill="currentColor" stroke="none"/></svg>',
    offices: '<svg ' + S + ' viewBox="0 0 64 64" stroke-width="2.2"><rect x="12" y="10" width="24" height="44"/><rect x="36" y="24" width="16" height="30"/><path d="M18 18h4M26 18h4M18 26h4M26 26h4M18 34h4M26 34h4M18 42h4M26 42h4M41 32h6M41 40h6"/><path d="M8 54h48"/><path d="M52 6l1.2 3 3 1.2-3 1.2L52 14.4l-1.2-3-3-1.2 3-1.2z" fill="currentColor" stroke="none"/></svg>',
    airbnb: '<svg ' + S + ' viewBox="0 0 64 64" stroke-width="2.2"><path d="M8 50h48"/><path d="M12 50V36h40v14"/><path d="M12 36v-6a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v6"/><rect x="18" y="29" width="11" height="7" rx="2"/><rect x="35" y="29" width="11" height="7" rx="2"/><circle cx="44" cy="14" r="4"/><path d="M41 17l-7 7M36 22l2 2M38.5 19.5l2 2"/><path d="M14 8l1.2 3 3 1.2-3 1.2L14 16.4l-1.2-3-3-1.2 3-1.2z" fill="currentColor" stroke="none"/></svg>'
  };

  function fillIcons(root) {
    $$("[data-icon]", root).forEach(function (el) {
      var name = el.getAttribute("data-icon");
      if (ICONS[name] && !el.firstElementChild) el.insertAdjacentHTML("afterbegin", ICONS[name]);
    });
  }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function serviceCard(s) {
    return (
      '<a class="card reveal" href="service.html?s=' + s.id + '">' +
        '<div class="card__media"><span class="card__tag">' + esc(s.name) + "</span>" + ICONS[s.id] + "</div>" +
        '<div class="card__body">' +
          '<h3 class="card__title">' + esc(s.title) + "</h3>" +
          '<p class="card__text">' + esc(s.short) + "</p>" +
          '<span class="card__link">View details →</span>' +
        "</div>" +
      "</a>"
    );
  }

  /* ---------- Shared UI: drawer + search overlay (injected once) ---------- */
  function injectChrome() {
    var links = DATA.services.map(function (s) {
      return '<a class="drawer__link" href="service.html?s=' + s.id + '">' + esc(s.name) + "</a>";
    }).join("");

    document.body.insertAdjacentHTML("beforeend",
      '<div class="drawer-backdrop" data-action="menu-close"></div>' +
      '<aside class="drawer" id="drawer" aria-label="Menu" aria-hidden="true">' +
        '<div class="drawer__top"><strong style="color:var(--navy);letter-spacing:.08em">MENU</strong>' +
        '<button class="icon-btn" type="button" data-action="menu-close" aria-label="Close menu">' + ICONS.close + "</button></div>" +
        '<a class="drawer__link" href="index.html#top">Home</a>' + links +
        '<a class="drawer__link" href="index.html#about">About</a>' +
        '<a class="drawer__link" href="index.html#photos">Photos</a>' +
        '<a class="drawer__link" href="' + DATA.instagramUrl + '" target="_blank" rel="noopener">Instagram @' + DATA.instagram + "</a>" +
        '<a class="btn btn--primary" href="index.html#book">Book your cleaning today</a>' +
      "</aside>" +

      '<div class="search" id="search" role="dialog" aria-modal="true" aria-label="Search services">' +
        '<div class="container">' +
          '<div class="search__bar">' +
            '<label for="search-input" class="visually-hidden">Search</label>' +
            '<input id="search-input" type="search" placeholder="Search: home, office, Airbnb…" autocomplete="off">' +
            '<button class="icon-btn" type="button" data-action="search-close" aria-label="Close search">' + ICONS.close + "</button>" +
          "</div>" +
          '<h2 class="search__title">Search results</h2>' +
          '<div class="search__meta"><span id="search-query"></span><span id="search-count"></span></div>' +
          '<div class="grid" id="search-results"></div>' +
          '<div class="search__empty" id="search-empty" hidden>' +
            "<p>We couldn’t find that service.</p>" +
            '<a class="btn btn--outline" href="' + DATA.instagramDm + '" target="_blank" rel="noopener">Ask us on Instagram</a>' +
          "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function openMenu() { document.body.classList.add("menu-open"); $("#drawer").setAttribute("aria-hidden", "false"); }
  function closeMenu() { document.body.classList.remove("menu-open"); $("#drawer").setAttribute("aria-hidden", "true"); }

  function runSearch(q) {
    var query = q.trim().toLowerCase();
    var results = DATA.services.filter(function (s) {
      if (!query) return true;
      var hay = [s.name, s.title, s.short, s.description].concat(s.keywords).join(" ").toLowerCase();
      return query.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
    });
    $("#search-results").innerHTML = results.map(serviceCard).join("");
    $$("#search-results .reveal").forEach(function (el) { el.classList.add("is-in"); });
    $("#search-query").textContent = query ? 'Results for "' + q.trim() + '"' : "All services";
    $("#search-count").textContent = results.length + (results.length === 1 ? " result" : " results");
    $("#search-empty").hidden = results.length > 0;
  }
  function openSearch() {
    closeMenu();
    document.body.classList.add("search-open");
    var input = $("#search-input");
    runSearch(input.value);
    setTimeout(function () { input.focus(); }, 30);
  }
  function closeSearch() { document.body.classList.remove("search-open"); }

  function bindGlobal() {
    document.addEventListener("click", function (e) {
      var actionEl = e.target.closest("[data-action]");
      if (actionEl) {
        var action = actionEl.getAttribute("data-action");
        if (action === "menu-open") openMenu();
        if (action === "menu-close") closeMenu();
        if (action === "search-open") openSearch();
        if (action === "search-close") closeSearch();
        return;
      }
      // Close the drawer / search when a link inside them is followed
      var link = e.target.closest("a");
      if (link && (link.closest("#drawer") || link.closest("#search"))) { closeMenu(); closeSearch(); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeMenu(); closeSearch(); }
    });
    $("#search-input").addEventListener("input", function (e) { runSearch(e.target.value); });
  }

  /* ---------- Reveal on scroll ---------- */
  function bindReveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Home page ---------- */
  function initHome() {
    var grid = $("#services-grid");
    if (!grid) return;
    grid.innerHTML = DATA.services.map(serviceCard).join("");

    // Service radio buttons in the booking form
    $("#service-pick").innerHTML = DATA.services.map(function (s, i) {
      return '<input type="radio" name="service" id="svc-' + s.id + '" value="' + s.id + '"' + (i === 0 ? " required" : "") + '>' +
             '<label for="svc-' + s.id + '">' + esc(s.name) + "</label>";
    }).join("");

    // Preselect from ?service=homes (used by the service pages)
    var pre = new URLSearchParams(location.search).get("service");
    if (pre && $("#svc-" + pre)) $("#svc-" + pre).checked = true;

    bindBooking();
    bindStickyCta();
  }

  function buildMessage(f) {
    var svc = DATA.services.filter(function (s) { return s.id === f.service; })[0];
    var lines = ["Hi Ever Clean! I'd like to book a cleaning.", "", "Service: " + (svc ? svc.name : f.service), "Name: " + f.name];
    if (f.area) lines.push("Address/area in Calgary: " + f.area);
    if (f.date) lines.push("Preferred date: " + f.date);
    if (f.notes) lines.push("About the space: " + f.notes);
    return lines.join("\n");
  }

  function copyText(text, fallbackEl) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacyCopy(fallbackEl); });
    }
    return Promise.resolve(legacyCopy(fallbackEl));
  }
  function legacyCopy(el) {
    try { el.focus(); el.select(); return document.execCommand("copy"); } catch (e) { return false; }
  }

  function bindBooking() {
    var form = $("#book-form");
    var out = $("#result-text");
    var status = $("#result-status");
    var error = $("#form-error");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var checked = form.querySelector('input[name="service"]:checked');
      var data = {
        service: checked ? checked.value : "",
        name: $("#f-name").value.trim(),
        area: $("#f-area").value.trim(),
        date: $("#f-date").value,
        notes: $("#f-notes").value.trim()
      };
      if (!data.service) { error.textContent = "Please choose a service: Homes, Offices or Airbnb."; return; }
      if (!data.name) { error.textContent = "Please tell us your name."; $("#f-name").focus(); return; }
      error.textContent = "";

      var msg = buildMessage(data);
      out.value = msg;
      $("#book-result").classList.add("is-visible");

      // Open Instagram right away (inside the user's tap, so it isn't blocked)
      window.open(DATA.instagramDm, "_blank", "noopener");

      copyText(msg, out).then(function (ok) {
        status.textContent = ok
          ? "We copied your message. Paste it in the Instagram chat with @" + DATA.instagram + " and send."
          : "Copy the message below, then paste it in the Instagram chat with @" + DATA.instagram + ".";
      });
      $("#book-result").scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    $("#copy-again").addEventListener("click", function () {
      var btn = this;
      copyText(out.value, out).then(function (ok) {
        btn.textContent = ok ? "Copied ✓" : "Select the text and copy it";
        setTimeout(function () { btn.textContent = "Copy message"; }, 2200);
      });
    });
  }

  function bindStickyCta() {
    var cta = $("#sticky-cta");
    var hero = $(".hero");
    var book = $("#book");
    if (!cta || !hero || !book || !("IntersectionObserver" in window)) return;
    var heroVisible = true, bookVisible = false;
    function update() { cta.classList.toggle("is-visible", !heroVisible && !bookVisible); }
    new IntersectionObserver(function (en) { heroVisible = en[0].isIntersecting; update(); }).observe(hero);
    new IntersectionObserver(function (en) { bookVisible = en[0].isIntersecting; update(); }, { threshold: 0.05 }).observe(book);
  }

  /* ---------- Service detail page ---------- */
  function initService() {
    var root = $("#service-detail");
    if (!root) return;
    var id = new URLSearchParams(location.search).get("s");
    var s = DATA.services.filter(function (x) { return x.id === id; })[0] || DATA.services[0];

    document.title = s.title + " in Calgary | Ever Clean Services";
    var meta = $('meta[name="description"]');
    if (meta) meta.setAttribute("content", s.title + " by Ever Clean Services in Calgary, Alberta. " + s.short);
    $("#crumb-current").textContent = s.name;

    var included = s.included.length
      ? "<ul>" + s.included.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>"
      : '<p style="margin:0;color:var(--muted)">Details coming soon <span class="tbc">[a confirmar]</span> — ask us on Instagram.</p>';

    root.innerHTML =
      '<div class="detail__media"><span class="card__tag">' + esc(s.name) + "</span>" + ICONS[s.id] + "</div>" +
      "<div>" +
        '<span class="detail__brand">Ever Clean Services</span>' +
        "<h1>" + esc(s.title) + "</h1>" +
        '<p class="detail__desc">' + esc(s.description) + "</p>" +
        '<div class="detail__box"><h2>What’s included</h2>' + included + "</div>" +
        '<div class="detail__actions">' +
          '<a class="btn btn--primary btn--block" href="index.html?service=' + s.id + '#book">Book your cleaning today</a>' +
          '<a class="btn btn--outline btn--block" href="' + DATA.instagramDm + '" target="_blank" rel="noopener">Message us on Instagram</a>' +
        "</div>" +
        '<ul class="detail__meta">' +
          "<li>" + ICONS.pin + "Calgary, Alberta</li>" +
          "<li>" + ICONS.sparkle + "Spotless results, every time</li>" +
        "</ul>" +
      "</div>";

    $("#related-grid").innerHTML = DATA.services.filter(function (x) { return x.id !== s.id; }).map(serviceCard).join("");
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    injectChrome();
    initHome();
    initService();
    fillIcons(document);
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
    bindGlobal();
    bindReveal();
  });
})();
