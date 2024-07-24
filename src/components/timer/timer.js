import Alpine from 'alpinejs';

Alpine.data('timer', () => ({
  get formatTime() {
    return this.$store.formatTime(this.timeLeft, { timer: true });
  },
  init() {
    this.$root.alpine = this;

    this.$watch('$store.time', (val, oldValue) => {
      if (this.timeLeft - (val - oldValue) >= 0) {
        this.timeLeft -= val - oldValue;
      } else {
        this.timeLeft = 0;
      }
    });
  },
}));
