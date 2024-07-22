import Alpine from 'alpinejs';
import '@components/table-data/table-data';
import '@components/timer/timer';
import './stage.scss';

Alpine.data('stageItem', () => ({
  loading: false,
  fakeSendData() {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  },
}));
