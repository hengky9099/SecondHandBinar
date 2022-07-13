import React from 'react';
import {create} from 'react-test-renderer';
import BottomSheet from '../../src/component/BottomSheet';

describe('BottomSheet Component Testing', () => {
  beforeAll(done => {
    jest.useFakeTimers();
    done();
  });

  const onPressButton = () => console.log('Hallo');

  const BottomSheetComponent = create(
    <BottomSheet
      firstText="Yeay kamu berhasil mendapat harga yang sesuai"
      secondText="Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya"
      type="productMatch"
      productName="HP"
      productPrice="Rp. 12000"
      bargainPrice="Rp. 10000"
      urlImageProduct="https://d1n6dbtoa2690v.cloudfront.net/article/61665d5db42c2eaf920a07f8/61665d5db42c2eaf920a07f8_1638417329.jpg"
      urlImageBuyer="https://editorial.femaledaily.com/wp-content/uploads/2021/12/Jaemin-Bareface.png"
      buyerCity="Seoul"
      buyerName="Nana"
      onPressButton={onPressButton}
    />,
  );
  test('should render correctly', () => {
    jest.useFakeTimers();

    const element = BottomSheetComponent.root.findByType('View');
    expect(element).toBeTruthy();
    expect(element.props.children.props.children[0].props.children).toEqual(
      'Yeay kamu berhasil mendapat harga yang sesuai',
    );
    expect(element.props.children.props.children[1].props.children).toEqual(
      'Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya',
    );
    expect(
      element.props.children.props.children[2].props.children[1].props
        .textButton1,
    ).toEqual('Hubungi via WhatsApp');
  });

  afterAll(done => {
    jest.useFakeTimers();
    done();
  });
});
