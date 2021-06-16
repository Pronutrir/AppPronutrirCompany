import React, { useReducer, createContext, useEffect, useContext } from 'react';

import { initialState, UserReducer } from '../reducers/AgendaCosultasReduce';
import { initialStateConvenios, UserReducerConvenios } from '../reducers/AddConveniosReducer';
import AuthContext from '../contexts/auth';
import ErrorContext from '../contexts/errorNotification'; 
import Api from '../services/api';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const AgendaConsultaContext = createContext();

export const AgendaConsultasProvider = ({ children }) => {

    const { addError } = useContext(ErrorContext);
    const { stateAuth } = useContext(AuthContext);
    const { usertasy, usuario } = stateAuth;

    const [stateConsultas, dispathConsultas] = useReducer(UserReducer, initialState);
    const [stateConvenios, dispathConvenios] = useReducer(UserReducerConvenios, initialStateConvenios);
    const ultimoDiaSemana = moment().day(6).format('YYYY-MM-DD')
    const diaAtual = moment().format('YYYY-MM-DD')

    const convenios = async () => {
        if (usertasy.nR_CPF) {
            Api.get(`ConveniosPacientes/filtroConvenioIndividualPaciente?cpfPaciente=${usertasy.nR_CPF}`).then(response => {
                const { result } = response.data;
                result.push({
                    cD_CATEGORIA: null,
                    cD_CONVENIO: 1,
                    cD_PESSOA_FISICA: null,
                    cD_PESSOA_TITULAR: null,
                    cD_PLANO_CONVENIO: '01',
                    cD_USUARIO_CONVENIO: null,
                    dS_CATEGORIA: null,
                    dS_CONVENIO: 'PARTICULAR',
                    dS_PLANO: 'PARTICULAR',
                    dT_ATUALIZACAO: null,
                    nM_PESSOA_FISICA: null,
                    nM_USUARIO: null,
                    nR_SEQUENCIA: 1
                });
                if (result) {
                    dispathConvenios({ type: 'setConvenios', conveniosTasy: result })
                }
            }).catch(error => {
                addError(`Não foi possivel acessar os convênios tente mais tarde! - ${error.message}`);
            })
        }
    }

    // adiciona as notificacoes no firestone
    const SetNotifyFirabase = async (token, dados) => {

        const usersRef = firestore().collection('notificacoes');

        dados.forEach(async element => {

            const notificationExist = await usersRef.where('nR_SEQUENCIA', '==', element.nR_SEQUENCIA).get();

            if (notificationExist.empty) {
                const result = usersRef.add({
                    token: token,
                    cD_CONVENIO: element.cD_CONVENIO,
                    cD_ESPECIALIDADE: element.cD_ESPECIALIDADE,
                    cD_ESTABELECIMENTO: element.cD_ESTABELECIMENTO,
                    cD_PESSOA_FISICA: element.cD_PESSOA_FISICA,
                    cD_PLANO: element.cD_PLANO,
                    cD_TURNO: element.cD_TURNO,
                    dS_CONVENIO: element.dS_CONVENIO,
                    dS_ESPECIALIDADE: element.dS_ESPECIALIDADE,
                    dS_PLANO: element.dS_PLANO,
                    dT_AGENDA: element.dT_AGENDA,
                    dT_ATUALIZACAO: element.dT_ATUALIZACAO,
                    endereco: element.endereco,
                    iE_CLASSIF_AGENDA: element.iE_CLASSIF_AGENDA,
                    iE_STATUS_AGENDA: element.iE_STATUS_AGENDA,
                    nM_GUERRA: element.nM_GUERRA,
                    nM_PACIENTE: element.nM_PACIENTE,
                    nM_PESSOA_FISICA: element.nM_PESSOA_FISICA,
                    nM_USUARIO: element.nM_USUARIO,
                    nR_MINUTO_DURACAO: element.nR_MINUTO_DURACAO,
                    nR_SEQUENCIA: element.nR_SEQUENCIA,
                    nR_TELEFONE: element.nR_TELEFONE,
                    nR_TELEFONE_CELULAR: element.nR_TELEFONE
                })
                return true;
            } else {
                return false;
            }
        });

    }

    // realiza a busca pelas notificacoes no firestone
    const HistoryNotifyFirabase = async () => {

        const notifyRef = firestore().collection('notificacoes');

        notifyRef.where('token', '==', usuario.uid).onSnapshot(querySnapshot => {
            var notification = []
            querySnapshot.forEach(item => {
                notification.push({ ...item.data(), refDoc: item.ref.id });
            })
            dispathConsultas({ type: 'setNotifications', Notification: notification })
        });
    }

    // deleta a notificacao no firestone
    /*  const deleteNotifyFirabase = async (docRef) => {
         return await firestore().collection('notificacoes').doc(docRef).delete();
     } */

    // filtra as agendas pela data e status
    const filterConsultas = (element, index, self) => {
        return moment(element.dT_AGENDA).format('YYYY-MM-DD') >= diaAtual && moment(element.dT_AGENDA).format('YYYY-MM-DD') <= ultimoDiaSemana && (element.iE_STATUS_AGENDA == 'N')
    }

    // consulta a proxima consulta do paciente
    const NotificationConsulta = async () => {
        if (usertasy.nR_CPF) {
            const result = await Api.get(`AgendaConsultas/filtroAgendamentosPacientes/${usertasy.nR_CPF}`).then(response => {
                const { result } = response.data;
                if (result) {
                    const order_result = result.sort(function (a, b) {
                        return a.dT_AGENDA < b.dT_AGENDA ? -1 : a.dT_AGENDA > b.dT_AGENDA ? 1 : 0
                    })

                    let consultaMaisProxima = order_result.filter(filterConsultas)

                    // return consultaMaisProxima.find((element, index) => index === 0);
                    return consultaMaisProxima;
                }
            }).catch(error => {
                addError(`Não foi possivel acessar os agendamentos tente mais tarde! - ${error.message}`);
            });

            if(result.length > 0){
                SetNotifyFirabase(usuario.uid, result);
            }
        }
    }

    // deleta a notificacao no firestone
    const deleteNotifyFirabase = async (docRef) => {
        return await firestore().collection('notificacoes').doc(docRef).delete();
    }

    useEffect(() => {
        convenios();
        NotificationConsulta();
    }, [usertasy])

    return (
        <AgendaConsultaContext.Provider
            value={{
                stateConsultas, dispathConsultas,
                stateConvenios, dispathConvenios,
                convenios,
                HistoryNotifyFirabase,
                SetNotifyFirabase,
                deleteNotifyFirabase
            }}>
            {children}
        </AgendaConsultaContext.Provider>
    )
}

export default AgendaConsultaContext;

