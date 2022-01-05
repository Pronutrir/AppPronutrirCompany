import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
    width?: number;
    height?: number;
}

const ShimmerPaceHolderFotoPerfil: React.FC<Props> = ({
    width = 80,
    height = 80,
}: Props) => {
    return (
        <ShimmerPlaceholder
            width={width}
            height={height}
            LinearGradient={LinearGradient}
            style={styles.container}
        />
    );
};

export default ShimmerPaceHolderFotoPerfil;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        opacity: 0.5,
        borderRadius: 60,
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
});
