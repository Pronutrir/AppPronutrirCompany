import React from 'react';
import { StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { View } from 'react-native-animatable';

const ShimmerPaceHolderText: React.FC = () => {
    return (
        <View style={styles.ContainerRanger}>
            <View style={styles.RangeSlider}>
                <ShimmerPlaceholder
                    style={styles.shimmerText}
                    LinearGradient={LinearGradient}
                />
                <ShimmerPlaceholder
                    style={styles.shimmerTextFull}
                    LinearGradient={LinearGradient}
                />
                <ShimmerPlaceholder
                    style={styles.shimmerTextFull}
                    LinearGradient={LinearGradient}
                />
                <ShimmerPlaceholder
                    style={styles.shimmerTextFull}
                    LinearGradient={LinearGradient}
                />
                <ShimmerPlaceholder
                    style={styles.shimmerTextFull}
                    LinearGradient={LinearGradient}
                />
            </View>
        </View>
    );
};

export default ShimmerPaceHolderText;

const styles = StyleSheet.create({
    ContainerRanger: {
        flex: 1,
        paddingVertical: RFPercentage(1),
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
        padding: RFPercentage(2),
    },
    shimmerTextFull: {
        marginVertical: 5,
        width: '100%',
    },
    shimmerText: {
        marginVertical: RFPercentage(5),
        width: '40%',
        alignSelf: 'center',
    },
});
