(function () {
  var FADE_MS = 220;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('click', function (e) {
    if (reduceMotion) return;
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var link = e.target.closest('a[href]');
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

    var url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (err) {
      return;
    }
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && url.hash) return;

    e.preventDefault();
    document.body.classList.add('is-leaving');
    window.setTimeout(function () {
      window.location.href = link.href;
    }, FADE_MS);
  });

  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      document.body.classList.remove('is-leaving');
    }
  });
})();
