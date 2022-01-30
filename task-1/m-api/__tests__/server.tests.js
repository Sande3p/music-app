const app = require('../app')
const supertest = require('supertest')

const testAlbum = async (artist) => {
  test('GET /v1/album ' + artist, async () => {
    const artistParam = artist.replace(/ /g, '%20');
    await supertest(app).get('/v1/album?artist=' + artistParam)
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        const resData = JSON.parse(response.text)

        // Check type and length
        expect(Array.isArray(resData.results)).toBeTruthy()
        expect(resData.results.length).toBeGreaterThan(-1)

        // Check data
        expect(resData.results[0].collectionType).toEqual('Album')
        expect(resData.results[0].artistName.toLowerCase()).toEqual(artist)
        expect(resData.results[0].artworkUrl100.toLowerCase()).toContain('http')
      })
  })
}

testAlbum('taylor swift');
testAlbum('lady gaga');

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
