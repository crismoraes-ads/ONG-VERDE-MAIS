document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');

  if (hamburger && navUl) {
    const toggleMenu = () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      navUl.classList.toggle('active');
    };

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (e) => {
      if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleMenu();}
      else if(e.key==='Escape'){navUl.classList.remove('active');hamburger.setAttribute('aria-expanded','false');hamburger.focus();}
    });

    document.addEventListener('click', (ev) => {
      if (!navUl.contains(ev.target)&&!hamburger.contains(ev.target)) {navUl.classList.remove('active');hamburger.setAttribute('aria-expanded','false');}
    });
  }
});