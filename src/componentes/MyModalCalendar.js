import React,{ useRef, useEffect, useState } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import BackImg from '../assets/svg/back.svg';
import NextImg from '../assets/svg/next.svg';
import moment from 'moment';

export default function MyModalCaledar({ activeModal, setActiveModal, action }) {

    const [childrenIds, setChildrenIds] = useState();
    const _view = useRef(null);

    const cancel = () => {
        setActiveModal(false);
    }

    const ok = (item) => {
        action(item);
        setActiveModal(false);
    }

    LocaleConfig.defaultLocale = 'br';

    LocaleConfig.locales['br'] = {
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dec.'],
        dayNames: ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
        dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        today: 'Hoje\'Hj'
    };

    const getIdRef = () => {
        const { current } = _view;
        if (current) {
            setChildrenIds(current._nativeTag);
        }
    }

    useEffect(() => {
        getIdRef();
    }, [activeModal])

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                backdropOpacity={0.3}
                visible={activeModal}
            >
                <View style={styles.centeredView}
                    ref={_view}
                    onStartShouldSetResponder={evt => {
                        evt.persist();
                        if (evt.target._nativeTag === childrenIds) {
                            setActiveModal(false)
                        }
                    }}
                >
                    <View style={styles.modalView}>
                        <Calendar
                            style={styles.calendario}
                            theme={{
                                backgroundColor: '#08948A',
                                calendarBackground: 'transparent',
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
                                textDayFontSize: 18,
                                textMonthFontSize: 18,
                                textDayHeaderFontSize: 18,
                                
                            }}
                            current={moment().format('YYYY-MM-DD')}
                            //minDate={new Date().toDateString()}
                            onDayPress={(day) => ok(day.dateString)}
                            enableSwipeMonths={true}
                            renderArrow={
                                (item) =>
                                    item === "left" &&
                                    <View style={styles.CalendarBtn}>
                                        <BackImg fill={'#748080'} width={15} height={15} />
                                    </View>
                                    ||
                                    item === "right" &&
                                    <View style={styles.CalendarBtn}>
                                        <NextImg fill={'#748080'} width={15} height={15} />
                                    </View>
                            }
                        //enableSwipeMonths={true}
                        //disabledByDefault={true}
                        //disableAllTouchEventsForDisabledDays={true}
                        //markedDates={datas}
                        />
                        <View style={styles.boxBtn}>
                            <TouchableOpacity style={styles.btn} onPress={() => cancel()}>
                                <Text style={styles.text}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#847e7e',
        opacity: 0.9
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        width: '80%',
    },
    calendario: {
        height: 375,
        width: "100%",
        borderRadius: 10,
    },
    text: {
        color: '#08948A',
        fontSize: 18,
        fontWeight: 'bold'
    },
    btn: {
        margin: 5,
        marginHorizontal: 10,
        padding: 5,
    }, boxBtn: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    CalendarBtn:{
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 30,
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
        })
    }
})
