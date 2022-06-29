import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import TestRenderer from 'react-test-renderer';
import Header from '../../src/component/Header';

describe('Header Component Testing', () => {
  beforeAll(done => {
    jest.useFakeTimers();
    done();
  });

  const HeaderComponent = TestRenderer.create(
    <Header headerName="Hallo" backArrowBackground={true} />,
  );

  test('should render correctly', () => {
    jest.useFakeTimers();

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

  afterAll(done => {
    jest.useFakeTimers();
    done();
  });
});
