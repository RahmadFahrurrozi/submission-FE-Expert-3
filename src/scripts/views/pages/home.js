import '../components/hero-section.js';
import '../components/galerry-section.js';
import '../components/about-section.js';
import '../components/menu-section.js';

const Home = {
  render() {
    return `
      <hero-section></hero-section>
      <about-section></about-section>
      <menu-section></menu-section> 
      <gallery-section></gallery-section>
    `;
  },
};

export default Home;