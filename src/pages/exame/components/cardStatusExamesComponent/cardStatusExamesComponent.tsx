import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';
import CardSimples from '../../../../components/Cards/CardSimples';
import { ThemeContextData } from '../../../../contexts/themeContext';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ExameSvg from '../../../../components/svgComponents/ExameSvg';
import useTheme from '../../../../hooks/useTheme';
interface Props {
    value?: number;
    label?: string;
}

const CardStatusExamesComponent: React.FC<Props> = ({
    label = 'teste',
    value = 0,
}) => {
    const theme = useTheme();
    const styles = useThemeAwareObject(creatStyles);

    const fillSelected = (value: string) => {
        switch (value) {
            case 'Liberadas':
                return theme.colors.BUTTON_SECUNDARY;
            case 'Pendentes':
                return theme.colors.WARNING;
            default:
                return theme.colors.BUTTON_SECUNDARY;
        }
    };

    return (
        <View style={styles.container}>
            <CardSimples styleCardContainer={styles.cardstyles}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ExameSvg
                        style={{ position: 'absolute', right: 3, top: 3 }}
                        width={RFPercentage(4)}
                        height={RFPercentage(4)}
                        fill={theme.colors.WHITE}
                        fillSecondary={fillSelected(label)}
                    />
                    <Text style={styles.text}>{value}</Text>
                </View>
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
            backgroundColor: theme.colors.BUTTON_TERTIARY,
            width: Dimensions.get('screen').width / 3,
            height: Dimensions.get('screen').height / 20,
            alignItems: 'stretch',
        },
        text: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_TERTIARY,
            fontSize: theme.typography.SIZE.fontysize20,
            textAlign: 'center',
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
