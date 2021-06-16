import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import MyModalHorarios from '../componentes/MyModalHorarios';
import Api from '../services/api';
import AuthContext from '../contexts/auth';
import moment from 'moment';
import AgendaConsultaContext from '../contexts/agendaConsultas';
import Loading from '../componentes/Loading';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function Calendars({ actionScroll }) {

    const { stateConsultas, dispathConsultas } = useContext(AgendaConsultaContext);

    const { Agenda, Medico, Unidade, ListDatas } = stateConsultas;

    const { stateAuth } = useContext(AuthContext);
    const [datasHorarios, setDatasHorarios] = useState(null);
    const [datas, setDatas] = useState(null);
    const [horarios, setHorarios] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [mesInitial, setMesInitial] = useState([]);

    const getDatasDisponiveis = () => {
        setModalLoading(true);
        Api.get(`AgendaConsultas/filtroDataConsulta/${Medico.nM_GUERRA},${Unidade.cD_ESTABELECIMENTO}?dataInicio=${moment().format('YYYY-MM-DD')}&dataFinal=${moment().add(12, 'months').format('YYYY-MM-DD')}&descrEspecialidade=${Medico.dS_ESPECIALIDADE}`).then(response => {
            const { result } = response.data;
            if (result) {
                dispathConsultas({ type: 'setListDatas', listDatas: result });
                setCalendario(result);
            }
            setModalLoading(false);
        }).catch(erro => {
            setModalLoading(false);
        });
    }

    const setCalendario = (datas) => {
        let mark = {};
        datas.map(item => {
            mark[moment(item.dT_AGENDA).format('YYYY-MM-DD')] = { disabled: false, color: '#08948A', textColor: '#fff', selected: true, selectedColor: '#08948A' };
            //_datasHorarios.push(moment(item.dT_AGENDA).format());
        });
        setDatas(mark);
        setDatasHorarios(datas);
    }

    LocaleConfig.defaultLocale = 'br';

    LocaleConfig.locales['br'] = {
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dec.'],
        dayNames: ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
        dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        today: 'Hoje\'Hj'
    };

    const addData = day => {

        let dataselected = moment(day.dateString).format('YYYY-MM-DD');
        let horarios = [];

        datasHorarios.map(item => {

            if (dataselected === moment(item.dT_AGENDA).format('YYYY-MM-DD')) {
                horarios.push(item)
            }

        });

        dispathConsultas({ type: 'setData', data: dataselected })
        setHorarios(horarios);
        setModalActive(true);
    }

    const addAgenda = item => {
        dispathConsultas({ type: 'setAgenda', agenda: item });
        setModalActive(!modalActive);
        actionScroll();
    }

    const AddMesInitial = () => {
        let inicial = [];
        for (const key in datas) {
            inicial.push(key);
        }
        if (inicial.length > 0) {
            setMesInitial(inicial[0]);
        }
    }

    useEffect(() => {
        if(ListDatas){
            setCalendario(ListDatas);
        }else{
            getDatasDisponiveis();
        }
    }, [Medico])

    useEffect(() => {
        AddMesInitial();
    }, [datas])

    return (
        <View style={styles.container}>
            {mesInitial.length > 0 &&
                <>
                    <Calendar
                        style={styles.calendario}
                        theme={{
                            backgroundColor: '#08948A',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#333B3B',
                            textSectionTitleDisabledColor: '#d9e1e8',
                            selectedDayBackgroundColor: 'black',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#00adf5',
                            dayTextColor: '#08948A',
                            textDisabledColor: '#d9e1e8',
                            dotColor: '#00adf5',
                            selectedDotColor: '#ffffff',
                            arrowColor: '#08948A',
                            disabledArrowColor: '#d9e1e8',
                            monthTextColor: '#08948A',
                            indicatorColor: 'blue',
                            textDayFontWeight: '300',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: RFValue(18, 680),
                            textMonthFontSize: RFValue(18, 680),
                            textDayHeaderFontSize: RFValue(18, 680),
                            "stylesheet.calendar.header": {
                                week: {
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                },
                            },
                            "stylesheet.agenda.main": {
                                month: {
                                    backgroundColor: 'red'
                                }
                            }
                        }}
                        current={moment(datas[0]).format('YYYY-MM-DD')}
                        minDate={new Date().toDateString()}
                        onDayPress={(day) => addData(day)}
                        enableSwipeMonths={true}
                        disabledByDefault={true}
                        disableAllTouchEventsForDisabledDays={true}
                        markedDates={datas}
                    />
                    {Agenda &&
                        <View style={styles.labelDataHora}>
                            <Text style={styles.textDataHora}>Data: {moment(Agenda.dT_AGENDA).format('DD-MM-YYYY')} - Hora: {moment(Agenda.dT_AGENDA).format('HH:mm')}</Text>
                        </View>}

                    <MyModalHorarios modalActive={modalActive} setModalActive={setModalActive} Horarios={horarios} addAgenda={addAgenda} />
                </>
            }
            {
                datasHorarios !== null &&
                datasHorarios.length === 0 &&
                <View style={styles.Mensagem}>
                    <Text style={styles.textMsn}>Agenda do Médico Selecionado não está disponível !</Text>
                </View>
            }
            <Loading activeModal={modalLoading} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Mensagem: {
        
    },
    textMsn: {
        color: 'red',
        textAlign: 'center'
    },
    calendario: {
        borderWidth: 1,
        borderColor: '#fff',
        height: 375,
        width: "100%",
        borderRadius: 10,
        marginTop: 10,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            }
        }),
    },
    labelDataHora: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textDataHora: {
        color: '#08948A',
        fontSize: RFValue(18, 680),
    }
})
