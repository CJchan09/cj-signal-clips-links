(() => {
  'use strict';
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  let selected = null;
  try {
    const saved = localStorage.getItem('cj-signal-theme');
    if (saved === 'dark' || saved === 'light') selected = saved;
  } catch { /* Links remain usable when storage is unavailable. */ }
  function refresh() {
    if (selected) root.dataset.theme = selected;
    else delete root.dataset.theme;
    const dark = selected ? selected === 'dark' : media.matches;
    button.textContent = dark ? 'Light theme' : 'Dark theme';
    button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  button.addEventListener('click', () => {
    const dark = selected ? selected === 'dark' : media.matches;
    selected = dark ? 'light' : 'dark';
    try { localStorage.setItem('cj-signal-theme', selected); } catch { /* Session-only preference. */ }
    refresh();
  });
  media.addEventListener('change', refresh);
  refresh();
  button.hidden = false;
})();
