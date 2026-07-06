/*=============== SHOW & CLOSE MENU ===============*/
const navMenu   = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose  = document.getElementById('nav-close');

if (navToggle) navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
if (navClose)  navClose.addEventListener('click',  () => navMenu.classList.remove('show-menu'));

/*=============== REMOVE MOBILE MENU ON LINK CLICK ===============*/
document.querySelectorAll('.nav__link, .nav__contact').forEach(link =>
  link.addEventListener('click', () => navMenu.classList.remove('show-menu'))
);

/*=============== CHANGE HEADER STYLE ON SCROLL ===============*/
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scroll-header', window.scrollY >= 80);
});

/*=============== TYPED JS ===============*/
if (document.getElementById('typed-text')) {
  new Typed('#typed-text', {
    strings: ['Java Developer', 'Frontend Developer', 'Web Developer', 'Problem Solver'],
    typeSpeed: 70,
    backSpeed: 45,
    backDelay: 1800,
    loop: true,
  });
}

/*=============== ACTIVE NAV LINK ON SCROLL ===============*/
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

const activateLink = () => {
  const scrollY = window.scrollY;
  sections.forEach(sec => {
    const sectionTop    = sec.offsetTop - 120;
    const sectionHeight = sec.offsetHeight;
    const sectionId     = sec.getAttribute('id');
    const link          = document.querySelector(`.nav__link[href="#${sectionId}"]`);
    if (link) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    }
  });
};
window.addEventListener('scroll', activateLink);

/*=============== PROJECT FILTER ===============*/
const filterBtns = document.querySelectorAll('.work__filter');
const workCards  = document.querySelectorAll('.work__card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active-filter'));
    btn.classList.add('active-filter');

    const filter = btn.getAttribute('data-filter');
    workCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/*=============== SKILL BARS ANIMATE ON SCROLL ===============*/
const skillFills = document.querySelectorAll('.skills__fill');

const animateSkills = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.style.width; // trigger reflow
      observer.unobserve(fill);
    }
  });
};

const skillObserver = new IntersectionObserver(animateSkills, { threshold: 0.3 });
skillFills.forEach(fill => {
  const targetWidth = fill.style.width;
  fill.style.width = '0';
  fill.dataset.target = targetWidth;
  skillObserver.observe(fill);
});

// Trigger width on intersection
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skills__fill');
      fills.forEach(f => {
        f.style.width = f.dataset.target || f.style.width;
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skills__group').forEach(g => skillBarObserver.observe(g));

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form');
const formStatus  = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = contactForm.querySelector('#contact-name').value.trim();
    const email   = contactForm.querySelector('#contact-email').value.trim();
    const message = contactForm.querySelector('#contact-message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in all required fields.';
      formStatus.className = 'contact__form-status error';
      return;
    }

    // Compose mailto link as fallback
    const subject  = contactForm.querySelector('#contact-subject').value.trim() || 'Portfolio Contact';
    const body     = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoUrl = `mailto:amruth142155@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    formStatus.textContent = '✓ Opening your email client...';
    formStatus.className = 'contact__form-status success';
    setTimeout(() => { formStatus.textContent = ''; }, 4000);
  });
}

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = document.getElementById('scroll-up');
window.addEventListener('scroll', () => {
  scrollUp.classList.toggle('show-scroll', window.scrollY >= 400);
});

/*=============== FOOTER YEAR ===============*/
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/*=============== CUSTOM CURSOR ===============*/
const cursorBig   = document.querySelector('.cursor__ball--big');
const cursorSmall = document.querySelector('.cursor__ball--small');

if (cursorBig && cursorSmall && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursorBig.style.transform   = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    cursorSmall.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
  });

  document.querySelectorAll('a, button, .work__card, .about__card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorBig.style.transform += ' scale(1.6)');
    el.addEventListener('mouseleave', () => {});
  });
}

/*=============== SCROLL REVEAL ANIMATIONS ===============*/
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    origin: 'bottom',
    distance: '40px',
    duration: 900,
    delay: 100,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    reset: false,
  });

  sr.reveal('.home__data',        { origin: 'left',   delay: 200 });
  sr.reveal('.home__image',       { origin: 'right',  delay: 400 });
  sr.reveal('.about__data',       { origin: 'left',   delay: 200 });
  sr.reveal('.about__cards',      { origin: 'right',  delay: 300 });
  sr.reveal('.work__card',        { interval: 120 });
  sr.reveal('.skills__group',     { interval: 150 });
  sr.reveal('.education__item',   { interval: 200 });
  sr.reveal('.contact__info',     { origin: 'left',   delay: 200 });
  sr.reveal('.contact__form',     { origin: 'right',  delay: 300 });
  sr.reveal('.section__title',    { delay: 100 });
}

/*=============== FADE IN KEYFRAME (used for filter) ===============*/
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
