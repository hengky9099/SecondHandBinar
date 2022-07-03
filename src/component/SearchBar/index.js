/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const SearchBar = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bar}>
        <TextInput
          placeholder="Cari di second Chace "
          style={styles.input}
          value={props.searchText}
          onChangeText={text => props.setSearchText(text)}
          onSubmitEditing={props.onSubmit}
        />
        <Icon name="search" size={25} style={{marginTop: 15}} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {},
  bar: {
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    width: 328,
    left: 16,
    marginVertical: 5,
    marginHorizontal: -5,
    marginTop: 20,
    margin: 5,
  },

  input: {
    // backgroundColor: 'black',
    padding: 10,
    width: 300,
    color: '#000',
  },
});
