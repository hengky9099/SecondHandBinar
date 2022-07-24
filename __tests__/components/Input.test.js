import React from 'react';
import TestRenderer from 'react-test-renderer';
import Input from '../../src/component/Input';
import {COLORS} from '../../src/helpers/colors';

describe('Input Component Testing', () => {
  beforeAll(done => {
    jest.useFakeTimers();
    done();
  });

  const inputComponent = TestRenderer.create(
    <Input placeholder="Input Testing" placeholderTextColor="#000000" />,
  );

  test('should render correctly', () => {
    jest.useFakeTimers();

    const element = inputComponent.root.findByType('TextInput');
    expect(element).toBeTruthy();
    expect(element.props.placeholder).toEqual('Input Testing');
    expect(element.props.placeholderTextColor).toEqual('#000000');
    expect(element.props.style[0].borderColor).toEqual(COLORS.neutral2);
  });

  afterAll(done => {
    jest.useFakeTimers();
    done();
  });
});
