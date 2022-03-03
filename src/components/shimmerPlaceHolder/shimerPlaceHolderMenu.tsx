import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage } from 'react-native-responsive-fontsize';

const ShimerPlaceHolderMenu = () => {
    return (
        <View style={styles.card}>
            <View style={styles.item1}>
                <ShimmerPlaceholder
                    style={styles.shimmerTextFull}
                    LinearGradient={LinearGradient}
                />
            </View>
            <View style={styles.item2}>
                <ShimmerPlaceholder
                    style={styles.shimmerImg}
                    LinearGradient={LinearGradient}
                />
            </View>
        </View>
    );
};

export default ShimerPlaceHolderMenu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    shimmerTextFull: {
        marginVertical: 5,
        width: RFPercentage(20),
        height: RFPercentage(3),
    },
    shimmerText: {
        marginVertical: 5,
        width: '40%',
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
        width: '95%',
        height: RFPercentage(12),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: RFPercentage(2),
        backgroundColor: '#fff',
        opacity: 0.5,
        borderRadius: 10,
        margin: 10,
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
