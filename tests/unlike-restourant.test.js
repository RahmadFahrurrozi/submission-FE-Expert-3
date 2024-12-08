import FavoriteRestaurantIdb from '../src/scripts/data/favorite-fizzirestourant-idb';
import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';

describe('Unliking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({ 
      id: 1,
      name: 'Test Restaurant',
      city: 'Test City',
      rating: 4.5,
      description: 'Test Description',
      pictureId: 'test-picture',
    });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should show unlike button when the restaurant has been liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
  });

  it('should not show like button when the restaurant has been liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
  });

  it('should be able to unlike the restaurant', async () => {
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

    const restaurant = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurant).toEqual([]);
  });
});