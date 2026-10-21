(function () {
  var root = document.documentElement;
  function isDark() {
    return root.dataset.look !== "light";
  }
  document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.dataset.look = next;
      try { localStorage.setItem("framez-theme", next); } catch (e) {}
    });
  });
  var scrim = document.querySelector("[data-scrim]");
  function menu(open) {
    document.body.classList.toggle("menu-open", open);
    if (scrim) scrim.hidden = !open;
  }
  document.querySelectorAll("[data-menu]").forEach(function (b) {
    b.addEventListener("click", function () { menu(!document.body.classList.contains("menu-open")); });
  });
  if (scrim) scrim.addEventListener("click", function () { menu(false); });
  var toc = document.querySelectorAll(".toc a");
  if (toc.length && "IntersectionObserver" in window) {
    var byId = {};
    toc.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var seen = {};
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { seen[e.target.id] = e.isIntersecting; });
      var first = null;
      for (var i = 0; i < toc.length; i++) {
        var id = toc[i].getAttribute("href").slice(1);
        if (seen[id]) { first = toc[i]; break; }
      }
      if (first) {
        toc.forEach(function (a) { a.classList.toggle("on", a === first); });
      }
    }, { rootMargin: "-72px 0px -55% 0px" });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }
  function flash() {
    var id = decodeURIComponent(location.hash.slice(1));
    var el = id && document.getElementById(id);
    if (el && el.classList.contains("entry")) {
      el.classList.remove("flash");
      void el.offsetWidth;
      el.classList.add("flash");
    }
  }
  window.addEventListener("hashchange", flash);
  flash();
  var box = document.getElementById("search");
  var q = document.getElementById("search-q");
  var out = document.getElementById("search-results");
  var INDEX = window.FRAMEZ_INDEX || [];
  var hits = [], pick = 0;
  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function mark(s, words) {
    var h = esc(s);
    words.forEach(function (w) {
      if (w.length < 2) return;
      h = h.replace(new RegExp("(" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), "<mark>$1</mark>");
    });
    return h;
  }
  function run() {
    var text = q.value.trim().toLowerCase();
    var words = text.split(/\s+/).filter(Boolean);
    if (!words.length) {
      hits = [];
      out.innerHTML = '<p>Type a word: jump, loop, video, pin, emote...</p>';
      return;
    }
    hits = [];
    INDEX.forEach(function (e) {
      var t = e.t.toLowerCase(), all = t + " " + e.x.toLowerCase() + " " + e.p.toLowerCase();
      for (var i = 0; i < words.length; i++) if (all.indexOf(words[i]) < 0) return;
      var score = 0;
      words.forEach(function (w) { if (t.indexOf(w) >= 0) score += t.indexOf(w) === 0 ? 3 : 2; });
      if (e.u.indexOf("#") < 0) score += 1;
      hits.push({ e: e, s: score });
    });
    hits.sort(function (a, b) { return b.s - a.s; });
    hits = hits.slice(0, 30);
    pick = 0;
    if (!hits.length) {
      out.innerHTML = "<p>Nothing found. Try another word.</p>";
      return;
    }
    out.innerHTML = hits.map(function (h, i) {
      return '<a href="' + h.e.u + '" role="option" aria-selected="' + (i === 0) + '"><b>' + mark(h.e.t, words) +
        "</b><small>" + esc(h.e.p) + "</small>" + (h.e.x ? "<span>" + mark(h.e.x, words) + "</span>" : "") + "</a>";
    }).join("");
  }
  function select(i) {
    var rows = out.querySelectorAll("a");
    if (!rows.length) return;
    pick = (i + rows.length) % rows.length;
    rows.forEach(function (r, k) { r.setAttribute("aria-selected", k === pick); });
    rows[pick].scrollIntoView({ block: "nearest" });
  }
  function open() {
    menu(false);
    box.hidden = false;
    q.value = "";
    run();
    q.focus();
  }
  function close() { box.hidden = true; }
  document.querySelectorAll("[data-search]").forEach(function (b) { b.addEventListener("click", open); });
  box.addEventListener("click", function (e) { if (e.target === box) close(); });
  out.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
  q.addEventListener("input", run);
  q.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); select(pick + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); select(pick - 1); }
    else if (e.key === "Enter") {
      var a = out.querySelectorAll("a")[pick];
      if (a) { close(); location.href = a.getAttribute("href"); }
    } else if (e.key === "Escape") { close(); }
  });
  document.addEventListener("keydown", function (e) {
    var typing = /INPUT|TEXTAREA/.test((document.activeElement || {}).tagName || "");
    if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing)) {
      e.preventDefault();
      if (box.hidden) open(); else close();
    } else if (e.key === "Escape" && !box.hidden) {
      close();
    }
  });
})();
