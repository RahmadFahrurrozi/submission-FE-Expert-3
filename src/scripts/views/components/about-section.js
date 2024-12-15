class AboutSection extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <section id="about" class="about">
            <h2>About Us</h2>
            <div class="about-content">
                <div class="about-images-left">
                    <img src="./images/gallery/galery1.jpg" data-src="./images/gallery/galery1.jpg" alt="Fizzy Bites Galery 1" class="lazyload" />
                    <img src="./images/gallery/galery8.jpg" data-src="./images/gallery/galery8.jpg" alt="Fizzy Bites Galery 2" class="lazyload" />
                    <img src="./images/gallery/galery3.jpg" data-src="./images/gallery/galery3.jpg" alt="Fizzy Bites Galery 3" class="lazyload" />
                    <img src="./images/gallery/galery4.jpg" data-src="./images/gallery/galery4.jpg" alt="Fizzy Bites Galery 4" class="lazyload" />
                </div>
                <div class="about-text">
                    <p>Fizzy Bites is a vibrant and innovative restaurant that serves a wide variety of delicious food, expertly combining traditional flavors with modern culinary techniques. Our diverse menu caters to all tastes, featuring everything from comforting local dishes to exciting international cuisines. At Fizzy Bites, we pride ourselves on using only the freshest, high-quality ingredients to create memorable dining experiences for our guests. Our talented chefs are constantly pushing the boundaries of flavor, presenting familiar favorites with unique twists that surprise and delight our patrons. Whether you're looking for a quick bite or a leisurely meal, Fizzy Bites offers a warm, welcoming atmosphere where food lovers can explore new tastes and rediscover classic dishes reimagined.</p>
                    <p>Our passion for great taste and quality ingredients shines through in every dish we serve.</p>
                    <a href="#menu">
                        <button class="explore-button">Explore Now</button>
                    </a>
                </div>
            </div>
        </section>
    `;
  }
}

customElements.define('about-section', AboutSection);
