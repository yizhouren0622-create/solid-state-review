(() => {
  'use strict';
  const path = location.pathname.split('/').pop() || 'index.html';
  for (const a of document.querySelectorAll('.site-links a')) {
    if (a.dataset.page === path) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }
  }
  const top = document.querySelector('.site-top');
  const menu = document.querySelector('.site-menu-btn');
  if (menu && top) {
    menu.addEventListener('click', () => {
      menu.setAttribute('aria-expanded', String(top.classList.toggle('open')));
    });
    for (const a of document.querySelectorAll('.site-links a')) {
      a.addEventListener('click', () => {
        top.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
      });
    }
  }
  let printState = null;
  function restorePrint() {
    if (!printState) return;
    for (const [node, open] of printState) node.open = open;
    document.body.classList.remove('print-solutions');
    printState = null;
  }
  for (const button of document.querySelectorAll('[data-close-reveals]')) {
    button.addEventListener('click', () => {
      for (const node of document.querySelectorAll('.reveal')) node.open = false;
    });
  }
  for (const button of document.querySelectorAll('[data-print]')) {
    button.addEventListener('click', () => {
      restorePrint();
      printState = [...document.querySelectorAll('.reveal')].map((node) => [node, node.open]);
      const solutions = button.dataset.print === 'solutions';
      document.body.classList.toggle('print-solutions', solutions);
      for (const [node] of printState) node.open = solutions;
      window.print();
    });
  }
  window.addEventListener('afterprint', restorePrint);

  const choices = [...document.querySelectorAll('[data-lang-choice]')];
  function applyLang(lang) {
    document.documentElement.dataset.lang = lang;
    try { localStorage.setItem('ssp-answer-lang', lang); } catch (err) { /* private mode */ }
    for (const button of choices) {
      button.setAttribute('aria-pressed', String(button.dataset.langChoice === lang));
    }
  }
  if (choices.length) {
    applyLang(document.documentElement.dataset.lang || 'both');
    for (const button of choices) {
      button.addEventListener('click', () => applyLang(button.dataset.langChoice));
    }
  }
})();
