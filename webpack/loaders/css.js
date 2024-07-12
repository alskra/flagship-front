module.exports = [
  {
    loader: 'css-loader',
    options: {
      url: {
        filter: (url) => !/^\//.test(url),
      },
      importLoaders: 3,
    },
  },
  'postcss-loader',
  'resolve-url-loader',
  {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        outputStyle: 'expanded',
      },
      sourceMap: true,
      additionalData: `@use "@css/global" as *;

$PRODUCTION: ${process.env.NODE_ENV === 'production'};
`,
    },
  },
];
