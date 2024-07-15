module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeUnknownsAndDefaults: false,
          removeViewBox: false,
          cleanupIds: {
            prefix: {
              toString() {
                this.counter = (this.counter || 0) + 1;

                return `id-${this.counter}`;
              },
            },
          },
        },
      },
    },
    'removeDimensions',
  ],
};
