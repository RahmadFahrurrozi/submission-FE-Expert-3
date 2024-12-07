const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splitedUrl = this._urlSplitter(url);
    return this._urlCombiner(splitedUrl);
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this._urlSplitter(url);
  },

  _urlSplitter(url) {
    const urlsSplits = url.split('/');
    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null,
    };
  },

  _urlCombiner(splitedUrl) {
    // Modifikasi di bagian ini untuk mendukung detail-menu
    if (splitedUrl.resource === 'detail-menu' && splitedUrl.id) {
      return '/detail-menu/:id';
    }

    return (splitedUrl.resource ? `/${splitedUrl.resource}` : '/');
  },
};

export default UrlParser;