(() => {
  'use strict';

  const config = window.AURE_CONFIG || {};
  const email = (config.contactEmail || 'aureagencymkt@gmail.com').trim();
  const formEndpoint = (config.formEndpoint || '').trim();
  const number = (config.whatsappNumber || '').replace(/\D/g, '');
  // Evita disponibilizar URLs inválidas enquanto o contato comercial não for definido.
  const hasWhatsApp = number.length >= 12 && number.length <= 15;
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const contactForm = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const whatsappDirect = document.getElementById('contact-whatsapp');
  const emailLink = document.getElementById('email-link');
  const instagramLink = document.getElementById('instagram-link');
  if (emailLink) { emailLink.href = `mailto:${email}`; emailLink.firstChild.textContent = `${email} `; }
  if (instagramLink && config.instagramUrl) instagramLink.href = config.instagramUrl;
  const whatsappForm = document.getElementById('form-whatsapp');
  const contactSection = document.getElementById('contato');
  const fab = document.querySelector('.mobile-contact-fab');

  function setMenu(isOpen) {
    header.classList.toggle('menu-open', isOpen);
    menuToggle?.setAttribute('aria-expanded', String(isOpen));
    menuToggle?.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    if (mobileNav) mobileNav.inert = !isOpen;
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  menuToggle?.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')));
  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('menu-open')) {
      setMenu(false);
      menuToggle?.focus();
    }
  });
  document.addEventListener('click', event => {
    if (header.classList.contains('menu-open') && !header.contains(event.target)) setMenu(false);
  });

  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 36);
    if (contactSection && fab) {
      const rect = contactSection.getBoundingClientRect();
      fab.classList.toggle('is-near-contact', rect.top < window.innerHeight * .75 && rect.bottom > 0);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const revealTargets = [...document.querySelectorAll('[data-reveal]')];
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-ready');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .1, rootMargin: '0px 0px -35px 0px' });
    revealTargets.forEach(el => revealObserver.observe(el));
  }
  document.getElementById('copyright-year').textContent = String(new Date().getFullYear());

  document.querySelectorAll('[data-plan]').forEach(link => {
    link.addEventListener('click', () => {
      const select = document.getElementById('contact-service');
      if (select) select.value = link.getAttribute('data-plan');
    });
  });

  function getFormData() {
    const fd = new FormData(contactForm);
    return {
      nome: String(fd.get('nome') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      telefone: String(fd.get('telefone') || '').trim(),
      perfil: String(fd.get('perfil') || '').trim(),
      servico: String(fd.get('servico') || 'Ainda não sei').trim(),
      mensagem: String(fd.get('mensagem') || '').trim()
    };
  }

  function buildMessage() {
    const d = getFormData();
    return [
      'Olá, Aure Agency! Gostaria de conversar sobre um projeto.',
      '',
      `Nome: ${d.nome}`,
      `E-mail: ${d.email}`,
      `WhatsApp: ${d.telefone || 'Não informado'}`,
      `Perfil: ${d.perfil}`,
      `Interesse: ${d.servico}`,
      '',
      'Sobre o projeto:',
      d.mensagem
    ].join('\n');
  }

  function showFeedback(message, isError = false) {
    feedback.textContent = message;
    feedback.classList.add('is-visible');
    feedback.classList.toggle('is-error', isError);
  }

  function validateForm() {
    let firstInvalid = null;
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
      const isValid = field.checkValidity();
      if (field.matches('[required]') && !isValid && !firstInvalid) firstInvalid = field;
      if (field.matches('input:not([type="checkbox"]), textarea, select')) field.setAttribute('aria-invalid', String(!isValid));
    });
    if (firstInvalid) {
      showFeedback('Confira os campos obrigatórios, o e-mail informado e o consentimento antes de continuar.', true);
      firstInvalid.focus();
      return false;
    }
    return true;
  }

  contactForm?.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
      if (field.matches('input:not([type="checkbox"]), textarea, select')) field.removeAttribute('aria-invalid');
      if (feedback.classList.contains('is-error')) feedback.classList.remove('is-visible', 'is-error');
    });
  });

  if (formEndpoint) {
    const submitButton = contactForm?.querySelector('[type="submit"]');
    const formNote = contactForm?.querySelector('.form-note');
    if (submitButton) submitButton.firstChild.textContent = 'Enviar solicitação '; 
    if (formNote) formNote.textContent = 'Seus dados serão enviados pelo serviço de formulários configurado pela agência. Consulte o aviso de privacidade.';
  }

  contactForm?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!validateForm()) return;
    const subject = `Proposta comercial Aure Agency — ${getFormData().servico}`;
    if (!formEndpoint) {
      const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage())}`;
      showFeedback('A mensagem está pronta. Seu aplicativo de e-mail será aberto; confirme o envio por lá. Se ele não abrir, escreva para ' + email + '.');
      window.location.href = mailto;
      return;
    }
    const submitButton = contactForm.querySelector('[type="submit"]');
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    try {
      const data = getFormData();
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _subject: subject })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) throw new Error('Falha no serviço de envio');
      showFeedback('Solicitação enviada! Obrigado pelo contato. A agência responderá pelo canal informado.');
      contactForm.reset();
      contactForm.querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));
    } catch (error) {
      showFeedback('Não foi possível concluir o envio. Você pode entrar em contato pelo e-mail ' + email + '.', true);
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
    }
  });

  if (hasWhatsApp) {
    whatsappDirect.href = `https://wa.me/${number}?text=${encodeURIComponent('Olá, Aure Agency! Gostaria de conhecer as soluções da agência.')}`;
    whatsappDirect.classList.remove('is-hidden');
    whatsappForm.classList.remove('is-hidden');
    whatsappForm.addEventListener('click', () => {
      if (!validateForm()) return;
      const url = `https://wa.me/${number}?text=${encodeURIComponent(buildMessage())}`;
      showFeedback('O WhatsApp será aberto com a mensagem preenchida. Confirme o envio no aplicativo.');
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

})();
