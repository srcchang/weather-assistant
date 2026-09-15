const STORAGE_KEY = 'theme';

function applyTheme(dark: boolean): void {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
}

function updateButtonIcon(button: HTMLButtonElement, isDark: boolean): void {
  const sunIcon = button.querySelector<SVGElement>('.icon-sun');
  const moonIcon = button.querySelector<SVGElement>('.icon-moon');
  if (sunIcon) sunIcon.style.display = isDark ? 'block' : 'none';
  if (moonIcon) moonIcon.style.display = isDark ? 'none' : 'block';
  const label = isDark ? button.dataset.labelLight : button.dataset.labelDark;
  if (label) button.setAttribute('aria-label', label);
}

function isDarkActive(): boolean {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', (e) => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    applyTheme(e.matches);
    syncAllButtons();
  }
});

function syncAllButtons(): void {
  const dark = isDarkActive();
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    updateButtonIcon(btn, dark);
  });
}

function initToggle(): void {
  syncAllButtons();

  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nowDark = !isDarkActive();
      applyTheme(nowDark);
      localStorage.setItem(STORAGE_KEY, nowDark ? 'dark' : 'light');
      syncAllButtons();
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initToggle);
} else {
  initToggle();
}
