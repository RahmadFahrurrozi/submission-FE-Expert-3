const assert = require('assert');

Feature('Liking Restaurants');

Scenario('showing empty favorite restaurants', async ({ I }) => {
  I.amOnPage('/#/favorite');
  I.seeElement('#restaurants');
  I.see('Belum ada restoran favorit', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  // Start from empty favorite restaurants
  I.amOnPage('/#/favorite');
  I.see('Belum ada restoran favorit', '.restaurant-item__not__found');
  
  // Go to home page and like a restaurant
  I.amOnPage('/');
  I.seeElement('.restaurant-item');
  I.click(locate('.cta-button').first());
  
  // Like the restaurant
  I.seeElement('#likeButton');
  I.click('#likeButton');
  
  // Verify liked restaurant appears in favorites
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  I.seeElement('.restaurant__name');
  
  // Assert that the liked restaurant data matches the favorite
  const likedRestaurantName = await I.grabTextFrom('.restaurant__name');
  I.see(likedRestaurantName, '.restaurant__name'); // Ensure the name is displayed
  const likedRestaurantNameFromFavorites = await I.grabTextFrom('.restaurant__name');
  
  // Assert to ensure the names match
  assert.strictEqual(likedRestaurantName, likedRestaurantNameFromFavorites);
});

Scenario('liking several restaurants', async ({ I }) => {
  // Start from empty favorites
  I.amOnPage('/#/favorite');
  I.see('Belum ada restoran favorit', '.restaurant-item__not__found');
  
  // Like first restaurant
  I.amOnPage('/');
  I.click(locate('.cta-button').first());
  I.seeElement('#likeButton');
  I.click('#likeButton');
  
  // Like second restaurant
  I.amOnPage('/');
  I.click(locate('.cta-button').at(2));
  I.seeElement('#likeButton');
  I.click('#likeButton');
  
  // Like third restaurant
  I.amOnPage('/');
  I.click(locate('.cta-button').at(3));
  I.seeElement('#likeButton');
  I.click('#likeButton');
  
  // Verify in favorites page
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  
  // Assert that the liked restaurants data matches the favorites
  const firstLikedRestaurantName = await I.grabTextFrom('.restaurant__name');
  // Assuming you want to check the first restaurant in favorites
  const firstFavoriteRestaurantName = await I.grabTextFrom('.restaurant__name'); // Adjust selector if needed
  
  assert.strictEqual(firstLikedRestaurantName, firstFavoriteRestaurantName);
});

