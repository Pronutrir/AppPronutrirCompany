import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import ShimmerPlaceholder, {
  ShimmerPlaceholderProps,
} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage } from 'react-native-responsive-fontsize';

interface Props {
  containerStyle?: ShimmerPlaceholderProps;
}

const ShimerPlaceHolderSelected = ({ containerStyle }: Props) => {
  return (
    <ShimmerPlaceholder
      LinearGradient={LinearGradient}
      style={[styles.container, containerStyle]}
    />
  );
};

export default ShimerPlaceHolderSelected;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RFPercentage(6),
    margin: RFPercentage(2),
    backgroundColor: 'white',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
