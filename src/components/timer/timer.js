import Alpine from 'alpinejs';

Alpine.data('timer', (timeLeft = 0) => ({
  get formatTime() {
    return this.$store.formatTime(this.timeLeft, { timer: true });
  },
  init() {
    if (typeof this.timeLeft === 'undefined') {
      this.timeLeft = timeLeft;
    }

    this.$watch('$store.time', (val, oldValue) => {
      if (this.timeLeft - (val - oldValue) >= 0) {
        this.timeLeft -= val - oldValue;
      } else {
        this.timeLeft = 0;
      }
    });
  },
}));
