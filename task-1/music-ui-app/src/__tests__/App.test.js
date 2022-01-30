import { shallowMount } from "@vue/test-utils";
import App from '../App';

describe('Albums.test.js', () => {
  let cmp;

  beforeEach(async () => {
    cmp = shallowMount(App)
  });

  it("has the expected html structure", () => {
    expect(cmp.element).toMatchSnapshot();
  });


});