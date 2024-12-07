import FavoriteRestaurantIdb from '../data/favorite-fizzirestourant-idb';
import { createLikeButtonTemplate, createUnlikeButtonTemplate } from '../views/template/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    try {
      const { id } = this._restaurant;
      const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);

      if (restaurant) {
        this._renderUnlike();
      } else {
        this._renderLike();
      }
    } catch (error) {
      console.error('Error rendering button:', error);
    }
  },

  async _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  async _renderUnlike() {
    this._likeButtonContainer.innerHTML = createUnlikeButtonTemplate();

    const unlikeButton = document.querySelector('#likeButton');
    unlikeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;