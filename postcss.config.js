module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        stage: 0,
        features: {
          'all-property': false,
          'custom-properties': false,
          'blank-pseudo-class': false,
          'has-pseudo-class': false,
        },
      },
    ],
    'css-blank-pseudo',
    'css-has-pseudo',
    'postcss-sort-media-queries',
  ],
};
