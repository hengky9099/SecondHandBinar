import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
const categories = ['Semua', 'Hobi', 'Kendaraan'];

class Categories extends Component {
  state = {};
  render() {
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              this.props.navigation.navigate('', {
                category,
              })
            }>
            <View style={styles.barcategories}>
              <Icon name="search" size={15} style={styles.icon} />
              <Text>{category}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

export default Categories;

const styles = StyleSheet.create({
  barcategories: {
    // backgroundColor: 'black',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E2D4F0',
    fontSize: 14,
    margin: 5,
    height: 44,
    borderRadius: 10,
  },
  icon: {
    marginTop: 4,
  },
});
