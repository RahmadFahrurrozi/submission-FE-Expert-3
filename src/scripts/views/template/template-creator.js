import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
    <div class="restaurant-header">
        <img alt="${restaurant.name}"crossorigin="anonymous"
             data-src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}"
             class="restaurant-image lazyload"
             crossorigin="anonymous">
        <h2 class="restaurant-name">${restaurant.name}</h2>
    </div>
    <div class="restaurant-info">
        <div class="restaurant-meta">
            <span class="city">📍 ${restaurant.city}</span>
            <span class="rating">⭐ ${restaurant.rating}</span>
        </div>

        <div class="restaurant-description">
            <h3>Deskripsi</h3>
            <p>${restaurant.description}</p>
        </div>

        <div class="restaurant-address">
            <h3>Alamat</h3>
            <p>${restaurant.address}</p>
        </div>

        <div class="restaurant-categories">
            <h3>Kategori</h3>
            <p>${restaurant.categories
    .map((category) => category.name)
    .join(', ')}</p>
        </div>

        <div class="restaurant-menus">
            <div class="foods">
                <h3>Menu Makanan</h3>
                <ul>
                    ${restaurant.menus.foods
    .map((food) => `<li>${food.name}</li>`)
    .join('')}
                </ul>
            </div>

            <div class="drinks">
                <h3>Menu Minuman</h3>
                <ul>
                    ${restaurant.menus.drinks
    .map((drink) => `<li>${drink.name}</li>`)
    .join('')}
                </ul>
            </div>
        </div>

        <div class="restaurant-reviews">
            <h3>Ulasan Pelanggan</h3>
            ${restaurant.customerReviews
    .map((review) => createReviewTemplate(review))
    .join('')}
        </div>
    </div>
    <div id="likeButtonContainer"></div>
`;

const createReviewTemplate = (review) => `
    <div class="review">
        <h4>${review.name}</h4>
        <p>${review.review}</p>
        <small>${review.date}</small>
    </div>
`;

const createLikeButtonTemplate = () => `
    <button aria-label="like this restaurant" id="likeButton" class="like">
        <i class="far fa-heart" aria-hidden="true"></i>
    </button>
`;

const createUnlikeButtonTemplate = () => `
    <button aria-label="unlike this restaurant" id="likeButton" class="like">
        <i class="fas fa-heart" aria-hidden="true"></i>
    </button>
`;

const createLoadingTemplate = () => `
    <div class="loading">Memuat detail restoran...</div>
`;

const createErrorTemplate = (message) => `
    <div class="error-container">
        <h2>Error</h2>
        <p>Gagal memuat detail restoran: ${message}</p>
    </div>
`;
const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <img class="restaurant-item__header__poster lazyload" crossorigin="anonymous" data-src="${
  CONFIG.BASE_IMAGE_URL
}${restaurant.pictureId}" alt="${restaurant.name}">
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${
  restaurant.rating
}</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant__name"><a href="#/detail-menu/${restaurant.id}">${
  restaurant.name || '-'
}</a></h3>
      <p class="restaurant__city">📍 ${restaurant.city}</p>
      <p class="restaurant__description">${restaurant.description.slice(
    0,
    150
  )}...</p>
      <a class="cta-link" href="#/detail-menu/${restaurant.id}">
        <button class="cta-button">Lihat Detail</button>
      </a>
    </div>
  </div>
`;

export {
  createRestaurantDetailTemplate,
  createReviewTemplate,
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
  createLoadingTemplate,
  createErrorTemplate,
  createRestaurantItemTemplate,
};
