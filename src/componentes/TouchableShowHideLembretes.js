import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    UIManager,
    Image,
    LayoutAnimation,
    Pressable,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import LembreteMedi from '../assets/svg/lembreteMedi.svg';
import MyModalSelectorPerson from '../componentes/MyModalSelectorPerson';
import MyModalLembretes from '../componentes/MyModalLembretes';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TouchableShowHideLembretes({ selectedIntervalo, setSelectedIntervalo, editable, idIntervalo }) {

    const [expanded, setExpanded] = useState(true);
    const [modalActive, setModalActive] = useState(false);
    const [date, setDate] = useState({ hora: moment() });

    const gerarHoras = (inter) => {
        var starTime = moment().startOf('date');
        var endTime = moment().endOf('date');

        var horas = [];

        while (starTime < endTime) {
            horas.push(moment(starTime).add(inter, 'h'));
            starTime = moment(starTime).add(inter, 'h');
        }
        return horas;
    }

    const updateHoras = (intervalo, start, end) => {
        var starTime = moment(start).format();
        var endTime = end ? moment(end).format() : moment().endOf('date').format();

        var horas = [];

        horas.push(moment(starTime));

        while (starTime < endTime) {
            horas.push(moment(starTime).add(intervalo, 'h'));
            starTime = moment(starTime).add(intervalo, 'h').format();
        }
        return horas;
    }

    const optionsIntervalo = [
        { id: '1 D', name: '1x VEZ AO DIA', date: [moment().startOf('hour')] },
        { id: '1º D', name: '1X DIA (DOSE ÚNICA)', date: [moment().format()] },
        { id: '1', name: '1 A CADA HORA (1/1H)', date: gerarHoras(1), intervalo: 1 },
        { id: '21', name: '2X - DUAS VEZES AO DIA', date: gerarHoras(12) },
        { id: '2', name: 'A CADA DUAS HORAS (2/2HS)', date: gerarHoras(2), intervalo: 2 },
        { id: '3', name: 'A CADA TRÊS HORAS (3/3H)', date: gerarHoras(3), intervalo: 3 },
        { id: '3x Ref', name: '3X - ÀS REFEIÇÕES', date: gerarHoras(3) },
        { id: '22', name: 'TRÊS VEZES AO DIA', date: gerarHoras(8) },
        { id: '4', name: 'A CADA QUATRO HORAS (4/4H)', date: gerarHoras(4), intervalo: 4 },
        { id: '4x', name: 'QUATRO VEZES AO DIA', date: gerarHoras(6) },
        { id: '5x', name: 'CINCO VEZES AO DIA', date: gerarHoras(5) },
        { id: '6', name: 'A CADA SEIS HORAS (6/6H)', date: gerarHoras(6), intervalo: 6 },
        { id: '6x', name: 'SEIS VEZES AO DIA', date: gerarHoras(4) },
        { id: '8', name: 'A CADA OITO HORAS (8/8H)', date: gerarHoras(8), intervalo: 8 },
        { id: '12', name: 'A CADA 12 HORAS', date: gerarHoras(12), intervalo: 12 },
    ]

    const addIntervalo = (intervalo) => {
        setSelectedIntervalo({...intervalo, valueDose: 1, tipoDose: { id: 'com', name: 'Comprimido(s)'}, });
    }

    const itemSelected = (item) => {
        setDate(item);
        setModalActive(true);
    }

    const updateHorarios = (item) => {
        let indice = selectedIntervalo.date.length - 1;
        if ((selectedIntervalo.intervalo && item.Date.id == 0)) {
            selectedIntervalo.date = updateHoras(selectedIntervalo.intervalo, item.Date.hora, selectedIntervalo.date[indice]);
        } else if (selectedIntervalo.intervalo && item.Date.id == indice) {
            selectedIntervalo.date = updateHoras(selectedIntervalo.intervalo, selectedIntervalo.date[0], item.Date.hora);
        }
        else {
            selectedIntervalo.date[item.Date.id] = moment(item.Date.hora)
        }
        setSelectedIntervalo({ ...selectedIntervalo, date: selectedIntervalo.date, tipoDose: item.TipoDose, valueDose: item.ValueDose, flag: false });
    }

    const IntervaloMedi = ({ item }) => (
        <TouchableOpacity key={item.id} style={styles.btnIntervalo} onPress={() => itemSelected(item)}>
            <View>
                <Text style={styles.text}>{moment(item.hora).format('HH:mm')}</Text>
                {
                    (item.id == 0 && item._length > 1) && <Text style={styles.textInfo}>Hora inicial</Text>
                }
                {
                    (item.id == item._length - 1 && item._length > 1) && <Text style={styles.textInfo}>Hora final</Text>
                }
            </View>
            <Text style={styles.text}>Tome {item.valueDose} {item.tipoDose.name}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <Pressable onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                setExpanded(!expanded);
            }}>
                <View style={styles.button}>
                    <View style={styles.buttonItem1}>
                        <LembreteMedi width={30} height={30} />
                    </View>
                    <View style={styles.buttonItem2}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Label}>Horário dos Lembretes </Text>
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
                        <MyModalSelectorPerson
                            initialLabel={`${selectedIntervalo.name} ▼`}
                            options={optionsIntervalo}
                            action={addIntervalo}
                            editable={editable}
                            idIntervalo={idIntervalo}
                        />
                        {
                            selectedIntervalo.date &&
                            selectedIntervalo.date.map((item, index) => {
                                let arrayLength = selectedIntervalo.date.length;
                                return <IntervaloMedi item={{ hora: item, id: index, tipoDose: selectedIntervalo.tipoDose, valueDose: selectedIntervalo.valueDose, _length: arrayLength }} />
                            })
                        }
                    </View>
                    {
                        selectedIntervalo.date &&
                        <View style={{ borderTopWidth: 2, marginTop: 20, borderColor: '#fff' }}>
                            <Text style={styles.textInfo}>toque na hora inicial ou hora final para reprogramar os lembretes</Text>
                        </View>
                    }
                </View>
            )}
            <MyModalLembretes activeModal={modalActive} setActiveModal={setModalActive} InitialDate={date} action={updateHorarios} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    textInfo: {
        color: '#7C9292',
        fontSize: RFValue(13, 680),
        marginTop: 5
    },
    arrowImg: {
        width: 20,
        height: 20
    },
    box1: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxContainer: {
        backgroundColor: '#E6ECEC',
        marginTop: 5,
        padding: 10,
        marginHorizontal: 2,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
    },
    btnIntervalo: {
        width: Dimensions.get('screen').width / 100 * 90,
        height: Dimensions.get('screen').height / 100 * 5,
        marginTop: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
