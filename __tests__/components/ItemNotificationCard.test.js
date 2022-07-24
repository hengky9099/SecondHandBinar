import React from 'react';
import {create} from 'react-test-renderer';
import ItemNotificationCard from '../../src/component/ItemNotificationCard';

describe('ItemNotificationCard Component Testing', () => {
  const ItemNotificationCardComponent = create(
    <ItemNotificationCard
      productName="Jaemin"
      date="20 Apr, 14:04"
      productPrice="Rp. 12728379479"
      seen={true}
      typeNotif="Penawaran Produk"
      tawaran="Rp. 150000"
      urlImage="https://assets.pikiran-rakyat.com/crop/12x16:705x712/x/photo/2021/08/18/2258085066.jpeg"
    />,
  );
  jest.useFakeTimers();
  test('should render correctly', () => {
    const element = ItemNotificationCardComponent.root.findByType('View');
    expect(element).toBeTruthy();
    expect(
      element.props.children[0].props.children.props.children[0].props.source
        .uri,
    ).toEqual(
      'https://assets.pikiran-rakyat.com/crop/12x16:705x712/x/photo/2021/08/18/2258085066.jpeg',
    );
    expect(
      element.props.children[0].props.children.props.children[1].props
        .children[0].props.children[0].props.children,
    ).toEqual('Penawaran Produk');
    expect(
      element.props.children[0].props.children.props.children[1].props
        .children[0].props.children[1].props.children[0].props.children,
    ).toEqual('20 Apr, 14:04');
  });
});
