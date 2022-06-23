import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {create} from 'react-test-renderer';
import Header from '../../src/component/Header';

describe('Header Component Testing', () => {
  const HeaderComponent = create(
    <Header headerName="Hallo" backArrowBackground={true} />,
  );
  jest.useFakeTimers();
  test('should render correctly', () => {
    const element = HeaderComponent.root.findByType('View');
    expect(element).toBeTruthy();
    expect(element.props.children[0].props.style.backgroundColor).toEqual(
      '#FFFFFF',
    );
    expect(element.props.children[0].props.style.borderRadius).toEqual(
      moderateScale(100),
    );
    expect(element.props.children[1].props.children.props.children).toEqual(
      'Hallo',
    );
  });
});
