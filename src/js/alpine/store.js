import Alpine from 'alpinejs';

Alpine.store('isDeviceDesktop', document.documentElement.classList.contains('is-device-desktop'));
Alpine.store('minLg', window.innerWidth >= 1025);
window.addEventListener('resize', () => Alpine.store('minLg', window.innerWidth >= 1025));

let { scrollY } = window;

Alpine.store('scrollDir', -1);
Alpine.store('scrollY', scrollY);
window.addEventListener('scroll', () => {
  Alpine.store('scrollDir', window.scrollY - scrollY > 0 ? 1 : -1);
  Alpine.store('scrollY', scrollY = window.scrollY);
}, { passive: true });

Alpine.store('hash', window.location.hash);
window.addEventListener('hashchange', () => Alpine.store('hash', window.location.hash));
