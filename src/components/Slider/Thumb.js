import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const THUMB_RADIUS = 15;

const Thumb = () => {
  return (
    <View style={styles.root}/>
  );
};

const styles = StyleSheet.create({
  root: {
    width: RFPercentage(5, 680),
    height: RFPercentage(5, 680),
    borderRadius: RFPercentage(5, 680),
    borderWidth: 2,
    borderColor: '#7f7f7f',
    backgroundColor: '#ffffff',
  },
});

export default memo(Thumb);