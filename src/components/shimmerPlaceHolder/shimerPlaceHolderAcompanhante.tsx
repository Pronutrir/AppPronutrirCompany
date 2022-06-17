import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimerPlaceHolderCardSNVTs = () => {
    return (
        <View style={styles.card}>
            <View style={styles.item1}>
                <ShimmerPlaceholder
                    style={styles.shimmerImg}
                    LinearGradient={LinearGradient}
                />
            </View>
            <View style={styles.item2}>
                <ShimmerPlaceholder
                    style={styles.shimmerTextFull}
                    LinearGradient={LinearGradient}
                />
                <ShimmerPlaceholder
                    style={styles.shimmerTextFull}
                    LinearGradient={LinearGradient}
                />
                <View style={styles.shimmerDiv}>
                    <ShimmerPlaceholder
                        style={styles.shimmerText}
                        LinearGradient={LinearGradient}
                    />
                    <ShimmerPlaceholder
                        style={styles.shimmerText}
                        LinearGradient={LinearGradient}
                    />
                </View>
            </View>
        </View>
    );
};

export default ShimerPlaceHolderCardSNVTs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    shimmerTextFull: {
        marginVertical: 5,
        width: '100%',
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
        height: Dimensions.get('screen').height / 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item2: {
        flex: 1,
        paddingHorizontal: 10,
    },
});
