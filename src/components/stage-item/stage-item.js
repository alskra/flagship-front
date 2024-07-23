import Alpine from 'alpinejs';
import '@components/timer/timer';
import '@components/table-data/table-data';
import './stage-item.scss';

Alpine.data('stageItem', () => ({
  endDate: 0,
  isLoading: false,
  isStarted: false,
  isCompleted: false,
  fakeSendData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
}));
