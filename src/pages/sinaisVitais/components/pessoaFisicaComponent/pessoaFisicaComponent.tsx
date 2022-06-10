import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ThemeContextData } from '../../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';
import moment from 'moment';

interface IPessoaFisica{
    nM_PESSOA_FISICA: string;
    dT_NASCIMENTO: string;
}

interface Props {
    PessoaFisica: IPessoaFisica
}

const PessoaFisicaComponent = ({ PessoaFisica }:Props) => {
    const styles = useThemeAwareObject(createStyles);
    return (
        <View>
            <View style={styles.boxLabel}>
                <Text style={styles.textLabel}>Nome: </Text>
                <Text style={styles.text}>
                    {PessoaFisica?.nM_PESSOA_FISICA}
                </Text>
            </View>
            <View style={styles.boxLabel}>
                <Text style={styles.textLabel}>Nascimento: </Text>
                <Text style={styles.text}>
                    {moment(PessoaFisica?.dT_NASCIMENTO).format('DD-MM-YYYY')}
                </Text>
            </View>
        </View>
    );
};

export default PessoaFisicaComponent;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.BACKGROUND_1,
        },
        item1: {
            padding: 10,
            alignItems: 'flex-start',
        },
        boxLabel: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 10,
        },
        textLabel: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlignVertical: 'center'
        },
        text: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlignVertical: 'center'
        },
    });
    return styles;
};
