import React, { useContext } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    ListRenderItem,
    Text,
    TouchableOpacity,
} from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import SinaisVitaisContext from '../../contexts/sinaisVitaisContext';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { IAlertaPaciente } from '../../reducers/ConsultasReducer';
import CardSimples from '../Cards/CardSimples';

const list: IAlertaPaciente[] = [
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
    {
        nR_SEQUENCIA: 562,
        nM_USUARIO: 'amedina',
        iE_CONFIRMACAO: 'C',
        dT_ATUALIZACAO: '2021-06-08T09:39:01',
        dT_REGISTRO: '2021-06-08T09:38:19',
        cD_PESSOA_FISICA: '9969',
        nR_SEQ_TIPO: 1,
        dS_OBSERVACAO:
            'Paciente refere intolerãncia ao TRAMADOL-vômitos em jato.',
        iE_INTENSIDADE: 'M',
        nR_ATENDIMENTO: 89643,
        dT_ATUALIZACAO_NREC: '2021-06-08T09:39:01',
        nM_USUARIO_NREC: 'amedina',
        dT_LIBERACAO: '2021-06-08T09:39:04',
        nM_USUARIO_LIBERACAO: 'amedina',
        iE_NEGA_ALERGIAS: 'N',
        cD_PERFIL_ATIVO: 1997,
        iE_ALERTA: 'S',
        cD_SETOR_ATENDIMENTO: 75,
        cD_PROFISSIONAL: '134',
        dS_UTC_ATUALIZACAO: '08/06/2021T09:39:04',
        dS_UTC: '08/06/2021T09:38:19',
        iE_LISTA_PROBLEMA: 'N',
        iE_ACAO: 'U',
        dS_TIPO_ALERGIA: 'Medicamento',
    },
];

const ListAlertas: React.FC = () => {
    const {
        stateConsultas: { medicos },
    } = useContext(SinaisVitaisContext);

    const styles = useThemeAwareObject(createStyles);

    const Status = ({ item }: { item: IAlertaPaciente }) => {
        switch (item.iE_CONFIRMACAO) {
            case 'C':
                return (
                    <View style={styles.item}>
                        <Text style={styles.label}>Status:</Text>
                        <Text style={styles.text}>Confirmada</Text>
                    </View>
                );
            case 'S':
                return (
                    <View style={styles.item}>
                        <Text style={styles.label}>Status:</Text>
                        <Text style={styles.text}>Suspeita</Text>
                    </View>
                );
            default:
                return null;
        }
    };

    const Observacao = ({ item }: { item: IAlertaPaciente }) => {
        if (item.dS_OBSERVACAO) {
            return (
                <View style={styles.item}>
                    <Text style={styles.label}>Observação</Text>
                    <Text style={styles.text}>{item.dS_OBSERVACAO}</Text>
                </View>
            );
        } else {
            return null;
        }
    };

    const renderItem: ListRenderItem<IAlertaPaciente> = ({ item }) => (
        <CardSimples key={item.nR_SEQUENCIA} styleCardContainer={styles.card}>
            <TouchableOpacity key={item.nR_SEQUENCIA}>
                <>
                    <Status item={item} />
                    <Observacao item={item} />
                </>
            </TouchableOpacity>
        </CardSimples>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.Titulo}>(Alergias / Reações adversas)</Text>
            <FlatList
                data={list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={{margin: 10}}
            />
        </View>
    );
};

export default ListAlertas;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            marginTop: 20,
            marginHorizontal: 10,
            alignItems: 'center',
        },
        selectTextStyle: {
            color: '#08948A',
            textAlign: 'center',
            fontSize: RFValue(18, 680),
        },
        selectTextStyleActive: {
            color: '#ffff',
            textAlign: 'center',
            fontSize: RFValue(18, 680),
        },
        optionContainerStyle: {
            backgroundColor: '#fff',
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        optionContainerStyleActive: {
            backgroundColor: '#20cbc1',
            paddingVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
        },
        card: {
            padding: RFPercentage(3),
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        Titulo: {
            paddingVertical: 10,
            fontSize: theme.typography.SIZE.fontysize16,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
        },
        item: {
            flexDirection: 'column',
            marginVertical: RFPercentage(0.5),
        },
        label: {
            fontSize: theme.typography.SIZE.fontysize14,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
        },
        text: {
            fontSize: theme.typography.SIZE.fontysize14,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
        },
    });
    return styles;
};
