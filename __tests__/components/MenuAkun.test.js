import React from 'react';
import {create} from 'react-test-renderer';
import MenuAkun from '../../src/component/MenuAkun';

describe('MenuAkun Component Testing', () => {
  const MenuAkunComponent = create(
    <MenuAkun menuName="Logout" nameIcon="log-out" />,
  );
  jest.useFakeTimers();
  test('should render correctly', () => {
    const element = MenuAkunComponent.root.findByType('View');
    expect(element).toBeTruthy();
    expect(element.props.children[0][0].props.name).toEqual('log-out');
    expect(element.props.children[0][1].props.children).toEqual('Logout');
  });
});
