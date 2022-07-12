import React from 'react';
import {TouchableOpacity} from 'react-native';
import TestRenderer from 'react-test-renderer';
import Button from '../../src/component/Button';

describe('Button Component Testing', () => {
  beforeAll(done => {
    jest.useFakeTimers();
    done();
  });

  const ButtonComponent = TestRenderer.create(<Button textButton1="Button" />);
  test('should render correctly', () => {
    jest.useFakeTimers();

    const element = ButtonComponent.root.findByType(TouchableOpacity);
    expect(element).toBeTruthy();
    expect(element.props.style.backgroundColor).toEqual('#7126B5');
    expect(element.props.children.props.children).toEqual('Button');
  });

  afterAll(done => {
    jest.useFakeTimers();
    done();
  });
});
