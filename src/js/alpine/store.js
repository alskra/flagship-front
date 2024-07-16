import Alpine from 'alpinejs';

Alpine.store('isDeviceDesktop', document.documentElement.classList.contains('is-device-desktop'));
Alpine.store('minLg', window.innerWidth >= 1025);
window.addEventListener('resize', () => Alpine.store('minLg', window.innerWidth >= 1025));

let scrollLast = window.scrollY;

const scrollDir = () => {
  const dir = window.scrollY - scrollLast > 0 ? 1 : -1;

  scrollLast = window.scrollY;

  return dir;
};

Alpine.store('scrollY', window.scrollY);
Alpine.store('scrollDir', scrollDir());
window.addEventListener('scroll', () => {
  Alpine.store('scrollY', window.scrollY);
  Alpine.store('scrollDir', scrollDir());
}, { passive: true });

Alpine.store('hash', window.location.hash);
window.addEventListener('hashchange', () => Alpine.store('hash', window.location.hash));
