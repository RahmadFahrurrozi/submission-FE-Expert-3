import FizziRestaurantSource from '../../data/fizziRestourant-source.js';
import CONFIG from '../../globals/config.js';


class MenuSection extends HTMLElement {
  constructor() {
    super();
    this.restaurants = [];
  }

  connectedCallback() {
    this.render();
    this.fetchAndRenderRestaurants();
  }

  async fetchAndRenderRestaurants() {
    try {
      this.restaurants = await FizziRestaurantSource.listRestaurants();
      this.renderMenuItems();
    } catch (error) {
      this.renderError(error);
    }
  }

  render() {
    this.innerHTML = `
      <section id="menu" class="menu">
        <h2>Fizzy Bites Menu</h2>
        <div id="menuList" class="menu-list"></div>
      </section>
    `;
  }

  renderMenuItems() {
    const menuList = this.querySelector('#menuList');
    this.restaurants.forEach((restaurant) => {
      const menuItem = document.createElement('div');
      const shortDescription = restaurant.description.length > 100
        ? `${restaurant.description.substring(0, 100)}...`
        : restaurant.description;
      menuItem.className = 'menu-item';
      menuItem.innerHTML = `
        <img src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}" 
             alt="${restaurant.name}"
             onerror="this.onerror=null;this.src='./images/default.jpg';">
        <div class="menu-item-content">
          <h3>${restaurant.name}</h3>
          <div class="meta">
            <span class="city">
              📍 ${restaurant.city}
            </span>
            <span class="rating">
              ⭐ ${restaurant.rating}
            </span>
          </div>
          <p class="description">${shortDescription}</p>
            <a class="cta-link" href="#/detail-menu/${restaurant.id}">
              <button class="cta-button">Lihat Detail</button>
            </a>
        </div>
      `;
      menuList.appendChild(menuItem);
    });
  }

  renderError(error) {
    this.innerHTML = `
      <div class="error-container">
        <h2>Error</h2>
        <p>${error.message}</p>
      </div>
    `;
  }
}

customElements.define('menu-section', MenuSection);