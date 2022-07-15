import {View, TextInput, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';

const {width} = Dimensions.get('window');

const SearchBar = ({
  onSubmit,
  clicked,
  setCLicked,
  searchText,
  setSearchText,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }>
        <TextInput
          placeholder="Cari di second Chace"
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={onSubmit}
          onFocus={() => {
            setCLicked(true);
          }}
        />
        <Feather name="search" size={24} />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(48),
    width: width - moderateScale(30),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.white,
    marginTop: moderateScale(20),
    flexDirection: 'column',
    // justifyContent: 'space-evenly',
  },
  input: {
    fontSize: moderateScale(15),
    width: '90%',
    marginLeft: moderateScale(10),
  },
  searchBar__unclicked: {
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center',
  },
  searchBar__clicked: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
