
const axios = require('axios')
const joi = require('@hapi/joi')
const config = require('config')

/**
 * gets search result
 */
const get = async (id, params, query = {}) => {
  const reqConfig = {
    method: 'get',
    headers: {
      Accept: 'application/json'
    }
  }

  reqConfig.url = config.ITUNES_URL + '/search?term=' + params.artist + '&entity=album'

  /**
 * returns unique elements of an array of objects
 */
  const uniqueBy = (uniqueKey, objects) => {
    const ids = objects.map(object => object[uniqueKey])
    return objects.filter((object, index) => !ids.includes(object[uniqueKey], index + 1))
  }

  const result = axios(reqConfig)
    .then(res => {
      if (res.data.results) {
        res.data.results = uniqueBy('collectionName', res.data.results)
        res.data.resultCount = res.data.results.length
      }
      return JSON.stringify(res.data)
    })
    .catch(error => {
      return {
        status: 'e',
        message: 'error',
        error: JSON.stringify(error)
      }
    })

  return result
}
get.schema = {
  id: joi.string(),
  params: joi.object()
}

module.exports = {
  get
}
