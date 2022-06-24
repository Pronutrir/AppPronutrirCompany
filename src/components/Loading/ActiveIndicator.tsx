import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ThemeContextData } from '../../contexts/themeContext';
import useTheme from '../../hooks/useTheme';

type Props = {
    active?: boolean
};

const ActiveIndicator = ({ active = false }: Props) => {
    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);

    if (!active) {
        return null;
    }
    return (
        <View style={styles.loading}>
            <ActivityIndicator size={'large'} color={theme.colors.GREENPRIMARY} />
        </View>
    );
};

export default ActiveIndicator;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        loading: {
            margin: 10,
            width: '100%',
            height: '100%',
            backgroundColor: theme.colors.BACKGROUND_1,
        },
    });
    return styles;
};


