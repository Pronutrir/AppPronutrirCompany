import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';
interface Props {
    Item?: number;
}

const CheckPVSinaisVitaisComponent: React.FC<Props> = ({ Item }: Props) => {
    const styles = useThemeAwareObject(createStyles);
    if (Item === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.options1}>
                    <Text style={styles.text}>1</Text>
                </View>
            </View>
        );
    } else {
        return null;
    }
};

export default CheckPVSinaisVitaisComponent;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            top: -10,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        img: {
            alignSelf: 'center',
        },
        text: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_TERTIARY,
            fontSize: theme.typography.SIZE.fontysize18,
        },
        options1: {
            backgroundColor: theme.colors.BUTTON_SECUNDARY,
            width: RFPercentage(3.5),
            height: RFPercentage(3.5),
            borderRadius: 60,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
    return styles;
};
