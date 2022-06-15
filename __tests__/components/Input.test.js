import React from 'react';
import {create} from 'react-test-renderer';
import Input from '../../src/component/Input';
import {COLORS} from '../../src/helpers/colors';

describe('Input Component Testing', () => {
  const inputComponent = create(
    <Input placeholder="Input Testing" placeholderTextColor="#000000" />,
  );
  jest.useFakeTimers();
  test('should render correctly', () => {
    const element = inputComponent.root.findByType('TextInput');
    expect(element).toBeTruthy();
    expect(element.props.placeholder).toEqual('Input Testing');
    expect(element.props.placeholderTextColor).toEqual('#000000');
    expect(element.props.style[0].borderColor).toEqual(COLORS.neutral2);
  });
});
