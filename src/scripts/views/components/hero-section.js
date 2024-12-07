class heroSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <section class="hero">
            <div class="hero-content">
                <h1>Fizzy Bites</h1>
                <p>Discover a world of culinary delights at Fizzy Bites!</p>
                <p>From sizzling local favorites to international cuisines, we bring you the best restaurants in town.</p>
                <a href="#about">
                    <button class="explore-button">Explore Now</button>
                </a>
            </div>
      </section>
        `;
  }
}

customElements.define('hero-section', heroSection);