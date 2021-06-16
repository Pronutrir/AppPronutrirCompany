import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

import moment from 'moment';
import 'moment/locale/pt-br';
import { RFValue } from "react-native-responsive-fontsize";
import MaisPontosSvg from '../assets/svg/maisPontos.svg';
import { useNavigation } from '@react-navigation/native';

export default function MyModalCalendar({ scrollToIndex, selectedHorizontal, medicamentos }) {

    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(moment());
    const [monthWeek, setMonthWeek] = useState(moment().format('ddd, D [de] MMMM'));

    const refCanlendar = useRef();

    const DateWhiteList = [{
        start: moment(),
        end: moment().add(3, 'days')
    }]

    const datesBlackList = [moment()]

    const markedDatesFunc = date => {

        var { Medicamentos } = medicamentos;
        var dia_semana = moment(date).format('dddd').toLocaleLowerCase();

        function diasSemana(params) {
            var dia = params.dS_INTERVALO_ITEM && params.dS_INTERVALO_ITEM.toLocaleLowerCase();
            if(params.dS_INTERVALO_ITEM && dia.includes(dia_semana) || !dia){
                return true;
            }else{
                return false;
            }
        }

        function verificaMedicamento(params) {
            var data = moment(date).format('YYYY-MM-DD');
            var inicio = moment(params.dT_INICIO).format('YYYY-MM-DD');
            var fim = params.dT_FIM ? moment(params.dT_FIM).format('YYYY-MM-DD') : moment().add(1, 'M').format('YYYY-MM-DD');
            if(data >= inicio && data <= fim && diasSemana(params)){
                return true;
            }else{
                return false;
            }
        }

        // Dot
        if ( Array.isArray(Medicamentos)) { 
            if(Medicamentos.some(verificaMedicamento)){
                return {
                    dots: [{
                        color: "#0de9d9"
                    }]
                };
            }
        }
        return {};
    }

    const selectedDay = date => {
        scrollToIndex(date);
        setSelectedDate(date);
        headerChanger(date);
    }

    const dateNow = () => {
        setSelectedDate(moment());
        headerChanger(moment());
        refCanlendar.current.setSelectedDate(moment());
    }

    const setCalendar = (date) => {
        refCanlendar.current.setSelectedDate(date);
    }

    const headerChanger = (date) => {
        const now = moment().format('ddd, D [de] MMMM');
        const selected = moment(date).format('ddd, D [de] MMMM');
        const tomorrow = moment().add(1, 'day').format('ddd, D [de] MMMM');
        const yesterday = moment().subtract(1, 'day').format('ddd, D [de] MMMM');

        let headerLabel = selected;

        if (selected == now) {
            headerLabel = moment(date).format('[Hoje], D [de] MMMM');
        }

        if (selected == tomorrow) {
            headerLabel = moment(date).format('[Amanhã], D [de] MMMM');
        }

        if (selected == yesterday) {
            headerLabel = moment(date).format('[Ontem], D [de] MMMM');
        }

        setMonthWeek(headerLabel);
    }

    const onWeekChanged = (date) => {
        var _date = moment(date).add(3, 'days');
        scrollToIndex(_date);
        setSelectedDate(_date);
        headerChanger(_date);
    }

    useEffect(() => {
        headerChanger();
    }, [])

    useEffect(() => {
        if (selectedHorizontal) {
            setCalendar(selectedHorizontal)
        }
    }, [selectedHorizontal])

    return (
        <View style={styles.container}>
            <CalendarStrip
                ref={refCanlendar}
                useIsoWeekday={true}
                headerText={monthWeek}
                style={styles.calendarStrip}
                dateNameStyle={styles.dataName}
                dateNumberStyle={styles.dataNumber}
                calendarHeaderStyle={styles.calenderHeader}
                calendarAnimation={{ type: 'parallel', duration: 10 }}
                daySelectionAnimation={{ type: 'border', duration: 10, borderWidth: 2, borderHighlightColor: '#05635c' }}
                calendarColor={'#08948A'}
                scrollable={true}
                scrollerPaging={true}
                iconContainer={{ flex: 0.1 }}
                selectedDate={selectedDate}
                onDateSelected={date => selectedDay(date)}
                onWeekScrollEnd={date => onWeekChanged(date)}
                calendarHeaderPosition={'below'}
                highlightDateNameStyle={{ color: 'white'}}
                highlightDateNumberStyle={{ color: 'white' }}
                highlightDateContainerStyle={{ backgroundColor: '#05635c'}}
                scrollToOnSetSelectedDate={true}
                minDate={moment().subtract(1, 'M')}
                maxDate={moment().add(1, 'M')}
                markedDates={markedDatesFunc}
            />
            {
                moment(selectedDate).format('MM-DD-YYYY') < moment().format('MM-DD-YYYY') &&
                <TouchableOpacity style={styles.btn1} onPress={() => dateNow()}>
                    <Text style={styles.text}>Hoje {'>>'}</Text>
                </TouchableOpacity>
            }
            {
                moment(selectedDate).format('MM-DD-YYYY') > moment().format('MM-DD-YYYY') &&
                <TouchableOpacity style={styles.btn2} onPress={() => dateNow()}>
                    <Text style={styles.text}>{'<<'} Hoje</Text>
                </TouchableOpacity>
            }
            {
                <TouchableOpacity style={styles.btn3} onPress={() => navigation.navigate('MedicamentosAtivos')}>
                    <MaisPontosSvg fill={'#fff'} width={50} height={35} />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    calendarStrip: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 10
    },
    dataName: {
        color: '#fff',
        fontSize: RFValue(12, 680)
    },
    dataNumber: {
        color: '#fff',
        fontSize: RFValue(12, 680)
    },
    calenderHeader: {
        color: '#fff',
        fontSize: RFValue(14, 680)
    },
    btn1: {
        position: 'absolute',
        alignSelf: 'flex-start',
        padding: 15,
        bottom: 0
    },
    btn2: {
        position: 'absolute',
        alignSelf: 'flex-end',
        padding: 15,
        bottom: 0
    },
    btn3: {
        width: 50,
        height: 30,
        position: 'absolute',
        alignSelf: 'flex-end',
        top: -5,
    },
    text: {
        flex: 1,
        fontSize: RFValue(16, 680),
        color: '#033f3b',
        fontWeight: 'bold'
    }
})
