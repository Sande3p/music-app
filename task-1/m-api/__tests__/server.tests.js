const app = require('../app')
const supertest = require('supertest')

test('GET /v1/album taylor swift', async () => {
  await supertest(app).get('/v1/album?artist=taylor%20swift')
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      const resData = JSON.parse(response.text)

      // Check type and length
      expect(Array.isArray(resData.results)).toBeTruthy()
      expect(resData.results.length).toBeGreaterThan(-1)

      // Check data
      expect(resData.results[0].collectionType).toEqual('Album')
      expect(resData.results[0].artistName.toLowerCase()).toEqual('taylor swift')
      expect(resData.results[0].artworkUrl100.toLowerCase()).toContain('http')
    })
})

test('GET /v1/album lady gaga', async () => {
  await supertest(app).get('/v1/album?artist=lady%20gaga')
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      const resData = JSON.parse(response.text)

      // Check type and length
      expect(Array.isArray(resData.results)).toBeTruthy()
      expect(resData.results.length).toBeGreaterThan(-1)

      // Check data
      expect(resData.results[0].collectionType).toEqual('Album')
      expect(resData.results[0].artistName.toLowerCase()).toEqual('lady gaga')
      expect(resData.results[0].artworkUrl100.toLowerCase()).toContain('http')
    })
})

test('GET /v1/invalidRoute', async () => {
  await supertest(app).get('/v1/invalidRoute')
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
      const resData = response.body

      // Check status & message
      expect(resData.status).toEqual(404)
      expect(resData.message).toEqual('Route not found')
    })
})
