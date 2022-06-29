import React from 'react';
import {create} from 'react-test-renderer';
import IdentityCard from '../../src/component/IdentityCard';

describe('IdentityCard Component Testing', () => {
  const IdentityCardComponent = create(
    <IdentityCard
      urlImage="https://assets.pikiran-rakyat.com/crop/12x16:705x712/x/photo/2021/08/18/2258085066.jpeg"
      nama="Jaemin"
      kota="Jakarta"
      typeIdentity="Pembeli"
    />,
  );
  jest.useFakeTimers();
  test('should render correctly', () => {
    const element = IdentityCardComponent.root.findByType('View');
    expect(element).toBeTruthy();
    expect(
      element.props.children.props.children[0].props.children.props.source.uri,
    ).toEqual(
      'https://assets.pikiran-rakyat.com/crop/12x16:705x712/x/photo/2021/08/18/2258085066.jpeg',
    );
    expect(
      element.props.children.props.children[1].props.children[0].props.children,
    ).toEqual('Jaemin');
  });
});
