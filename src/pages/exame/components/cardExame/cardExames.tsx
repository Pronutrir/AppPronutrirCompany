import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useThemeAwareObject } from '../../../../hooks/useThemedStyles';
import { ThemeContextData } from '../../../../contexts/themeContext';
import { useNavigation } from '@react-navigation/native';
import ExameSvg from '../../../../components/svgComponents/ExameSvg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import moment from 'moment';
import useTheme from '../../../../hooks/useTheme';
import { IExame, IparamsFilterExame } from '../../../../hooks/useExames';
import CardSimples from '../../../../components/Cards/CardSimples';

type Props = {
    index: number;
    item: IExame;
    filter: IparamsFilterExame;
};

const CardExames = ({ index, item, filter }: Props) => {
    const styles = useThemeAwareObject(createStyles);
    const theme = useTheme();
    const navigation = useNavigation();

    const fillSelected = (value: string) => {
        switch (value) {
            case 'E':
                return theme.colors.BUTTON_SECUNDARY;
            case 'A':
                return theme.colors.WARNING;
            case 'C':
                return theme.colors.ERROR;
            default:
                return theme.colors.BUTTON_SECUNDARY;
        }
    };

    return (
        <CardSimples
            key={index.toString()}
            styleCardContainer={styles.cardStyle}>
            <TouchableOpacity
                key={index.toString()}
                onPress={() =>
                    navigation.navigate('ExameDetalhes', {
                        exames: item,
                        filter: filter,
                    })
                }
                style={styles.containerCard}>
                <View style={styles.box1Card}>
                    <ExameSvg
                        width={RFPercentage(5)}
                        height={RFPercentage(5)}
                        fill={theme.colors.FILL_ICONE}
                        fillSecondary={fillSelected(item.status)}
                    />
                </View>
                <View style={styles.box2Card}>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Paciente: </Text>
                        <Text
                            style={
                                styles.text
                            }>{`${item.nm_patient.toUpperCase()}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Medico: </Text>
                        <Text
                            style={
                                styles.text
                            }>{`${item.nm_doctor_resp.toUpperCase()}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Data do envio: </Text>
                        <Text style={styles.text}>
                            {moment(item.dt_send).format('DD-MM-YYYY')}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </CardSimples>
    );
};

export default CardExames;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        containerCard: {
            flex: 1,
            flexDirection: 'row',
            paddingVertical: 10,
            justifyContent: 'space-around',
        },
        box1Card: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 3,
        },
        box2Card: {
            flex: 8,
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 3,
        },
        item: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        textLabel: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlignVertical: 'center',
        },
        text: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlignVertical: 'center',
        },
        cardStyle: {
            flex: 1,
            padding: 10,
        },
    });
    return styles;
};
