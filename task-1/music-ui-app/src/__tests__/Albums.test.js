import { mount } from "@vue/test-utils";
import Albums from '../components/Albums.vue';

describe('Albums.test.js', () => {
  let cmp;

  beforeEach(async () => {
    cmp = mount(Albums)
    await cmp.setData({
      fetchedAlbums: [{
        "wrapperType": "collection",
        "collectionType": "Album",
        "artistId": 909253,
        "collectionId": 1469577723,
        "amgArtistId": 468749,
        "artistName": "Jack Johnson",
        "collectionName": "Demo album name",
        "collectionCensoredName": "Demo album name",
        "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ae/4c/d4/ae4cd42a-80a9-d950-16f5-36f01a9e1881/source/100x100bb.jpg"
      },
      {
        "wrapperType": "collection",
        "collectionType": "Album",
        "artistId": 909254,
        "collectionId": 1469577724,
        "amgArtistId": 468749,
        "artistName": "Jack Johnson",
        "collectionName": "New album name",
        "collectionCensoredName": "New album name",
        "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ae/4c/d4/ae4cd42a-80a9-d950-16f5-36f01a9e1881/source/100x100bb.jpg"
      }]
    })
  });

  it("has received 'fetchedAlbums' property", () => {
    expect(cmp.vm.fetchedAlbums.length).toEqual(2)
  })

  it("'albumList' is [] by default", () => {
    expect(cmp.vm.albumList).toEqual([])
  })

  it("expect seach string to have maxlength of 256", async () => {
    const searchText = cmp.find('input.t-search')
    expect(searchText.attributes('maxlength')).toBe('256'); 
  });

  it('Entering `new` in search input, set query string to `new` & search result to have 1 item ', async () => {

    const searchText = cmp.find('input.t-search')
    searchText.setValue('new')
    await searchText.trigger('keyup')
    // console.log(cmp.vm.albumList)
    expect(cmp.vm.q).toBe('new')
    expect(cmp.vm.albumList.length).toBe(1)
  })

  it("has the expected html structure", () => {
    expect(cmp.element).toMatchSnapshot();
  });


});