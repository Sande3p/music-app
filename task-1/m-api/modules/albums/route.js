/**
 * the albums routes
 */

const Controller = require('./controller')

module.exports = {
  '/album': {
    get: {
      method: Controller.get
    }
  }
}
