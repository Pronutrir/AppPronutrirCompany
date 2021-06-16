import React, { useContext, useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

import styles from './style';
import TouchableShowHideConsultas from '../../componentes/TouchableShowHideConsultas';
import Api from '../../services/api';
import AuthContext from '../../contexts/auth';
import ErrorContext from '../../contexts/errorNotification';
import Loading from '../../componentes/Loading';
import MyModalConfirmation from '../../componentes/MyModalConfirmation';
import MyModalFiltroData from '../../componentes/MyModalFiltroData';
import CalendarImg from '../../assets/svg/calendar.svg';
import MyModalSelectorSimples from '../../componentes/MyModalSelectorSimples';
import Notification from '../../componentes/Notification';
import moment from 'moment';

export default function consultasMarcadas({ route }) {

    const size = Dimensions.get('screen').width / 20

    const { addError } = useContext(ErrorContext);
    const { stateAuth } = useContext(AuthContext);
    const [consultas, setConsultas] = useState([]);
    const [activeModal, setActiveModal] = useState(false);
    const [activeConfirm, setActiveConfirm] = useState(false);
    const [activeModalFilter, setActiveModalFilter] = useState(false);
    const [itemSelected, setItemSelected] = useState();
    const [dataInicio, setDataInicio] = useState(null);
    const [dataFim, setDataFim] = useState(null);
    const [medicos, setMedicos] = useState([]);
    const [modalNotification, setModalNotification] = useState({
        active: false,
        message: '',
        type: ''
    });

    const filtroConsulta = (item, item2) => {
        switch (item) {
            case "seteDias":
                return "?seteDias=true"
                break;
            case "quinzeDias":
                return "?quinzeDias=true"
                break;
            case "trintaDias":
                return "?trintaDias=true"
                break;
            case "medico":
                return `?nomeMedico=${item2}`
                break;
            case "Data_inicio_fim":
                setActiveModalFilter(false);
                return `?dataInicio=${dataInicio}&dataFinal=${dataFim}`
                break;
            default:
                return ""
                break;
        }
    }

    const getConsultas = (filtro, item2) => {
        setActiveModal(true);
        if (stateAuth.usertasy) {
            const { nR_CPF } = stateAuth.usertasy;
            Api.get(`AgendaConsultas/filtroAgendamentosPacientes/${nR_CPF}${filtroConsulta(filtro, item2)}`).then(response => {
                const { result } = response.data;
                if (result) {
                    const order_result = result.sort(function (a, b) {
                        return a.iE_STATUS_AGENDA > b.iE_STATUS_AGENDA ? -1 : a.iE_STATUS_AGENDA < b.iE_STATUS_AGENDA ? 1 : 0
                    })
                    setConsultas(order_result);
                }
                result.map(item => {
                    if (moment(item.dT_AGENDA).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD') && item.iE_STATUS_AGENDA == 'N') {
                        atualizarConsulta(item);
                        item.iE_STATUS_AGENDA = 'I'
                    }
                })
                setActiveModal(false);
            }).catch(error => {
                setActiveModal(false);
                addError(`Não foi possivel acessar as consultas! tente mais tarde - ${error.message}`);
            });
        }
    }

    //ATUALIZAR AGENDA DO PACIENTE COMO FALTA
    const atualizarConsulta = async (itemResult) => {
        return Api.put(`AgendaConsultas/${itemResult.nR_SEQUENCIA}`, {
            nR_SEQUENCIA: itemResult.nR_SEQUENCIA,
            cD_AGENDA: itemResult.cD_AGENDA,
            cD_PESSOA_FISICA: itemResult.cD_PESSOA_FISICA,
            nM_PACIENTE: itemResult.nM_PESSOA_FISICA,
            dT_NASCIMENTO_PAC: itemResult.dT_NASCIMENTO,
            nR_TELEFONE: itemResult.nR_TELEFONE_CELULAR,
            dT_AGENDA: itemResult.dT_AGENDA,
            nR_MINUTO_DURACAO: itemResult.nR_MINUTO_DURACAO,
            iE_STATUS_AGENDA: 'I',
            iE_CLASSIF_AGENDA: 'I',
            dT_ATUALIZACAO: moment().format(),
            nM_USUARIO: "AppWeb",
            cD_TURNO: itemResult.cD_TURNO,
            cD_CONVENIO: itemResult.cD_CONVENIO,
            cD_PLANO: itemResult.cD_PLANO
        }).then(response => {
            const { result } = response.data;
            return result;
        }).catch(error => {
            throw error.message
        });
    }

    const getMedicosConsultas = () => {
        if (stateAuth.usertasy) {
            const { nR_CPF } = stateAuth.usertasy;
            Api.get(`AgendaConsultas/ListarMedicosDoPaciente/${nR_CPF}`).then(response => {
                const { result } = response.data;
                if (result) {
                    setMedicos(result);
                }
            }).catch(error => {
                addError(`Não foi possivel acessar as consultas! tente mais tarde - ${error.message}`);
            });
        }
    }

    const cancelarConsultas = () => {

        const item = itemSelected;

        item.iE_STATUS_AGENDA = "C";

        setActiveModal(true);
        if (item) {
            Api.put(`AgendaConsultas/${item.nR_SEQUENCIA}`, item).then(response => {
                getConsultas();
                setModalNotification(prevState => {
                    return { ...prevState, active: true, message: 'Agendamento cancelado!', type: 'success' }
                });
            }).catch(error => {
                setActiveModal(false);
                addError(`Não foi possivel cancelar as consultas! tente mais tarde - ${error.message}`);
            });
        }
    }

    const selectedItem = item => {
        setItemSelected(item);
        setActiveConfirm(true);
    }

    const addMedico = (item) => {
        const { nM_GUERRA } = item;
        getConsultas('medico', nM_GUERRA);
    }

    useEffect(() => {
        if (route.params) {
            const { dias } = route.params;
            getConsultas(dias && dias);
        } else {
            getConsultas();
            getMedicosConsultas();
        }
    }, [stateAuth.usertasy])

    const renderItem = ({ item }) => {
        return (
            <TouchableShowHideConsultas item={item} option1={selectedItem} />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <Text style={styles.textLabel}>Consultas marcadas</Text>
                <View style={styles.box1_item1}>
                    <Text style={styles.textNumero}>{consultas && consultas.length}</Text>
                    <Text style={styles.text}>Total de consultas</Text>
                </View>
            </View>
            <View style={styles.box2}>
                <View style={styles.box2_item1}>
                    <View style={styles.box2_item1_1}>
                        <TouchableOpacity style={styles.btnConsultas} onPress={() => getConsultas("seteDias")}>
                            <Text style={styles.text}>7 dias</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnConsultas} onPress={() => getConsultas("quinzeDias")}>
                            <Text style={styles.text}>15 dias</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnConsultas} onPress={() => getConsultas("trintaDias")}>
                            <Text style={styles.text}>30 dias</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box2_item1_2}>
                        <TouchableOpacity style={styles.btnCaledario} onPress={() => setActiveModalFilter(true)}>
                            <Text style={styles.text}>Outros Períodos</Text>
                            <CalendarImg fill={'#748080'} width={size} height={size} />
                        </TouchableOpacity>
                        <MyModalSelectorSimples
                            textSelect={"Selecione o médico ▼ "}
                            options={medicos}
                            action={addMedico}
                            btn={true}
                            disabled={true}
                            tipo={"medicos"}
                        />
                    </View>
                </View>
                <SafeAreaView style={styles.box2_item2}>
                    <FlatList
                        data={consultas}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.nR_SEQUENCIA.toString()}
                    />
                </SafeAreaView>
            </View>
            <MyModalConfirmation
                activeModal={activeConfirm}
                action={cancelarConsultas}
                setActiveModal={setActiveConfirm}
                label={"Deseja cancelar esta consulta ?"}
            />
            <MyModalFiltroData
                activeModal={activeModalFilter}
                setActiveModal={setActiveModalFilter}
                setDataInicio={setDataInicio}
                setDataFim={setDataFim}
                dataInicio={dataInicio}
                dataFim={dataFim}
                disabled={!dataInicio || !dataFim ? true : false}
                action={getConsultas}
            />
            <Loading activeModal={activeModal} />
            <Notification
                active={modalNotification.active}
                setActive={setModalNotification}
                type={modalNotification.type}
                message={modalNotification.message}
            />
        </View>
    )
}
