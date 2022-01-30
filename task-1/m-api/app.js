const express = require('express')
const cors = require('cors')
const config = require('config')
const _ = require('lodash')

const http = require('http')
const routes = require('./route')
const bodyParser = require('body-parser')

const app = express()

const httpServer = http.Server(app)
app.set('port', config.PORT)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
const apiRouter = express.Router({})

// load all routes
_.each(routes, (verbs, url) => {
  _.each(verbs, (def, verb) => {
    if (!def.method) {
      throw new Error(`${verb.toUpperCase()} ${url} method is undefined`)
    }

    const actions = []

    // main middleware
    actions.push(async (req, res, next) => {
      try {
        await def.method(req, res, next)
      } catch (e) {
        next(e)
      }
    })

    console.log(`Endpoint discovered : ${verb.toLocaleUpperCase()} /${config.API_VERSION}${url}`)
    apiRouter[verb](`/${config.API_VERSION}${url}`, actions)
  })
})
app.use('/', apiRouter)

// Invlid route middleware
app.use((req, res) => {
  res.json({
    status: 404,
    message: 'Route not found'
  })
});

(async () => {
  httpServer.listen(app.get('port'), () => {
    console.log(`Express server listening on port ${app.get('port')}`)
  })
})()

module.exports = app
