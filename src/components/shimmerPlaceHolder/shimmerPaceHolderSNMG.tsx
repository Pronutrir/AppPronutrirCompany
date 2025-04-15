import React from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { View } from 'react-native-animatable';

const ShimmerPaceHolderSNMG: React.FC = () => {
    return (
        <View style={styles.ContainerRanger}>
            <View style={styles.labelRanger}>
                <View style={styles.shimmerDiv}>
                    <ShimmerPlaceholder
                        style={styles.shimmerText}
                        LinearGradient={LinearGradient}
                    />
                </View>
                <View style={styles.shimmerDiv}>
                    <ShimmerPlaceholder
                        style={styles.shimmerImg}
                        LinearGradient={LinearGradient}
                    />
                    <ShimmerPlaceholder
                        style={styles.shimmerNumber}
                        LinearGradient={LinearGradient}
                    />
                    <ShimmerPlaceholder
                        style={styles.shimmerMD}
                        LinearGradient={LinearGradient}
                    />
                     <ShimmerPlaceholder
                        style={styles.shimmerImg}
                        LinearGradient={LinearGradient}
                    />
                </View>
            </View>
            <View style={styles.RangeSlider}>
                <ShimmerPlaceholder
                    style={styles.shimmerTextFull}
                    LinearGradient={LinearGradient}
                />
            </View>
        </View>
    );
};

export default ShimmerPaceHolderSNMG;

const styles = StyleSheet.create({
    ContainerRanger: {
        paddingVertical: RFPercentage(1),
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    labelRanger: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //paddingHorizontal: RFPercentage(2),
        paddingVertical: RFPercentage(0.5),
    },
    RangeSlider: {
        paddingVertical: RFPercentage(1),
    },
    shimmerTextFull: {
        marginVertical: 5,
        width: '100%',
    },
    shimmerText: {
        marginVertical: 5,
        width: '40%',
    },
    shimmerNumber: {
        marginVertical: 5,
        width: '20%',
    },
    shimmerMD: {
        marginVertical: 5,
        width: '10%',
    },
    shimmerImg: {
        width: 30,
        height: 30,
    },
    shimmerDiv: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: RFPercentage(2),
    },
    card: {
        width: '95%',
        height: Dimensions.get('screen').height / 8,
        flexDirection: 'column',
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
    },
    item2: {
        flex: 1,
        paddingHorizontal: 10,
    },
});
