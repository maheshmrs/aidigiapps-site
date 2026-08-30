/* Theme toggle: manual choice (localStorage) overrides the OS setting.
   Loaded synchronously in <head> so the stored theme applies before paint. */
(function () {
  try {
    var t = localStorage.theme;
    if (t === "light" || t === "dark") document.documentElement.dataset.theme = t;
  } catch (e) {}

  function effective() {
    var d = document.documentElement.dataset.theme;
    if (d) return d;
    return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  function paint(btn) {
    var light = effective() === "light";
    btn.textContent = light ? "\u{1F319}" : "☀️";
    btn.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  }
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    paint(btn);
    btn.addEventListener("click", function () {
      var next = effective() === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      try { localStorage.theme = next; } catch (e) {}
      paint(btn);
    });
  });
})();
