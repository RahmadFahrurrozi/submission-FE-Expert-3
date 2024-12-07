class GallerySection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section id="gallery" class="gallery-section">
        <h2 class="gallery-title">Culinary Moments</h2>
        <div class="gallery-container">
          <div class="gallery-slider">
            <img src="./images/gallery/galery5.jpg" alt="Elegant Dining Area" class="gallery-image" />
            <img src="./images/gallery/galery6.jpg" alt="Chef's Special Creation" class="gallery-image" />
            <img src="./images/gallery/galery7.jpg" alt="Cozy Outdoor Seating" class="gallery-image" />
            <img src="./images/gallery/galery8.jpg" alt="Exquisite Plating" class="gallery-image" />
            <img src="./images/gallery/galery9.jpg" alt="Vibrant Cocktail Bar" class="gallery-image" />
            <img src="./images/gallery/galery1.jpg" alt="Signature Dessert" class="gallery-image" />
          </div>
        </div>
        <div class="gallery-description">
          <p>Immerse yourself in the visual feast of Fizzy Bites. From our meticulously crafted dishes to our inviting ambiance, every image tells a story of culinary excellence and unforgettable experiences.</p>
        </div>
      </section>
    `;
  }
}

customElements.define('gallery-section', GallerySection);