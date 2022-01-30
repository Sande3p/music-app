const configs = {
  PORT: process.env.PORT || 8080,
  API_VERSION: 'v1',
  ITUNES_URL: 'http://itunes.apple.com'
}

module.exports = {
  ...configs
}
