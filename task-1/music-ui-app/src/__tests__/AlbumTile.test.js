import { mount } from "@vue/test-utils";
import AlbumTile from '../components/AlbumTile.vue';

describe('AlbumTile.test.js', () => {
  let cmp;

  beforeEach(() => {
    cmp = mount(AlbumTile, {
      propsData: {
        item: {
          "wrapperType": "collection",
          "collectionType": "Album",
          "artistId": 909253,
          "collectionId": 1469577723,
          "amgArtistId": 468749,
          "artistName": "Jack Johnson",
          "collectionName": "Demo album name",
          "collectionCensoredName": "Demo album name",
          "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ae/4c/d4/ae4cd42a-80a9-d950-16f5-36f01a9e1881/source/100x100bb.jpg"
        }
      }
    });
  });

  it("has received 'Demo album name' as the collectionName property", () => {
    expect(cmp.vm.item.collectionName).toEqual('Demo album name')
  })

  it("has received alubm art url", () => {
    expect(cmp.vm.item.artworkUrl100).toEqual('https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ae/4c/d4/ae4cd42a-80a9-d950-16f5-36f01a9e1881/source/100x100bb.jpg')
  })

  it("has the expected html structure", () => {
    expect(cmp.element).toMatchSnapshot();
  });
});