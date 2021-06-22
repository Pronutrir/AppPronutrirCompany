import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const Rail = () => {
  return (
    <View style={styles.root}/>
  );
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: RFPercentage(2, 680),
    borderRadius: 1,
    backgroundColor: '#7f7f7f',
  },
});