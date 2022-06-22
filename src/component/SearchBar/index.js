import {View, TextInput, Text, StyleSheet} from 'react-native';
import React from 'react';

const SearchBar = props => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cari di second Chace"
        style={styles.input}
        value={props.searchText}
        onChangeText={text => props.setSearchText(text)}
        onSubmitEditing={props.onSubmit}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 48,
    width: 328,
    left: 16,
    marginHorizontal: -5,
    marginTop: 20,
    margin: 5,
  },

  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    color: '#000',
  },
});
