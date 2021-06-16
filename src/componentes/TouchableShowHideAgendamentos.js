import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    UIManager,
    Image,
    LayoutAnimation,
    Pressable
} from 'react-native';

import AgendaMedica from '../assets/svg/consulta-medica.svg';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ConversorMedicamento } from '../services/conversorUnidadeMedicamento';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MyModalCaledar from '../componentes/MyModalCalendar';
import RadioButton from './RadioButtonPerson';
import MyModalDias from './MyModalDias';
import MyModalDiasSemana from './MyModalDiasSemana';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TouchableShowHideAgendamentos({ selectedDuracao, setSelectedDuracao, setSelectedDias, editable }) {

    const [expanded, setExpanded] = useState(true);
    const [monthWeek, setMonthWeek] = useState(moment().format(moment().format()));
    const [activeCalendar, setActiveCalendar] = useState(false);
    const [activeModalDias, setActiveModalDias] = useState(false);
    const [activeModalDiasSemana, setActiveModalDiasSemana] = useState(false);
    const [flagDuracao, setFlagDuracao] = useState(true);
    const [flagDias, setFlagDias] = useState(true);

    const headerChanger = (date) => {
        const now = moment().format('dddd, D [de] MMMM');
        const selected = moment(date).format('dddd, D [de] MMMM');
        const tomorrow = moment().add(1, 'day').format('dddd, D [de] MMMM');
        const yesterday = moment().subtract(1, 'day').format('dddd, D [de] MMMM');

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
        setSelectedDuracao({ ...selectedDuracao, data_initial: moment(date).format() });
    }

    const optionsDurations = [
        { key: 1, text: 'Tratamento em andamento' },
        { key: 2, text: 'Numero de dias' }
    ]

    const optionsDias = [
        { key: 1, text: 'Todos os dias' },
        { key: 2, text: 'Dias específicos' },
    ]

    const AgendamentoDuracao = (item) => {
        if (item.key === 2) {
            setActiveModalDias(true);
            setSelectedDuracao({ ...selectedDuracao, duracao: item });
        }else{
            setSelectedDuracao({ ...selectedDuracao, duracao: item, numero_Dias: '' })
        }
    }

    const AgendamentoDias = (item) => {
        if (item.key === 2) {
            setActiveModalDiasSemana(true);
            setSelectedDias({ dias: item });
        }else{
            setSelectedDuracao({ ...selectedDuracao, dias: item, semana_dias: [] })
        }
        
    }

    const setDias = (item, numeroDias) => {
        if (!item && !selectedDuracao.numero_Dias) {
            setFlagDuracao(!flagDuracao);
        }
        if (item) {
            setSelectedDuracao({ ...selectedDuracao, numero_Dias: numeroDias })
        }
    }

    const setDiasSemana = (status, item) => {
        if (!status && selectedDuracao.semana_dias.length == 0) {
            setFlagDias(!flagDias);
        } 
        if(status) {
            setSelectedDuracao({ ...selectedDuracao, semana_dias: item })
        }
    }

    useEffect(() => {
        if(editable){
            headerChanger(selectedDuracao.data_initial);
        }else{
            headerChanger(monthWeek);
        }
    }, [])

    return (
        <View style={styles.container}>
            <Pressable onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                setExpanded(!expanded);
            }}>
                <View style={styles.button}>
                    <View style={styles.buttonItem1}>
                        <AgendaMedica width={30} height={30} />
                    </View>
                    <View style={styles.buttonItem2}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Label}>Agendamentos</Text>
                        </View>
                    </View>
                    <View style={styles.buttonItem4}>
                        <Image
                            style={styles.arrowImg}
                            source={expanded ?
                                require('../assets/imagens/seta-para-cima.png') :
                                require('../assets/imagens/seta-para-baixo.png')
                            }
                        />
                    </View>
                </View>
            </Pressable>
            {expanded && (
                <View style={styles.boxContainer}>
                    <View style={styles.box1}>
                        <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 10 }} onPress={() => setActiveCalendar(true)}>
                            <Text style={styles.Label}>Data de início: </Text>
                            <Text style={styles.text}>{monthWeek}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box1}>
                        <Text style={styles.Label}>Duração: </Text>
                        <RadioButton 
                            options={optionsDurations} 
                            Width_full={true} 
                            selection={AgendamentoDuracao} 
                            enable={true} 
                            flag={flagDuracao} 
                            editable={editable}
                            indexOption={selectedDuracao.numero_Dias ? 2 : 1}
                        />
                        <Text style={styles.textDias}>
                            {
                                selectedDuracao.numero_Dias && selectedDuracao.numero_Dias
                            }
                        </Text>
                    </View>
                    <View style={styles.box1}>
                        <Text style={styles.Label}>Dias: </Text>
                        <RadioButton 
                            options={optionsDias} 
                            Width_full={true} 
                            selection={AgendamentoDias} 
                            enable={true} 
                            flag={flagDias}
                            editable={editable}
                            indexOption={selectedDuracao.semana_dias ? 2 : 1}
                        />
                    </View>
                </View>
            )}
            <MyModalCaledar activeModal={activeCalendar} setActiveModal={setActiveCalendar} action={headerChanger} />
            <MyModalDias action={setDias} activeModal={activeModalDias} setActiveModal={setActiveModalDias} total_dias={selectedDuracao.numero_Dias} />
            <MyModalDiasSemana
                action={setDiasSemana}
                activeModal={activeModalDiasSemana}
                setActiveModal={setActiveModalDiasSemana}
                diasSelected={selectedDuracao.semana_dias}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 2,
        marginTop: 10,
    },
    button: {
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 3,
                    height: 5
                },
                shadowOpacity: 0.3,
                shadowRadius: 10,
            },
            android: {
                elevation: 3
            }
        }),
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: 7,
        paddingVertical: 10,
        borderLeftColor: '#08948A',
        borderRightColor: '#08948A',
        borderLeftWidth: 3,
        borderRightWidth: 3
    },
    buttonItem1: {
        flex: 1,
        alignItems: 'center'
    },
    buttonItem2: {
        flex: 4,
    },
    buttonItem3: {
        flex: 2.5,
        alignSelf: 'flex-start'
    },
    buttonItem4: {
        flex: 1,
        alignItems: 'center'
    },
    Label: {
        color: '#08948A',
        fontSize: RFValue(16, 680),
        marginTop: 5,
    },
    text: {
        color: '#7C9292',
        fontSize: RFValue(16, 680),
        marginTop: 5
    },
    textDias: {
        alignSelf: 'center',
        marginTop: - 37,
        marginBottom: 20,
        marginLeft: 60,
        color: '#08948A',
        fontSize: RFValue(20, 680),
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxLabel: {
        flexDirection: 'row'
    },
    boxLabelLink: {
        flexDirection: 'column'
    },
    arrowImg: {
        width: 20,
        height: 20
    },
    box: {
        width: '100%',
    },
    box1: {
        width: '100%',
        alignItems: 'flex-start',
        borderBottomWidth: 2,
        borderColor: '#fff'
    },
    boxContainer: {
        backgroundColor: '#E6ECEC',
        marginTop: 5,
        padding: 10,
        marginHorizontal: 2,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
    },
    btns: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});
