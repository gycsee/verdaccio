import React from 'react';
import { mount } from 'enzyme';
import storage from '../../../src/webui/utils/storage';
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
    expect(wrapper.state().logoUrl).toEqual(
      'http://localhost/-/static/logo.png'
    );
  });

  it('toggleLoginModal: should toggle the value in state', () => {
    const { toggleLoginModal } = wrapper.instance();
    expect(wrapper.state().showLoginModal).toBeFalsy();
    toggleLoginModal();
    expect(wrapper.state().showLoginModal).toBeTruthy();
    expect(wrapper.state().error).toEqual({});
  });

  it('setUsernameAndPassword - should set username and password in state', () => {
    const { setUsernameAndPassword } = wrapper.instance();

    expect(setUsernameAndPassword('username', 'xyz')).toBeUndefined();
    expect(wrapper.state('username')).toEqual('xyz');

    expect(setUsernameAndPassword('password', '1234')).toBeUndefined();
    expect(wrapper.state('password')).toEqual('1234');
  });

  it('handleLogout - logouts the user and clear localstorage', () => {
    const { handleLogout } = wrapper.instance();
    storage.setItem('username', 'verdaccio');
    storage.setItem('token', 'xxxx.TOKEN.xxxx')

    handleLogout();
    expect(handleLogout()).toBeUndefined();
    expect(wrapper.state('user')).toEqual({});
    expect(wrapper.state('isLoggedIn')).toBeFalsy();
  });

  // it('doLogin - login the user', async () => {
  //   const { doLogin } = wrapper.instance();
  //   storage.setItem('username', 'verdaccio');
  //   storage.setItem('token', 'xxxx.TOKEN.xxxx')

  //   handleLogout();
  //   expect(handleLogout()).toBeUndefined();
  //   expect(wrapper.state('user')).toEqual({});
  //   expect(wrapper.state('isLoggedIn')).toBeFalsy();
  // });
});
