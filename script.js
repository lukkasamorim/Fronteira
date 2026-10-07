(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav-primary');

  if (!toggle || !nav) return;

  function definir(aberto) {
    toggle.setAttribute('aria-expanded', String(aberto));
    toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', aberto);
    document.body.classList.toggle('menu-aberto', aberto);
  }

  function aberto() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    definir(!aberto());
  });

  // Fecha ao clicar em um link do menu
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) definir(false);
  });

  // Fecha ao clicar fora
  document.addEventListener('click', function (e) {
    if (!aberto()) return;
    if (!nav.contains(e.target) && !toggle.contains(e.target)) definir(false);
  });

  // Fecha no Esc e devolve o foco ao botão
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && aberto()) {
      definir(false);
      toggle.focus();
    }
  });

  // Reseta o estado ao voltar para a largura de desktop
  var desktop = window.matchMedia('(min-width: 961px)');
  var aoMudar = function (ev) { if (ev.matches && aberto()) definir(false); };

  if (desktop.addEventListener) desktop.addEventListener('change', aoMudar);
  else desktop.addListener(aoMudar); // Safari antigo
})();