import React from 'react';
import {TouchableOpacity} from 'react-native';
import TestRenderer from 'react-test-renderer';
import ItemProductCard from '../../src/component/ItemProductCard';

describe('ItemProductCard Component Testing', () => {
  beforeAll(done => {
    jest.useFakeTimers();
    done();
  });

  const ItemProductCardComponent = TestRenderer.create(
    <ItemProductCard
      url="https://images.bisnis-cdn.com/posts/2021/10/10/1452663/weker.jpg"
      productName="Samsung Galaxy SmartPhone"
      productPrice="Rp. 2.000.000"
      productType="Handphone"
    />,
  );

  test('should render correctly', () => {
    jest.useFakeTimers();

    const element = ItemProductCardComponent.root.findByType(TouchableOpacity);
    expect(element).toBeTruthy();
    expect(element.props.children[0].props.source.uri).toEqual(
      'https://images.bisnis-cdn.com/posts/2021/10/10/1452663/weker.jpg',
    );
    expect(element.props.children[1].props.children).toEqual(
      'Samsung Galaxy SmartPhone',
    );
    expect(element.props.children[2].props.children).toEqual('Handphone');
    expect(element.props.children[3].props.children).toEqual('Rp. 2.000.000');
  });

  afterAll(done => {
    jest.useFakeTimers();
    done();
  });
});
