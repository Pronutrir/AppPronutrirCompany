import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';
import CardSimples from '../../../../components/Cards/CardSimples';
import { ThemeContextData } from '../../../../contexts/themeContext';

interface Props {
    value?: number;
    label?: string;
}

const CardStatusExamesComponent: React.FC<Props> = ({
    label = 'teste',
    value = 0,
}) => {
    const styles = useThemeAwareObject(creatStyles);

    return (
        <View style={styles.container}>
            <CardSimples styleCardContainer={styles.cardstyles}>
                <Text style={styles.text}>{value}</Text>
            </CardSimples>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
};

const creatStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            width: Dimensions.get('screen').width / 2,
            alignItems: 'center',
        },
        cardstyles: {
            backgroundColor: theme.colors.BUTTON_SECUNDARY,
            width: Dimensions.get('screen').width / 4,
            height: Dimensions.get('screen').height / 20,
        },
        text: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_TERTIARY,
            fontSize: theme.typography.SIZE.fontysize20,
        },
        label: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize14,
        },
    });
    return styles;
};

export default CardStatusExamesComponent;
