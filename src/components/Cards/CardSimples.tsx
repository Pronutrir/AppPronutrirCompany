import React from 'react';
import { StyleSheet, View, Platform, ViewStyle } from 'react-native';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
interface Props {
    styleCardContainer?: ViewStyle;
    children: JSX.Element;
}

const CardSimples: React.FC<Props> = ({
    children,
    styleCardContainer,
}: Props) => {
    const styles = useThemeAwareObject(createStyles);
    return <View style={[styles.card, styleCardContainer]}>{children}</View>;
};

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        card: {
            width: '95%',
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: '#fff',
            margin: 10,
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
    return styles;
};

export default CardSimples;
