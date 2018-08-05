import React from 'react';
import { mount } from 'enzyme';

import App from '../../../src/webui/app';

jest.mock('../../../src/webui/utils/storage', () => {
  class LocalStorageMock {
    constructor() {
      this.store = {};
    }
    clear() {
      this.store = {};
    }
    getItem(key) {
      return this.store[key] || null;
    }
    setItem(key, value) {
      this.store[key] = value.toString();
    }
    removeItem(key) {
      delete this.store[key];
    }
  }
  return new LocalStorageMock();
});

jest.mock('element-theme-default', () => ({}));

jest.mock('element-react/src/locale/lang/en', () => ({}));

jest.mock('../../../src/webui/utils/api', () => ({
    request: require('./components/__mocks__/api').default.request
}));


describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  });
  it('loadLogo: set logo url in state', async () => {
    const { loadLogo } = wrapper.instance();
    await loadLogo();
    expect(wrapper.state().logoUrl).toEqual('http://localhost/-/static/logo.png');
  });
});
