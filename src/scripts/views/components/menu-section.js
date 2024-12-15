import FizziRestaurantSource from '../../data/fizziRestourant-source.js';
// import CONFIG from '../../globals/config.js';
import { createRestaurantItemTemplate } from '../template/template-creator.js';

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
      console.log('Fetching restaurants...');
      this.restaurants = await FizziRestaurantSource.listRestaurants();
      console.log(`Restaurants fetched: ${this.restaurants.length}`);
      if (this.restaurants.length === 0) {
        this.renderNoRestaurants();
      } else {
        this.renderMenuItems();
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
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
    
    menuList.innerHTML = '';

    this.restaurants.forEach((restaurant) => {
      const menuItem = document.createElement('div');
      menuItem.innerHTML = createRestaurantItemTemplate(restaurant);
      menuList.appendChild(menuItem.firstElementChild);
    });
  }

  renderNoRestaurants() {
    const menuList = this.querySelector('#menuList');
    menuList.innerHTML = `
      <div class="no-restaurants">
        <p>Tidak ada restoran yang tersedia saat ini.</p>
      </div>
    `;
  }

  renderLoading() {
    this.innerHTML = `
      <div class="loading">
        <p>Memuat menu restoran...</p>
      </div>
    `;
  }

  renderError(error) {
    const menuList = this.querySelector('#menuList');
    if (menuList) {
      menuList.innerHTML = `
        <div class="error-container">
          <h2>Error</h2>
          <p>${error.message || 'Gagal memuat restoran'}</p>
        </div>
      `;
    }
  }
}

customElements.define('menu-section', MenuSection);