import Alpine from 'alpinejs';
import '@components/table-data/table-data';
import '@components/timer/timer';
import './stage.scss';

Alpine.data('stageItem', () => ({
  isLoading: false,
  isStarted: false,
  isCompleted: false,
  fakeSendData(controlTime) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        setTimeout(() => {
          this.isCompleted = true;
        }, controlTime);
      }, 1000);
    });
  },
}));
