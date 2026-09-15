function initNav() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;

  const hamburger = nav.querySelector<HTMLButtonElement>('[data-hamburger]');
  const mobileMenu = nav.querySelector<HTMLElement>('[data-mobile-menu]');

  function openMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.remove('hidden');
    requestAnimationFrame(() => {
      mobileMenu.classList.remove('opacity-0', '-translate-y-2');
      mobileMenu.classList.add('opacity-100', 'translate-y-0');
    });
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.remove('opacity-100', 'translate-y-0');
    mobileMenu.classList.add('opacity-0', '-translate-y-2');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.addEventListener(
      'transitionend',
      () => {
        if (hamburger.getAttribute('aria-expanded') === 'false') {
          mobileMenu.classList.add('hidden');
        }
      },
      { once: true },
    );
  }

  function isMenuOpen() {
    return hamburger?.getAttribute('aria-expanded') === 'true';
  }

  hamburger?.addEventListener('click', () => {
    if (isMenuOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  const SCROLL_THRESHOLD = 50;
  let isScrolled = false;

  function applyScrollState() {
    const shouldBeScrolled = window.scrollY > SCROLL_THRESHOLD;
    if (shouldBeScrolled === isScrolled) return;
    isScrolled = shouldBeScrolled;
    nav!.classList.toggle('nav-scrolled', shouldBeScrolled);
  }

  applyScrollState();
  window.addEventListener('scroll', applyScrollState, { passive: true });

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!isMenuOpen()) return;
    if (nav.contains(e.target as Node)) return;
    closeMenu();
  });

  // Highlight nav link of the section currently in view
  const sectionLinks = new Map<string, HTMLElement[]>();
  const sections: Element[] = [];
  nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    const id = link.getAttribute('href')!.slice(1);
    const section = document.getElementById(id);
    if (!section) return;
    sections.push(section);
    const links = sectionLinks.get(id) ?? [];
    links.push(link);
    sectionLinks.set(id, links);
  });

  if (sections.length) {
    const setActive = (id: string | null) => {
      sectionLinks.forEach((links, key) => {
        links.forEach((l) => {
          l.classList.toggle('nav-active', key === id);
          if (key === id) l.setAttribute('aria-current', 'true');
          else l.removeAttribute('aria-current');
        });
      });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        setActive(visible ? visible.target.id : null);
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
  }
}

initNav();
