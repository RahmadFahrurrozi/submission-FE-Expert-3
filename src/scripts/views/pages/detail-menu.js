// pages/detail.js
import FizziRestourantSource from '../../data/fizziRestourant-source.js';
import UrlParser from '../../routes/url-parser.js';
import LikeButtonInitiator from '../../utils/like-button-initiator.js';
import {
  createRestaurantDetailTemplate,
  createLoadingTemplate,
  createErrorTemplate,
} from '../template/template-creator.js';

const DetailMenu = {
  async render() {
    return `
            <section id="detail" class="detail" tabindex="0">
                <div id="restaurant-detail-container" class="detail-content">
                    ${createLoadingTemplate()}
                </div>
            </section>
        `;
  },

  async afterRender() {
    const { id } = UrlParser.parseActiveUrlWithoutCombiner();
    const detailContainer = document.getElementById('restaurant-detail-container');

    try {
      const restaurant = await FizziRestourantSource.detailRestaurant(id);
      detailContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
          city: restaurant.city,
          rating: restaurant.rating,
        },
      });
    } catch (error) {
      detailContainer.innerHTML = createErrorTemplate(error.message);
    }
  }
};

export default DetailMenu;