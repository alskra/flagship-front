import Alpine from 'alpinejs';
import './app.scss';

Alpine.data('app', () => ({
  menuIsOpen: false,
  toggleMenu() {
    this.menuIsOpen = !this.menuIsOpen;
  },
  app: {},
  appMain: {
    ':class'() {
      return {
        'is-menu-open': this.menuIsOpen,
      };
    },
  },
  init() {
    this.$root.alpine = this;
  },
}));

Alpine.start();
