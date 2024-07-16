import Alpine from 'alpinejs';
import './header.scss';

Alpine.data('header', () => ({
  get navIsHidden() {
    return this.$store.scrollDir > 0;
  },
  btnMenu: {
    '@click'() {
      this.toggleMenu();
    },
  },
  nav: {
    ':class'() {
      return {
        'is-hidden': this.navIsHidden,
      };
    },
  },
}));
