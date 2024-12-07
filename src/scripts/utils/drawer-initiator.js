const DrawerInitiator = {
  init({ button, drawer, content }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });
  },

  initMenu(hamburgerButton, navMenu) {
    document.addEventListener('DOMContentLoaded', () => {
      this._initializeMenu(hamburgerButton, navMenu);
    });
  },

  _initializeMenu(hamburgerButton, navMenu) {
    hamburgerButton.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburgerButton.classList.toggle('active');
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('active');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('active');
  },
};

export default DrawerInitiator;