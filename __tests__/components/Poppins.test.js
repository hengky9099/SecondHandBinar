import React from 'react';
import {create} from 'react-test-renderer';
import Poppins from '../../src/component/FontComponents/Poppins';
import {COLORS} from '../../src/helpers/colors';

describe('Poppins Component Testing', () => {
  beforeAll(done => {
    jest.useFakeTimers();
    done();
  });

  const PoppinsComponent = create(
    <Poppins style={{color: COLORS.black, textAlign: 'center'}} type="Bold">
      Hallo ini dari Testing
    </Poppins>,
  );
  test('should render correctly', () => {
    jest.useFakeTimers();

    const element = PoppinsComponent.root.findByType('Text');
    expect(element).toBeTruthy();
    expect(element.props.children).toEqual('Hallo ini dari Testing');
    expect(element.props.style[1].color).toEqual(COLORS.black);
    expect(element.props.style[1].textAlign).toEqual('center');
    expect(element.props.style[0].fontFamily).toEqual('Poppins-Bold');
  });

  afterAll(done => {
    jest.useFakeTimers();
    done();
  });
});
