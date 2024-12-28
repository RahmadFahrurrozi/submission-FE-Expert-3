const assert = require('assert');

Feature('Unliking Restaurants');

Scenario('unliking a restaurant', async ({ I }) => {
  // Start from empty favorite restaurants
  I.amOnPage('/#/favorite');
  I.see('Belum ada restoran favorit', '.restaurant-item__not__found');
  
  // Go to home page and like a restaurant
  I.amOnPage('/');
  I.waitForElement('.restaurant-item', 10);
  I.seeElement('.restaurant-item');
  I.click(locate('.cta-button').first());
  
  // Wait for detail page to load and like the restaurant
  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  
  // Verify liked restaurant appears in favorites
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-item', 10);
  I.seeElement('.restaurant-item');
  
  // Store the restaurant name before unliking
  const restaurantName = await I.grabTextFrom('.restaurant__name a');
  
  // Unlike the restaurant
  I.click(locate('.cta-button').first());
  I.waitForElement('#likeButton', 10);
  I.click('#likeButton');
  
  // Verify removal from favorites
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-item__not__found', 10);
  I.see('Belum ada restoran favorit', '.restaurant-item__not__found');
  
  // Verify the restaurant name is no longer visible
  I.dontSeeElement('.restaurant__name a');
  I.dontSee(restaurantName);
});