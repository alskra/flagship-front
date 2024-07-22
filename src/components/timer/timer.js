import Alpine from 'alpinejs';

Alpine.data('timer', (endTime = 0) => ({
  endTime,
  controlTime: 0,
  get time() {
    const d = this.endTime - this.$store.time;

    return d > 0 ? d : 0;
  },
  get formatTime() {
    return this.$store.formatTime(this.time, { timer: true });
  },
  start() {
    this.endTime = this.$store.time + this.controlTime;
  },
  btnStart: {
    '@click'() {
      this.start();
    },
  },
  init() {
    // eslint-disable-next-line no-console
    // console.log(this.endTime);
  },
}));
