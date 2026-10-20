(() => {
  const modal = document.getElementById('inquiryModal');
  const form = document.getElementById('inquiryForm');
  const templateSelect = document.getElementById('templateSelect');
  const success = document.getElementById('formSuccess');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const emailAddress = 'elevatetechsolution.co@gmail.com';

  document.getElementById('year').textContent = new Date().getFullYear();

  function openModal(template = '') {
    if (!modal) return;
    if (template) {
      const options = Array.from(templateSelect.options);
      const match = options.find(option => option.value === template || option.text === template);
      templateSelect.value = match ? match.value : 'Custom design';
    } else {
      templateSelect.value = 'Not selected';
    }
    success.hidden = true;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    setTimeout(() => modal.querySelector('input[name="name"]').focus(), 80);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('[data-open-inquiry]').forEach(button => button.addEventListener('click', () => openModal()));
  document.querySelectorAll('[data-template-inquiry]').forEach(button => button.addEventListener('click', () => openModal(button.dataset.templateInquiry)));
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal?.classList.contains('open')) closeModal(); });

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

  const filters = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.template-card');
  const visibleCount = document.getElementById('visibleCount');
  filters.forEach(filter => filter.addEventListener('click', () => {
    filters.forEach(item => item.classList.toggle('active', item === filter));
    const category = filter.dataset.filter;
    let count = 0;
    cards.forEach(card => {
      const visible = category === 'all' || card.dataset.category === category;
      card.hidden = !visible;
      if (visible) count++;
    });
    if (visibleCount) visibleCount.textContent = count;
  }));

  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const email = String(data.get('email') || '').trim();
    const type = data.get('type') || 'Not specified';
    const template = data.get('template') || 'Not selected';
    const details = String(data.get('details') || '').trim() || 'Not provided';
    const subject = `Website Development Inquiry — ${name}${template && template !== 'Not selected' ? ` — ${template}` : ''}`;
    const body = [
      'Hello ElevateTech Solution Team,', '',
      'I would like to inquire about your website development services.', '',
      `Name: ${name}`, `Phone / WhatsApp: ${phone}`, `Email: ${email}`,
      `Website type: ${type}`, `Selected template: ${template}`, '',
      'Project requirements:', details, '',
      'Please contact me to discuss the requirements, timeline, and quotation.', '', 'Thank you.'
    ].join('\n');
    if (success) success.hidden = false;
    window.location.href = `mailto:elevatetechsolution.co@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  // Subtle pointer tilt on cards; disabled for touch and reduced-motion users.
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canHover && !reduceMotion) {
    document.querySelectorAll('.service-card, .template-card').forEach(card => {
      card.addEventListener('mousemove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        if (card.classList.contains('service-card')) card.style.transform = `translateY(-5px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }
})();