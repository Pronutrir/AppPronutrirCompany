import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, TextInput } from 'react-native';
import MyModalSelectorOptions from '../componentes/MyModalSelectorOptions';
import DatePicker from 'react-native-date-picker';
import { ArrayUnidadeMedicamentoTasy } from '../services/conversorUnidadeMedicamento';
import moment from 'moment';
import { RFValue } from "react-native-responsive-fontsize";

export default function MyModalLembretes({ activeModal, setActiveModal, InitialDate, action }) {

    const [date, setDate] = useState(InitialDate);
    const [valueDose, setValueDose] = useState(1.00);
    const [tipoDose, setTipoDose] = useState({name: "seleciona a dosagem"});

    const ok = () => {
        setActiveModal(false);
        action({ Date: date, ValueDose: valueDose, TipoDose: tipoDose });
    }

    const cancel = () => {
        setActiveModal(false);
    }

    const inc_Dec = (tipo) => {
        if (valueDose > 0.25) {
            tipo === 'soma' && setValueDose(valueDose + 0.25);
            tipo === 'subtracao' && setValueDose(valueDose - 0.25);
        }else{
            tipo === 'soma' && setValueDose(valueDose + 0.25);
        }
    }

    const dataSelected = (item) => {
        setDate({...date, hora: item})
    }

    useEffect(() => {
       setDate(InitialDate);
    }, [InitialDate])

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                backdropOpacity={0.9}
                visible={activeModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.box1}>
                            <Text style={styles.text}>Quando você precisa tomar esse medicamentos ?</Text>

                        </View>
                        <View style={styles.box2}>
                            <DatePicker
                                date={new Date(date.hora)}
                                onDateChange={date => dataSelected(date)}
                                mode={'time'}
                                is24hourSource={'device'}
                                androidVariant={'nativeAndroid'}
                                minimumDate={new Date(moment().startOf('date'))}
                                maximumDate={new Date(moment().endOf('date'))}
                            />
                        </View>
                        <View style={styles.box3}>
                            <Text style={styles.text}>Quanto deve ser Tomado ?</Text>
                            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                <TouchableOpacity style={styles.btnInc} onPress={() => inc_Dec('subtracao')}>
                                    <Text style={styles.textInc}>-</Text>
                                </TouchableOpacity>
                                <TextInput
                                    value={valueDose.toFixed(2).toString()}
                                    style={styles.valueInput}
                                />
                                <TouchableOpacity style={styles.btnInc} onPress={() => inc_Dec('soma')}>
                                    <Text style={styles.textInc}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <MyModalSelectorOptions
                                    initialLabel={tipoDose.name}
                                    options={ArrayUnidadeMedicamentoTasy}
                                    action={setTipoDose}
                                />
                            </View>
                        </View>
                        <View style={styles.boxBtn}>
                            <TouchableOpacity style={styles.btn} onPress={() => cancel()}>
                                <Text style={styles.text}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={() => ok()}>
                                <Text style={styles.text}>Definir</Text>
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
        backgroundColor: 'rgba(0,0,0,.7)',
    },
    modalView: {
        opacity: 20,
        backgroundColor: "#ffff",
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '80%',
    },
    box1: {
        alignItems: "center",
        marginTop: 20,
    },
    box2: {
        alignItems: "center",
    },
    box3: {
        alignItems: "center",
    },
    btn: {
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        paddingHorizontal: 10
    },
    btnInc: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInc: {
        color: '#7C9292',
        fontSize: RFValue(40, 680),
        textAlign: 'center'
    },
    boxBtn: {
        marginTop: 20,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    img: {
        resizeMode: 'center'
    },
    text: {
        color: '#7C9292',
        fontSize: RFValue(16, 680),
        textAlign: 'center'
    },
    valueInput:{
        width: 50, 
        fontSize: RFValue(20, 680),
        textAlign: 'center',
        color: '#7C9292',
    }
})
