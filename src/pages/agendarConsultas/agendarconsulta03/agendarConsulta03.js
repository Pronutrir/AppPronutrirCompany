import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

import CardConsulta from '../../../componentes/CardConsulta';
import MyModalConfirmation from '../../../componentes/MyModalConfirmation';
import AgendaConsultaContext from '../../../contexts/agendaConsultas';
import Loading from '../../../componentes/Loading';
import Api from '../../../services/api';
import AuthContext from '../../../contexts/auth';
import ErrorContext from '../../../contexts/errorNotification';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function agendarConsulta03() {

    const { stateAuth } = useContext(AuthContext);
    const { addError } = useContext(ErrorContext);
    const { stateConsultas, dispathConsultas } = useContext(AgendaConsultaContext);

    const navigation = useNavigation();

    const [activeModal, setActiveModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const agendamento = () => {
        setLoading(true);
        Api.put(`AgendaConsultas/${stateConsultas.Agenda.nR_SEQUENCIA}`, {
            nR_SEQUENCIA: stateConsultas.Agenda.nR_SEQUENCIA,
            cD_AGENDA: stateConsultas.Agenda.cD_AGENDA,
            cD_PESSOA_FISICA: stateAuth.usertasy.cD_PESSOA_FISICA,
            nM_PACIENTE: stateAuth.usertasy.nM_PESSOA_FISICA,
            dT_NASCIMENTO_PAC: stateAuth.usertasy.dT_NASCIMENTO,
            nR_TELEFONE: stateAuth.usertasy.nR_TELEFONE_CELULAR,
            dT_AGENDA: stateConsultas.Agenda.dT_AGENDA,
            nR_MINUTO_DURACAO: stateConsultas.Agenda.nR_MINUTO_DURACAO,
            iE_STATUS_AGENDA: 'N',
            iE_CLASSIF_AGENDA: 'N',
            dT_ATUALIZACAO: moment().format(),
            nM_USUARIO: "AppMobile",
            cD_TURNO: stateConsultas.Agenda.cD_TURNO,
            cD_CONVENIO: stateConsultas.Convenio.cD_CONVENIO,
            cD_PLANO: stateConsultas.Convenio.cD_PLANO_CONVENIO,
            cD_CATEGORIA: stateConsultas.Convenio.cD_CATEGORIA
        }).then(response => {
            const { result } = response.data;
            if (result) {
                navigation.navigate('AgendarConsultas04', {IdConsulta: result.nR_SEQUENCIA, Unidade: stateConsultas.Unidade, ValorConsulta: stateConsultas.ValorConsulta})
            }
            setLoading(false);
        }).catch(error => {
            addError(`Não foi possivel realizar o agendamento tente mais tarde - ${error.message}`);
            setLoading(false);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <Text style={styles.label}>Resumo da consulta</Text>
            </View>
            <View style={styles.box2}>
                <View style={styles.box2_item1}>
                    <Text style={styles.options1Text}>3</Text>
                </View>
                {stateConsultas &&
                    <ScrollView style={styles.box2_item2}>
                        {stateConsultas.Especialidade != undefined &&
                            <CardConsulta dados={stateConsultas} />
                        }
                        <TouchableOpacity style={styles.btnAgendar} onPress={() => setActiveModal(true)}>
                            <Text style={styles.TextAgendar}>Realizar Agendamento</Text>
                        </TouchableOpacity>
                    </ScrollView>
                }
            </View>
            <Loading activeModal={loading} />
            <MyModalConfirmation activeModal={activeModal} setActiveModal={setActiveModal} action={agendamento} label={"Confirmar Agendamento ?"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    box1: {
        flexDirection: 'row',
        marginBottom: 25,
    },
    box2: {
        flex: 1,
        width: '85%',
        borderLeftWidth: 1,
        borderLeftColor: '#C1C9C9'
    },
    box2_item1: {
        flexDirection: 'row',
    },
    box2_item1: {
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width / 10,
        height: Dimensions.get('screen').width / 10,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios:{
                shadowOffset:{
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android:{
                elevation: 3,
            }
        }),
        marginLeft: -Dimensions.get('window').width / 20,
        marginTop: -Dimensions.get('window').width / 13,
    },
    options1Text: {
        fontSize: RFValue(30, 680),
        color: '#7C9292'
    },
    label: {
        color: '#7C9292',
        fontSize: RFValue(18, 680),
        fontWeight: 'bold'
    },
    btnAgendar: {
        width: '80%',
        height: (Dimensions.get('window').height / 15),
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios:{
                shadowOffset:{
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android:{
                elevation: 3,
            }
        }),
        marginBottom: 10
    },
    TextAgendar: {
        color: '#08948A',
        fontWeight: 'bold',
        fontSize: RFValue(16, 680)
    }

})
