import Alpine from 'alpinejs';

Alpine.data('timer', (endTime = Date.now()) => ({
  endTime,
  get time() {
    const d = Math.floor(this.endTime / 1000) - this.$store.time;

    return d > 0 ? d : 0;
  },
  get formatTime() {
    return this.$store.formatTime(this.time);
  },
  init() {
    // eslint-disable-next-line no-console
    console.log(this.endTime);
  },
}));
