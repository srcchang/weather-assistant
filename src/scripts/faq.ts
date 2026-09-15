function initFAQ(): void {
  const items = document.querySelectorAll<HTMLElement>('[data-faq-item]');
  if (!items.length) return;

  function openItem(item: HTMLElement): void {
    const content = item.querySelector<HTMLElement>('[data-faq-content]');
    const trigger = item.querySelector<HTMLElement>('[data-faq-trigger]');
    const chevron = item.querySelector<HTMLElement>('[data-faq-chevron]');
    if (!content) return;

    item.setAttribute('data-faq-open', 'true');
    content.style.maxHeight = content.scrollHeight + 'px';
    content.style.opacity = '1';
    trigger?.setAttribute('aria-expanded', 'true');
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  }

  function closeItem(item: HTMLElement): void {
    const content = item.querySelector<HTMLElement>('[data-faq-content]');
    const trigger = item.querySelector<HTMLElement>('[data-faq-trigger]');
    const chevron = item.querySelector<HTMLElement>('[data-faq-chevron]');
    if (!content) return;

    item.removeAttribute('data-faq-open');
    content.style.maxHeight = '0';
    content.style.opacity = '0';
    trigger?.setAttribute('aria-expanded', 'false');
    if (chevron) chevron.style.transform = 'rotate(0deg)';
  }

  function toggleItem(item: HTMLElement): void {
    const isOpen = item.hasAttribute('data-faq-open');
    items.forEach(closeItem);
    if (!isOpen) openItem(item);
  }

  items.forEach((item) => {
    const trigger = item.querySelector<HTMLElement>('[data-faq-trigger]');
    if (!trigger) return;
    trigger.addEventListener('click', () => toggleItem(item));
  });

  if (items[0]) openItem(items[0]);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFAQ);
} else {
  initFAQ();
}
