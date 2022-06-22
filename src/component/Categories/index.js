import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

const categories = ['Semua', 'Hobi', 'Kendaraan', 'Fashion', 'Kithcen'];

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
            <View>
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  padding: 10,
                  backgroundColor: '#E2D4F0',
                  fontSize: 14,
                  margin: 5,
                  height: 44,
                  borderRadius: 10,
                }}>
                {category}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

export default Categories;
