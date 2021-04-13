export default ({
  get: () => window.location.href.indexOf('PHP')>=0 ? 1 : 2,
});
