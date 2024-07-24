import Alpine from 'alpinejs';
import '@components/stage-item/stage-item';
import './stage.scss';

Alpine.data('stage', (isFilled = false) => ({
  isLoading: false,
  isFilled,
  btnLoad: {
    ':class'() {
      return { 'is-loading': this.isLoading };
    },
    ':disabled'() {
      return this.isLoading;
    },
  },
}));
