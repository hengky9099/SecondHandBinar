import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {create} from 'react-test-renderer';
import InputAdd from '../../src/component/InputAdd';

describe('InputAdd Component Testing', () => {
  const styles = StyleSheet.create({
    input: {
      width: moderateScale(300),
      height: moderateScale(500),
    },
  });

  const InputAddComponent = create(
    <InputAdd onPress={() => null} product={true} style={styles.input} />,
  );
  jest.useFakeTimers();
  test('should render correctly', () => {
    const element = InputAddComponent.root.findByType(TouchableOpacity);
    expect(element).toBeTruthy();
    expect(element.props.style[1].width).toEqual(moderateScale(300));
    expect(element.props.style[1].height).toEqual(moderateScale(500));
    expect(element.props.children.props.children[1].props.children).toEqual(
      'Tambah Produk',
    );
  });
});
