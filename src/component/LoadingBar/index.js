import {View, StyleSheet} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {COLORS} from '../../helpers/colors';

const LoadingBar = ({loading}) => {
  if (loading) {
    return (
      <View style={styles.loading}>
        <Progress.CircleSnail
          size={80}
          indeterminate={true}
          thickness={5}
          color={COLORS.purple4}
        />
      </View>
    );
  } else {
    return null;
  }
};

export default LoadingBar;

const styles = StyleSheet.create({
  loading: {justifyContent: 'center', alignSelf: 'center'},
});
