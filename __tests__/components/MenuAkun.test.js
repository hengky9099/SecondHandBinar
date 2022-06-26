import React from 'react';
import TestRenderer from 'react-test-renderer';
import {MenuAkun} from '../../src/component';

describe('MenuAkun Component Testing', () => {
  beforeAll(done => {
    jest.useFakeTimers();
    done();
  });

  const MenuAkunComponent = TestRenderer.create(
    <MenuAkun menuName="Logout" nameIcon="log-out" />,
  );

  test('should render correctly', () => {
    jest.useFakeTimers();

    const element = MenuAkunComponent.root.findByType('View');
    expect(element).toBeTruthy();
    expect(element.props.children[0][0].props.name).toEqual('log-out');
    expect(element.props.children[0][1].props.children).toEqual('Logout');
  });

  afterAll(done => {
    jest.useFakeTimers();
    done();
  });
});
