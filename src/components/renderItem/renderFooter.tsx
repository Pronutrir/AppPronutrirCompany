import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';

type Props = {
    show?: boolean;
};

const RenderFooter = ({ show = false }: Props) => {
    const styles = useThemeAwareObject(createStyles);

    if (!show) {
        return null;
    }
    return (
        <View style={styles.loading}>
            <ActivityIndicator size={'small'} color={'#08948A'} />
        </View>
    );
};

export default RenderFooter;

const createStyles = () => {
    const styles = StyleSheet.create({
        loading: {
            margin: 10,
            width: '100%',
            height: '100%',
        },
    });
    return styles;
};
