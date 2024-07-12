import Alpine from 'alpinejs';
import './app.scss';

Alpine.data('app', () => ({
  navIsOpen: false,
  toggleNav() {
    this.navIsOpen = !this.navIsOpen;
  },
  app: {},
}));

Alpine.start();
