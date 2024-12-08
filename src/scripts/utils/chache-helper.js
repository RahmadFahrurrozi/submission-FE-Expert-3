import CONFIG from '../globals/config';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await caches.open(CONFIG.CACHE_NAME);
    await cache.addAll(requests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    cacheNames
      .filter((name) => name !== CONFIG.CACHE_NAME)
      .forEach((filteredName) => caches.delete(filteredName)); // Ganti map dengan forEach
  },

  initializeWorkbox() {
    registerRoute(
      ({ url }) => url.href.startsWith(CONFIG.BASE_URL),
      new StaleWhileRevalidate({
        cacheName: 'dicoding-restaurant-api-cache',
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24, 
            maxEntries: 100,
          }),
        ],
      }),
    );

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
            maxAgeSeconds: 60 * 60 * 24 * 30, 
            maxEntries: 60,
          }),
        ],
      }),
    );

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
      this._fetchRequest(request);
      return response;
    }
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

      await this._addCache(request); 
      return response;
    } catch (error) {
      console.error('Fetch request failed:', error);
      throw new Error('Network request failed'); 
    }
  },

  async _addCache(request) {
    const cache = await this._openCache();
    cache.add(request); 
  },
};

export default CacheHelper;