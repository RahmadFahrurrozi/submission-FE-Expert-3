import FavoriteRestaurantIdb from '../../data/favorite-fizzirestourant-idb';
import { createRestaurantItemTemplate } from '../../views/template/template-creator';

const Favorite = {
  async render() {
    return `
      <section class="content">
        <h2 class="content__heading">Restoran Favorit Anda</h2>
        <div id="restaurants" class="restaurants">
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants');

    if (restaurants.length === 0) {
      restaurantsContainer.innerHTML = `
        <div class="restaurant-item__not__found">
          <img src="./images/heros/not-found-favorite.jpg" alt="Kosong">
            Belum ada restoran favorit
        </div>
      `;
    }

    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Favorite;