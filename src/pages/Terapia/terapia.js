import React, { useContext, useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

import styles from './style';
import TouchableShowHideTerapia from '../../componentes/TouchableShowHideTerapia';
import Api from '../../services/api';
import AuthContext from '../../contexts/auth';
import Loading from '../../componentes/Loading';
import MyModalFiltroData from '../../componentes/MyModalFiltroData';
import moment from 'moment';
import CalenderImg from '../../assets/svg/calendar.svg';

export default function terapia() {

    const { stateAuth } = useContext(AuthContext);
    const [consultasTerapia, setConsultasTerapia] = useState([]);
    const [activeModal, setActiveModal] = useState(false);
    const [activeModalFilter, setActiveModalFilter] = useState(false);
    const [dataInicio, setDataInicio] = useState(null);
    const [dataFim, setDataFim] = useState(null);
    const [tipoDate, setTipoDate] = useState();

    const filtroConsulta = item => {
        switch (item) {
            case 'data':
                return `&dataInicio=${dataInicio}&dataFinal=${dataFim}`
                break;
            case "quinzeDias":
                return "?quinzeDias=true"
                break;
            case "trintaDias":
                return "?trintaDias=true"
                break;
            case "Data_inicio_fim":
                setActiveModalFilter(false);
                return `&dataInicio=${dataInicio}&dataFinal=${dataFim}`
                break;
            default:
                return ""
                break;
        }
    }

    const getConsultasTerapia = (filtro) => {
        setActiveModal(true);
        if (stateAuth.usertasy) {
            const { nR_CPF } = stateAuth.usertasy;
            Api.get(`AgendaQuimio/filterPacientePorPeriodo?cpfPaciente=${'38865440368'}${filtroConsulta(filtro)}`, {
                headers: {
                    'Authorization': `Bearer ${stateAuth.token}`
                }
            }).then(response => {
                const { result } = response.data;
                if (result) {
                    setConsultasTerapia(result);
                }
                setActiveModal(false);
            }).catch(error => {
                setActiveModal(false);
                console.log(error);
            });
        }
    }

    const selectedCalender = (data) => {
        setTipoDate(data);
        setActiveModalCalender(true);
    }

    const selectedDay = (day) => {
        if (tipoDate === 'dataInicio') {
            setDataInicio(moment(day).format('YYYY-MM-DD'))
        }
        if (tipoDate === 'dataFim') {
            setDataFim(moment(day).format('YYYY-MM-DD'))
        }
    }

    useEffect(() => {
        getConsultasTerapia();
    }, [])

    const renderItem = ({ item }) => {
        return (
            <TouchableShowHideTerapia item={item} /* option1={selectedItem} */ />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <Text style={styles.textLabel}>Minhas Terapias</Text>
                <View style={styles.box1_item1}>
                    <Text style={styles.textNumero}>{consultasTerapia && consultasTerapia.length}</Text>
                    <Text style={styles.text}>Total de consultas</Text>
                </View>
            </View>
            <SafeAreaView style={styles.box2}>
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
                        <TouchableOpacity style={styles.btnConsultas} onPress={() => setActiveModalFilter(true)}>
                            <Text style={styles.text}>Outros Períodos</Text>
                            <CalenderImg fill={'#748080'} width={20} height={20} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnConsultas}>
                            <Text style={styles.text}>selecione médico</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <SafeAreaView style={styles.box2_item2}>
                    <FlatList
                        data={consultasTerapia}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </SafeAreaView>
            </SafeAreaView>
            <Loading activeModal={activeModal} />
            <MyModalFiltroData
                activeModal={activeModalFilter}
                setActiveModal={setActiveModalFilter}
                setDataInicio={setDataInicio}
                setDataFim={setDataFim}
                dataInicio={dataInicio}
                dataFim={dataFim}
                disabled={!dataInicio || !dataFim ? true : false}
                action={getConsultasTerapia}
            />
        </View>
    )
}


