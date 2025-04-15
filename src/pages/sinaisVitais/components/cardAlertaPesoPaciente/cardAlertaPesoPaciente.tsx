import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ThemeContextData } from '../../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';
import { ISinaisVitais } from '../../../../hooks/useSinaisVitais';
import moment from 'moment';
import { RFPercentage } from 'react-native-responsive-fontsize';
import BtnOptions from '../../../../components/buttons/BtnOptions';

type Props = {
    historicoSinaisVitais?: ISinaisVitais[];
    onpress: () => void;
    onpressCancel: () => void;
    title?: string;
    pesoAtual?: number;
    pesoMedio?: number;
};

const CardAlertaPesoPaciente: React.FC<Props> = ({
    historicoSinaisVitais,
    onpress,
    onpressCancel,
    title,
    pesoAtual,
    pesoMedio,
}) => {
    const styles = useThemeAwareObject(createStyle);

    return (
        <View style={styles.container}>
            <Text style={styles.textMenssage}>
                {title ?? 'Histórico de Peso do Paciente'}
            </Text>
            <View>
                {historicoSinaisVitais?.map((item, index) => {
                    return (
                        <View style={styles.box} key={index.toString()}>
                            <View style={styles.item} key={index.toString()}>
                                <Text style={styles.label}>Peso: </Text>
                                <Text style={styles.text}>{item.qT_PESO}</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.label}>Data: </Text>
                                <Text style={styles.text}>
                                    {moment(item.dT_ATUALIZACAO).format(
                                        'DD-MM-YYYY',
                                    )}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    paddingVertical: RFPercentage(1),
                }}>
                <BtnOptions valueText={'Ok'} onPress={() => onpress()} />
                <BtnOptions
                    valueText="Cancelar"
                    onPress={() => onpressCancel()}
                    colors={['#FF6B6B', '#FF8E8E']}
                    textColor="#FFFFFF"
                />
            </View>
        </View>
    );
};

export default CardAlertaPesoPaciente;

const createStyle = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            maxHeight: RFPercentage(80),
            minHeight: RFPercentage(1),
        },
        box: {
            flexDirection: 'row',
            marginVertical: RFPercentage(1),
            justifyContent: 'space-between',
        },
        item: {
            flexDirection: 'row',
            marginHorizontal: RFPercentage(2),
        },
        textMenssage: {
            fontFamily: theme.typography.FONTES.Bold,
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
