import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    if (!this._button || !this._drawer || !this._content) {
      console.error('One or more elements not found');
      return;
    }

    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content
    });
  }

  async renderPage() {
    try {
      const url = UrlParser.parseActiveUrlWithCombiner();
      const page = routes[url];

      if (!page) {
        console.error('Page not found for URL:', url);
        this._content.innerHTML = '<div class="error">Page not found</div>';
        return;
      }

      this._content.innerHTML = await page.render(window.location.hash.slice(1));

      if (typeof page.afterRender === 'function') {
        await page.afterRender(window.location.hash.slice(1));
      }

    } catch (error) {
      console.error('Error rendering page:', error);
      this._content.innerHTML = '<div class="error">Error loading page</div>';
    }
  }
}

export default App;