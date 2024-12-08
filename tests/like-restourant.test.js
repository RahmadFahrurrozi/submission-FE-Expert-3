import FavoriteRestaurantIdb from '../src/scripts/data/favorite-fizzirestourant-idb';
import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should show like button when the restaurant has not been liked before', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: { id: 1 },
    });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeDefined();
  });

  it('should not show unlike button when the restaurant has not been liked before', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: { id: 1 },
    });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeNull();
  });

  it('should be able to like the restaurant', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
        name: 'Test Restaurant',
        city: 'Test City',
        rating: 4.5,
        description: 'Test Description',
        pictureId: 'test-picture',
      },
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ 
      id: 1,
      name: 'Test Restaurant',
      city: 'Test City',
      rating: 4.5,
      description: 'Test Description',
      pictureId: 'test-picture',
    });
  });

  it('should not add a restaurant again when it is already liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: { id: 1 },
    });

    // Tambahkan restoran ke favorit terlebih dahulu
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    // Klik tombol like
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Pastikan hanya ada satu restoran di favorit
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);
  });

  it('should not add a restaurant when it has no id', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {},
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});