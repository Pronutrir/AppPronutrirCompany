import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ThemeContextData } from '../../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';
import { RFPercentage } from 'react-native-responsive-fontsize';
import BtnOptions from '../../../../components/buttons/BtnOptions';
import { IFamiliarSimples } from '../../../../hooks/useFamiliar';
import moment from 'moment';

type Props = {
    historicoSinaisVitais: IFamiliarSimples | null;
    onPressOK?(): void;
    onPressCancel?(): void;
};

const CardDuplicidadeAcompanhante = ({
    historicoSinaisVitais,
    onPressOK = () => {
        ('');
    },
    onPressCancel = () => {
        ('');
    },
}: Props) => {
    const styles = useThemeAwareObject(createStyle);

    return (
        <View style={styles.container}>
            <Text style={styles.textMenssage}>
                O acompanhante já possui cadastro, deseja vincular-lo ao
                paciente ?
            </Text>
            <View>
                <View style={styles.box}>
                    <View style={styles.item}>
                        <Text style={styles.label}>Nome: </Text>
                        <Text style={styles.text}>
                            {historicoSinaisVitais?.nm_Pessoa_Fisica}
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>Data nascimento: </Text>
                        <Text style={styles.text}>
                            {moment(
                                historicoSinaisVitais?.dt_Nascimento,
                            ).format('DD-MM-YYYY')}
                        </Text>
                    </View>
                    {historicoSinaisVitais?.nr_CPF && (
                        <View style={styles.item}>
                            <Text style={styles.label}>Cpf: </Text>
                            <Text style={styles.text}>
                                {historicoSinaisVitais.nr_CPF}
                            </Text>
                        </View>
                    )}
                    {historicoSinaisVitais?.nr_Identidade && (
                        <View style={styles.item}>
                            <Text style={styles.label}>Rg: </Text>
                            <Text style={styles.text}>
                                {historicoSinaisVitais.nr_Identidade}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    paddingVertical: RFPercentage(1),
                }}>
                <BtnOptions valueText={'Ok'} onPress={() => onPressOK()} />
                <BtnOptions
                    valueText={'Cancel'}
                    onPress={() => onPressCancel()}
                />
            </View>
        </View>
    );
};

export default CardDuplicidadeAcompanhante;

const createStyle = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        box: {
            marginVertical: RFPercentage(1),
            justifyContent: 'space-between',
            backgroundColor: theme.colors.BACKGROUND_2,
            borderRadius: 30,
            padding: 10,
        },
        item: {
            flexDirection: 'row',
            marginHorizontal: RFPercentage(2),
        },
        textMenssage: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            fontSize: theme.typography.SIZE.fontysize18,
            textAlign: 'center',
            margin: 10,
        },
        label: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            fontSize: theme.typography.SIZE.fontysize16,
        },
        text: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            flexWrap: 'wrap',
        },
    });
    return styles;
};
