import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';
import moment from 'moment';
import { IPFSinaisVitais } from '../../../../contexts/sinaisVitaisContext';

interface Props {
    PessoaFisica: IPFSinaisVitais
}

const PessoaFisicaComponent = ({ PessoaFisica }:Props) => {
    const styles = useThemeAwareObject(createStyles);
    return (
        <View>
            <View style={styles.boxLabel}>
                <Text style={styles.label}>Nome: </Text>
                <Text style={styles.text}>
                    {PessoaFisica?.nM_PESSOA_FISICA}
                </Text>
            </View>
            <View style={styles.boxLabel}>
                <Text style={styles.label}>Nascimento: </Text>
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
        label: {
            color: '#1E707D',
            fontSize: RFValue(16, 680),
            fontWeight: 'bold',
        },
        text: {
            color: '#1E707D',
            fontSize: RFValue(16, 680),
            flexWrap: 'wrap',
        },
    });
    return styles;
};
