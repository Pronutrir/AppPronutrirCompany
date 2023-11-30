import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage } from 'react-native-responsive-fontsize';

const ShimerPlaceHolderMenuStopWacth = () => {
  return (
    <View style={styles.card}>
      <ShimmerPlaceholder
        style={styles.shimmerTextFull}
        LinearGradient={LinearGradient}
      />
      <ShimmerPlaceholder
        style={styles.shimmerText}
        LinearGradient={LinearGradient}
      />
    </View>
  );
};

export default ShimerPlaceHolderMenuStopWacth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shimmerTextFull: {
    width: RFPercentage(20),
    height: RFPercentage(3),
  },
  shimmerText: {
    marginVertical: 5,
    width: '20%',
  },
  shimmerImg: {
    width: 30,
    height: 30,
  },
  shimmerDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '45%',
    height: RFPercentage(14),
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: RFPercentage(2),
    backgroundColor: '#fff',
    opacity: 0.5,
    borderRadius: 10,
    margin: RFPercentage(1),
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  item1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item2: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 10,
  },
});
