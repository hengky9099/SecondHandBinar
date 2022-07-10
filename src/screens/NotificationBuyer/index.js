import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ItemNotificationCard, Poppins} from '../../component';
import {COLORS} from '../../helpers/colors';
import {moderateScale} from 'react-native-size-matters';

const NotificationBuyer = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    let monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let dateObj = new Date();
    let date = dateObj.getDate();
    let month = monthNames[dateObj.getMonth() + 1];
    let hours = dateObj.getHours();
    if (hours < 10) {
      hours = '0' + hours.toString();
    }
    let min = dateObj.getMinutes();
    if (min < 10) {
      min = '0' + min.toString();
    }
    setCurrentDate(date + ' ' + month + ' ,' + ' ' + hours + ':' + min);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Poppins style={styles.textHeader}>Notifikasi</Poppins>
        <View style={styles.containerNotifBar}>
          <ItemNotificationCard
            typeNotif={'Penawaran product'}
            date={currentDate}
            productName={'Jam Tangan Casio'}
            productPrice={'Rp 250.000'}
            tawaran={'Berhasil Ditawar Rp 200.000'}
            status
          />
          <ItemNotificationCard
            typeNotif={'Penawaran product'}
            date={'19 Apr, 12:00'}
            productName={'Jam Tangan Casio'}
            productPrice={'Rp 250.000'}
            tawaran={'Ditawar Rp 200.000'}
          />
        </View>
      </View>
    </View>
  );
};

export default NotificationBuyer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
  },
  textHeader: {
    fontSize: moderateScale(25),
    color: COLORS.black,
    fontWeight: 'bold',
  },
  containerNotifBar: {marginTop: moderateScale(10)},
});
