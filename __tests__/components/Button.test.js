import React from 'react';
import {TouchableOpacity} from 'react-native';
import {create} from 'react-test-renderer';
import {Button} from '../../src/component';

describe('Button Component Testing', () => {
  const ButtonComponent = create(<Button textButton1="Button" />);
  jest.useFakeTimers();
  test('should render correctly', () => {
    const element = ButtonComponent.root.findByType(TouchableOpacity);
    expect(element).toBeTruthy();
    expect(element.props.style.backgroundColor).toEqual('#7126B5');
    expect(element.props.children.props.children).toEqual('Button');
  });
});
