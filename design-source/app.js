/* Doe seu IR — Pequeno Príncipe · interações (sem backend) */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Navbar ---------- */
  var navbar = document.querySelector('.navbar');
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var burger = document.querySelector('.nav-burger');
  var links = document.querySelector('.navbar-links');
  burger.addEventListener('click', function () {
    var aberto = links.classList.toggle('aberto');
    burger.setAttribute('aria-expanded', aberto ? 'true' : 'false');
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) links.classList.remove('aberto');
  });

  /* ---------- Revelar ao rolar ---------- */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visivel');
        if (entry.target.classList.contains('selo-prazo')) entry.target.classList.add('pop');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal, .selo-prazo').forEach(function (el) { observer.observe(el); });

  /* ---------- Contador R$ 14,59 bilhões ---------- */
  var numeroEl = document.querySelector('[data-contador]');
  if (numeroEl) {
    var alvo = 14.59;
    var contadorFeito = false;
    var obsNum = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting || contadorFeito) return;
      contadorFeito = true;
      obsNum.disconnect();
      if (reduceMotion || document.body.classList.contains('no-anims')) {
        numeroEl.textContent = 'R$ 14,59 bilhões';
        return;
      }
      var inicio = null;
      var dur = 1400;
      function passo(ts) {
        if (!inicio) inicio = ts;
        var p = Math.min((ts - inicio) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var v = (alvo * eased).toFixed(2).replace('.', ',');
        numeroEl.textContent = 'R$ ' + v + ' bilhões';
        if (p < 1) requestAnimationFrame(passo);
        else numeroEl.textContent = 'R$ 14,59 bilhões';
      }
      requestAnimationFrame(passo);
    }, { threshold: 0.4 });
    obsNum.observe(numeroEl);
  }

  /* ---------- Barra de proporção 2,84% ---------- */
  var barra = document.querySelector('.barra-proporcao .preenchido');
  if (barra) {
    var obsBarra = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        barra.style.width = '2.84%';
        barra.style.minWidth = '14px'; /* visível mesmo sendo 2,84% */
        obsBarra.disconnect();
      }
    }, { threshold: 0.4 });
    obsBarra.observe(barra.parentElement);
  }

  /* ---------- Acordeão FAQ ---------- */
  var faqItens = Array.prototype.slice.call(document.querySelectorAll('.faq-item'));
  window.__faqMultiplo = window.__faqMultiplo || false;
  faqItens.forEach(function (item) {
    var btn = item.querySelector('.faq-pergunta');
    btn.addEventListener('click', function () {
      var abrindo = !item.classList.contains('aberto');
      if (!window.__faqMultiplo) {
        faqItens.forEach(function (outro) {
          outro.classList.remove('aberto');
          outro.querySelector('.faq-pergunta').setAttribute('aria-expanded', 'false');
        });
      }
      item.classList.toggle('aberto', abrindo);
      btn.setAttribute('aria-expanded', abrindo ? 'true' : 'false');
    });
  });

  /* ---------- Tooltips dos anexos ---------- */
  document.querySelectorAll('.tooltip-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var zona = trigger.closest('.upload-zona');
      var estavaAberto = zona.classList.contains('tooltip-aberto');
      document.querySelectorAll('.upload-zona.tooltip-aberto').forEach(function (z) {
        z.classList.remove('tooltip-aberto');
      });
      if (!estavaAberto) zona.classList.add('tooltip-aberto');
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.upload-zona.tooltip-aberto').forEach(function (z) {
      z.classList.remove('tooltip-aberto');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.upload-zona.tooltip-aberto').forEach(function (z) {
        z.classList.remove('tooltip-aberto');
      });
    }
  });

  /* ---------- Upload visual (sem backend) ---------- */
  document.querySelectorAll('.upload-zona').forEach(function (zona) {
    var input = zona.querySelector('input[type="file"]');
    var btn = zona.querySelector('.upload-btn');
    var chipArea = zona.querySelector('.arquivo-area');

    function mostrarArquivo(nome) {
      chipArea.innerHTML = '';
      var chip = document.createElement('span');
      chip.className = 'arquivo-chip';
      var nomeEl = document.createElement('span');
      nomeEl.className = 'nome';
      nomeEl.textContent = nome;
      var remover = document.createElement('button');
      remover.type = 'button';
      remover.className = 'remover';
      remover.setAttribute('aria-label', 'Remover arquivo');
      remover.textContent = '×';
      remover.addEventListener('click', function () {
        input.value = '';
        chipArea.innerHTML = '';
      });
      chip.appendChild(nomeEl);
      chip.appendChild(remover);
      chipArea.appendChild(chip);
    }

    btn.addEventListener('click', function () { input.click(); });
    input.addEventListener('change', function () {
      if (input.files && input.files.length) mostrarArquivo(input.files[0].name);
    });
    zona.addEventListener('dragover', function (e) { e.preventDefault(); zona.classList.add('dragover'); });
    zona.addEventListener('dragleave', function () { zona.classList.remove('dragover'); });
    zona.addEventListener('drop', function (e) {
      e.preventDefault();
      zona.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length) {
        mostrarArquivo(e.dataTransfer.files[0].name);
      }
    });
  });

  /* ---------- Validação visual do formulário ---------- */
  var form = document.getElementById('form-darf');
  if (form) {
    var camposObrigatorios = Array.prototype.slice.call(form.querySelectorAll('.campo[data-obrigatorio]'));

    camposObrigatorios.forEach(function (campo) {
      var controle = campo.querySelector('input, select');
      controle.addEventListener('blur', function () {
        if (controle.value.trim()) {
          campo.classList.remove('erro');
          campo.classList.add('valido');
        } else {
          campo.classList.remove('valido');
        }
      });
      controle.addEventListener('input', function () {
        if (controle.value.trim()) campo.classList.remove('erro');
      });
      controle.addEventListener('change', function () {
        if (controle.value.trim()) campo.classList.remove('erro');
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault(); /* protótipo — sem backend */
      var ok = true;

      camposObrigatorios.forEach(function (campo) {
        var controle = campo.querySelector('input, select');
        var vazio = !controle.value.trim();
        campo.classList.toggle('erro', vazio);
        if (vazio) ok = false;
      });

      var autorizo = form.querySelector('.autorizo');
      var check = autorizo.querySelector('input[type="checkbox"]');
      autorizo.classList.toggle('erro', !check.checked);
      if (!check.checked) ok = false;

      var confirmacao = form.querySelector('.form-confirmacao');
      confirmacao.classList.toggle('visivel', ok);
      if (ok) {
        confirmacao.textContent = 'Tudo certo com o preenchimento! (Protótipo visual — o envio real será conectado na fase de desenvolvimento.)';
      } else {
        confirmacao.classList.remove('visivel');
        var primeiroErro = form.querySelector('.campo.erro, .autorizo.erro');
        if (primeiroErro) {
          var y = primeiroErro.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      }
    });
  }
})();
