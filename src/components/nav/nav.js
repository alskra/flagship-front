import Alpine from 'alpinejs';
import './nav.scss';

Alpine.data('nav', () => ({
  init() {
    this.sections = document.querySelectorAll('.festival');
  },
  nav: {
    'x-show'() {
      return this.$store.minLg || this.navIsOpen;
    },
    'x-transition:enter': 'enter',
    'x-transition:enter-start': 'enter-start',
    'x-transition:leave': 'leave',
    'x-transition:leave-end': 'leave-end',
    '@click.outside'() {
      this.navIsOpen = false;
    },
    '@scroll.window.debounce.100ms'() {
      let target;

      for (let i = 0; i < this.sections.length; i += 1) {
        if (this.sections[i].getBoundingClientRect().top <= window.innerHeight / 2) {
          target = this.sections[i];
        } else {
          break;
        }
      }

      if (target) {
        window.history.replaceState(null, null, `#${target.id}`);
        this.$store.hash = `#${target.id}`;
      }
    },
    '@popstate.window'() {
      this.navIsOpen = false;
    },
  },
  navItem: {
    ':class'() {
      return { 'is-active': this.$el.hash === this.$store.hash };
    },
  },
}));
