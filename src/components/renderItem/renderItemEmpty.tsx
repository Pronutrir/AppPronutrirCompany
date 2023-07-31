import { StyleSheet, Text } from 'react-native';
import React from 'react';
import CardSimples from '../Cards/CardSimples';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ThemeContextData } from '../../contexts/themeContext';

type Props = {
    text?: string;
    show?: boolean;
};

const RenderItemEmpty: React.FC<Props> = ({
    text = 'Nenhum dado encontrado !',
    show = false,
}: Props) => {
    const styles = useThemeAwareObject(createStyles);

    if (show) {
        return null;
    }

    return (
        <CardSimples styleCardContainer={styles.cardStyle}>
            <Text style={styles.text}>{text}</Text>
        </CardSimples>
    );
};

export default RenderItemEmpty;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        cardStyle: {
            flex: 1,
            padding: 10,
        },
        text: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlignVertical: 'center',
        },
    });
    return styles;
};
