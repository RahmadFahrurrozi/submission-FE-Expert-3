import API_ENDPOINT from '../globals/api-endpoint';
import CacheHelper from '../utils/chache-helper';

class FizziRestaurantSource {
  static async listRestaurants() {
    try {
      const response = await fetch(API_ENDPOINT.LIST);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      console.error('Error in listRestaurants:', error);
      // Ambil dari cache jika ada kesalahan
      return CacheHelper.revalidateCache(API_ENDPOINT.LIST);
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      console.error('Error in detailRestaurant:', error);
      // Ambil dari cache jika ada kesalahan
      return CacheHelper.revalidateCache(API_ENDPOINT.DETAIL(id));
    }
  }

  static async reviewRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.REVIEW(id));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseJson = await response.json();
      return responseJson.reviews;
    } catch (error) {
      console.error('Error in reviewRestaurant:', error);
      // Ambil dari cache jika ada kesalahan
      return CacheHelper.revalidateCache(API_ENDPOINT.REVIEW(id));
    }
  }

  static async postReview(review) {
    try {
      const response = await fetch(API_ENDPOINT.POST_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error('Error in postReview:', error);
      throw new Error('Gagal menambahkan review');
    }
  }

  static async favoriteRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.POST_FAVORITE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error('Error in favoriteRestaurant:', error);
      throw new Error('Gagal menambahkan restaurant ke favorite');
    }
  }

  static async unfavoriteRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DELETE_FAVORITE(id), {
        method: 'DELETE',
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error('Error in unfavoriteRestaurant:', error);
      throw new Error('Gagal menghapus restaurant dari favorite');
    }
  }
}

export default FizziRestaurantSource;