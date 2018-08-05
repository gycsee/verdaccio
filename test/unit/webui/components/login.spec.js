import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginModal from '../../../../src/webui/components/Login';

describe('<LoginModal />', () => {
  it('should load the component in default state', () => {
    const wrapper = shallow(<LoginModal />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should load the component with props', () => {
    const props = {
      visibility: true,
      error: {
        type: 'error',
        title: 'Error Title',
        description: 'Error Description'
      },
      onCancel: () => {},
      onChange: () => {},
      onSubmit: () => {}
    };
    const wrapper = shallow(<LoginModal {...props} />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('onCancel: should close the login modal', () => {
    const props = {
      visibility: true,
      error: {
        type: 'error',
        title: 'Error Title',
        description: 'Error Description'
      },
      onCancel: jest.fn(),
      onChange: () => {},
      onSubmit: () => {}
    };
    const wrapper = mount(<LoginModal {...props} />);
    wrapper.find('.el-dialog__footer > .cancel-login-button').simulate('click');
    expect(props.onCancel).toHaveBeenCalled();
    wrapper.find('.el-dialog__headerbtn > .el-dialog__close').simulate('click');
    expect(props.onCancel).toHaveBeenCalled();
  });

  it('onChange: should call the onChange on username and password changes', () => {
    const props = {
      visibility: true,
      error: {
        type: 'error',
        title: 'Error Title',
        description: 'Error Description'
      },
      onCancel: () => {},
      onChange: jest.fn(),
      onSubmit: () => {}
    };
    const wrapper = mount(<LoginModal {...props} />);
    wrapper.find('input[name="username"]').simulate('change');
    expect(props.onChange).toHaveBeenCalled();
    wrapper.find('input[name="password"]').simulate('change');
    expect(props.onChange).toHaveBeenCalled();
  });

  it('onSubmit: should call the onSubmit', () => {
    const props = {
      visibility: true,
      error: {
        type: 'error',
        title: 'Error Title',
        description: 'Error Description'
      },
      onCancel: () => {},
      onChange: () => {},
      onSubmit: jest.fn()
    };
    const wrapper = shallow(<LoginModal {...props} />);
    wrapper.find('.login-button').simulate('click');
    expect(props.onSubmit).toHaveBeenCalled();
  });
});
