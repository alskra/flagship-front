import Alpine from 'alpinejs';

Alpine.data('lineClamp', () => ({
  isClamped: true,
  hasClamp: false,
  init() {
    this.update();
  },
  update() {
    this.isClamped = true;
    this.$nextTick(() => {
      this.hasClamp = this.$refs.content.scrollHeight > this.$refs.content.clientHeight;
    });
  },
}));
