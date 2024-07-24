import Alpine from 'alpinejs';
import '@components/timer/timer';
import '@components/table-data/table-data';
import './stage-item.scss';

Alpine.data('stageItem', ({ isStarted = false, timeLeft = 0 } = {}) => ({
  isStarted,
  timeLeft,
  controlTime: 0,
  isLoading: false,
  get isCompleted() {
    return this.isStarted && this.timeLeft === 0;
  },
  start() {
    this.isStarted = true;
    this.timeLeft = this.controlTime;
  },
  beforeSendData() {
    this.isLoading = true;
  },
  fakeSendData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  },
  afterSendData() {
    this.isLoading = false;
    this.start();
  },
  stageItem: {
    ':class'() {
      return { 'is-started': this.isStarted };
    },
  },
  btnStart: {
    ':class'() {
      return { 'is-loading': this.isLoading };
    },
    ':disabled'() {
      return this.isLoading;
    },
  },
}));
