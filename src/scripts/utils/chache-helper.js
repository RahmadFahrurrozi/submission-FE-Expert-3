// src/scripts/utils/cache-helper.js
import CONFIG from '../globals/config';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

const CacheHelper = {
  async cachingAppShell(requests) {
    // Prekonfigurasi cache untuk app shell
    const cache = await caches.open(CONFIG.CACHE_NAME);
    await cache.addAll(requests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    cacheNames
      .filter((name) => name !== CONFIG.CACHE_NAME)
      .forEach((filteredName) => caches.delete(filteredName)); // Ganti map dengan forEach
  },

  // Setup workbox routing untuk API
  initializeWorkbox() {
    // Cache API restaurant list
    registerRoute(
      ({ url }) => url.href.startsWith(CONFIG.BASE_URL),
      new StaleWhileRevalidate({
        cacheName: 'dicoding-restaurant-api-cache',
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24, // 24 jam
            maxEntries: 100,
          }),
        ],
      }),
    );

    // Cache gambar restaurant
    registerRoute(
      ({ request, url }) =>
        request.destination === 'image' ||
        url.href.startsWith(CONFIG.BASE_IMAGE_URL),
      new CacheFirst({
        cacheName: 'dicoding-restaurant-images',
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 hari
            maxEntries: 60,
          }),
        ],
      }),
    );

    // Cache static assets (CSS, JS, dll)
    registerRoute(
      ({ request }) =>
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'font',
      new StaleWhileRevalidate({
        cacheName: 'dicoding-restaurant-static',
      }),
    );
  },

  async revalidateCache(request) {
    const response = await caches.match(request);

    if (response) {
      // Jika ada response dalam cache, ambil data terbaru
      this._fetchRequest(request);
      return response;
    }
    // Jika tidak ada dalam cache, lakukan fetch request
    return this._fetchRequest(request);
  },

  async _openCache() {
    return caches.open(CONFIG.CACHE_NAME);
  },

  async _fetchRequest(request) {
    try {
      const response = await fetch(request);

      if (!response || response.status !== 200) {
        return response;
      }

      await this._addCache(request); // Tambahkan ke cache jika berhasil
      return response;
    } catch (error) {
      console.error('Fetch request failed:', error);
      throw new Error('Network request failed'); // Tangani kesalahan jaringan
    }
  },

  async _addCache(request) {
    const cache = await this._openCache();
    cache.add(request); // Tambahkan request ke cache
  },
};

export default CacheHelper;