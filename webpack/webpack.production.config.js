const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const paths = require('./utils/paths');
const common = require('./webpack.config');
const cssLoaders = require('./loaders/css');
const svgoConfig = require('../svgo.config');

module.exports = merge(common, {
  output: {
    publicPath: '',
    filename: 'js/[name].[contenthash:8].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        resourceQuery: { not: [/module/] },
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          ...cssLoaders,
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[id].[contenthash:8].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: paths.public,
          to: '',
          globOptions: {
            ignore: [
              '**/.gitkeep',
              '**/.DS_Store',
              '**/ignore',
            ],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      // new ImageMinimizerPlugin({
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   minimizer: {
      //     implementation: ImageMinimizerPlugin.imageminMinify,
      //     options: {
      //       plugins: [
      //         ['gifsicle', { interlaced: true }],
      //         ['mozjpeg', { quality: 80, progressive: true }],
      //         ['optipng', { optimizationLevel: 3 }],
      //         ['svgo', svgoConfig],
      //       ],
      //     },
      //   },
      // }),
      new ImageMinimizerPlugin({
        test: /\.svg$/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [['svgo', svgoConfig]],
          },
        },
      }),
      new ImageMinimizerPlugin({
        generator: [
          {
            preset: 'webp',
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: [['webp', { quality: 75 }]],
            },
          },
        ],
      }),
      '...',
    ],
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  performance: {
    // hints: false,
    // maxAssetSize: 512000,
    // maxEntrypointSize: 512000,
  },
});
