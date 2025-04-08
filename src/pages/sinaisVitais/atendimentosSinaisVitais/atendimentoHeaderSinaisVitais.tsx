import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import HistorySvg from '../../../assets/svg/historico.svg';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import { ThemeContextData } from '../../../contexts/themeContext';
import MenuPopUp from '../../../components/menuPopUp/menuPopUp';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../../routes/routeDashboard';
import { IAgendaPaciente } from '../../../hooks/useAgendaConsultas';

interface PatientHeaderCardProps {
    agenda: IAgendaPaciente;
    gerarAtendimento: boolean;
}

const PatientHeaderCard: React.FC<PatientHeaderCardProps> = ({ agenda, gerarAtendimento }) => {

    const styles = useThemeAwareObject(createStyles);

    const navigation = useNavigation<StackNavigation>();

    const renderInfoItem = (label: string, value?: string) => (
        <View style={styles.infoRow}>
            <Text style={styles.labelText}>{label}: </Text>
            <Text style={styles.valueText} numberOfLines={3} ellipsizeMode="middle">
                {value || '-'}
            </Text>
        </View>
    );

    const redirectTo = (route: string) => {
        switch (route) {
            case 'Sinais vitais':
                navigation.navigate('UpdateSinaisVitais', { AgendaPaciente: agenda, GeraAtendimento: gerarAtendimento, Origin: 'Atendimentos' });
                break;
            case 'Histórico':
                navigation.navigate('EndSinaisVitais', { cdPaciente: agenda.cD_PESSOA_FISICA, Tipo: 'Todos' });
                break;
            case 'Acompanhantes':
                navigation.navigate('AcompanhateSinaisVitais', { PessoaFisica: { nM_PESSOA_FISICA: agenda.nM_PESSOA_FISICA, cD_PESSOA_FISICA: agenda.cD_PESSOA_FISICA, dT_NASCIMENTO: agenda.dT_NASCIMENTO } });
                break;
            default:
                break;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardContent}>
                <View
                    style={styles.iconContainer}
                >
                    <HistorySvg
                        width={RFPercentage(5)}
                        height={RFPercentage(5)}
                    />
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>
                            Dados do Paciente
                        </Text>
                    </View>

                    <View style={styles.detailsContainer}>
                        {renderInfoItem('Paciente', agenda.nM_PESSOA_FISICA.toUpperCase())}
                        {renderInfoItem('Data Nascimento', agenda ? moment(agenda.dT_NASCIMENTO).format('DD/MM/YYYY') : undefined)}
                    </View>
                </View>
            </View>
            <MenuPopUp
                btnLabels={['Sinais vitais', 'Histórico', 'Acompanhantes']}
                containerStyle={{
                    position: 'absolute',
                    right: 0,
                    alignSelf: 'center',
                }}
                btnVisible={true}
                onpress={label => redirectTo(label)}
            />
        </View>
    );
};

export default PatientHeaderCard;

const createStyles = (theme: ThemeContextData) => {
    return StyleSheet.create({
        container: {
            backgroundColor: theme.colors.BACKGROUND_1,
            marginTop: 20,
            marginBottom: 20,
            borderRadius: 12,
            elevation: 4,
            zIndex: 2,
            borderWidth: 1,
            borderColor: theme.colors.GREENLIGHT,
            width: '95%',
            alignSelf: 'center',
            shadowColor: theme.colors.DARKLIGHT,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
        },
        cardContent: {
            flexDirection: 'row',
            padding: 16,
        },
        iconContainer: {
            marginRight: 16,
            justifyContent: 'center',
            alignItems: 'center',
            width: RFPercentage(6.5),
            height: RFPercentage(6.5),
            borderRadius: RFPercentage(3.25),
            backgroundColor: theme.colors.BACKGROUND_2,
            borderWidth: 1,
            borderColor: theme.colors.GREENLIGHT,
        },
        infoContainer: {
            flex: 1,
            justifyContent: 'center',
        },
        headerContainer: {
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.GREENLIGHT,
            paddingBottom: 8,
        },
        headerTitle: {
            fontFamily: theme.typography.FONTES.Bold,
            fontSize: theme.typography.SIZE.fontysize16,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.BROWNDARK,
        },
        detailsContainer: {
            marginTop: 4,
        },
        infoRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: 6,
        },
        labelText: {
            fontFamily: theme.typography.FONTES.Bold,
            fontSize: theme.typography.SIZE.fontysize14,
            color: theme.colors.TEXT_PRIMARY,
        },
        valueText: {
            fontFamily: theme.typography.FONTES.Regular,
            fontSize: theme.typography.SIZE.fontysize14,
            color: theme.colors.TEXT_SECONDARY,
            flex: 1,
        }
    });
};