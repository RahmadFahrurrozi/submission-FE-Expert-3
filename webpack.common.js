const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Membersihkan folder dist sebelum build
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: 'sw.bundle.js', // Nama file service worker
      clientsClaim: true, // Mengklaim kontrol pada halaman yang sudah terbuka
      skipWaiting: true, // Menghindari menunggu service worker baru aktif
      runtimeCaching: [
        {
          // Cache API Dicoding Restaurant
          urlPattern: new RegExp('^https://restaurant-api\\.dicoding\\.dev'),
          handler: 'StaleWhileRevalidate', // Menggunakan cache jika ada, tetapi tetap mengambil data terbaru
          options: {
            cacheName: 'dicoding-restaurant-api-cache',
            expiration: {
              maxEntries: 100, // Maksimal 100 entri di cache
              maxAgeSeconds: 60 * 60 * 24 // Cache berlaku selama 24 jam
            },
          },
        },
        {
          // Cache gambar
          urlPattern: new RegExp('^https://restaurant-api\\.dicoding\\.dev/images/'),
          handler: 'CacheFirst', // Menggunakan cache terlebih dahulu sebelum mengakses jaringan
          options: {
            cacheName: 'dicoding-restaurant-images',
            expiration: {
              maxEntries: 60, // Maksimal 60 gambar di cache
              maxAgeSeconds: 60 * 60 * 24 * 30 // Cache berlaku selama 30 hari
            },
          },
        },
        {
          // Cache font dan static assets
          urlPattern: /\.(?:js|css|woff2?|eot|ttf|otf)$/,
          handler: 'StaleWhileRevalidate', // Menggunakan cache jika ada, tetapi tetap mengambil data terbaru
          options: {
            cacheName: 'static-resources',
          },
        },
      ],
    }),
  ],
};