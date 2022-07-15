import {View} from 'react-native';
import React, {useState} from 'react';
import {useRef} from 'react';
import Toast from 'react-native-toast-message';
import {BottomSheet, Button} from '../../component';

const Home = () => {
  const refRBSheet = useRef();
  const onPressButton = () => {
    console.log(value);
  };

  const [value, setValue] = useState(false);
  const [price, setprice] = useState('');

  return (
    <View>
      <Button
        textButton1="OPEN BOTTOM SHEET"
        onPressButton1={() => refRBSheet.current.open()}
      />
      {/* perbaharuiStatus */}
      <BottomSheet
        refBottomSheet={refRBSheet}
        firstText="anyeong hello"
        secondText="hjsahfjhsjfhasfhausfhuehahajhjfhjshfjahfjashf"
        type="perbaharuiStatus"
        value={value}
        onValueChange={newValue => setValue(newValue)}
        onPressButton={onPressButton}
      />

      {/* productMatch */}
      <BottomSheet
        refBottomSheet={refRBSheet}
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
      />

      {/* tawaran */}
      <BottomSheet
        refBottomSheet={refRBSheet}
        firstText="Yeay kamu berhasil mendapat harga yang sesuai"
        secondText="Segera hubungi pembeli melalui whatsapp untuk transaksi selanjutnya"
        type="tawaran"
        productName="HP"
        productPrice="Rp. 12000"
        urlImageProduct="https://d1n6dbtoa2690v.cloudfront.net/article/61665d5db42c2eaf920a07f8/61665d5db42c2eaf920a07f8_1638417329.jpg"
        value={price}
        onChangeText={newValue => setprice(newValue)}
        onPressButton={onPressButton}
      />

      {/* TOAST */}
      <View>
        <Button
          textButton1="success toast"
          onPressButton1={() =>
            Toast.show({
              type: 'successToast',
              text1: 'Produk berhasil diterbitkan.',
            })
          }
        />
        <Button
          textButton1="error toast"
          onPressButton1={() =>
            Toast.show({
              type: 'errorToast',
              text1:
                'error tooast agfgsafhgafkaf kjkj isjdkajsjfkaj jisajflisf',
            })
          }
        />
        <Button
          textButton1="pending toast"
          onPressButton1={() =>
            Toast.show({
              type: 'pendingToast',
              text1: 'pending tooast',
            })
          }
        />
      </View>
    </View>
  );
};

export default Home;
