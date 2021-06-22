import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const RailSelected = () => {
  return (
    <View style={styles.root}/>
  );
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: RFPercentage(2, 680),
    backgroundColor: '#52b4ad',
    borderRadius: 2,
  },
});