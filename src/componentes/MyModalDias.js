import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, TextInput } from 'react-native';

export default function MyModalDias({ activeModal, setActiveModal, action, total_dias }) {

    const [value, setValue] = useState(30);

    const cancel = () => {
        action(false);
        setActiveModal(false);
    }

    const ok = () => {
        action(true, value);
        setActiveModal(false);
    }

    const inc_Dec = (tipo) => {
        if (value > 0.25) {
            tipo === 'soma' && setValue(value + 1);
            tipo === 'subtracao' && setValue(value - 1);
        } else {
            tipo === 'soma' && setValue(value + 1);
        }
    }

    const addDias = (dias) => {
        if (dias.length <= 4 && dias.length != '') {
            setValue(parseInt(dias));
        }
        if(dias === ''){
            setValue(0);
        }
    }

    useEffect(() => {
        setValue(total_dias ? total_dias : 30);
    }, [total_dias])

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={activeModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.box}>
                            <Text style={styles.text}>Defina o número de dias (a partir da data inicial.)</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.btnInc} onPress={() => inc_Dec('subtracao')}>
                                <Text style={styles.textInc}>-</Text>
                            </TouchableOpacity>
                            <TextInput
                                value={value.toString()}
                                style={styles.textInput}
                                keyboardType={'numeric'}
                                onChangeText={text => addDias(text)}
                            />
                            <TouchableOpacity style={styles.btnInc} onPress={() => inc_Dec('soma')}>
                                <Text style={styles.textInc}>+</Text>
                            </TouchableOpacity>
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
        backgroundColor: 'rgba(0,0,0,.5)',
    },
    modalView: {
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
        width: '70%',
    },
    box: {
        marginVertical: 10,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    boxBtn: {
        marginVertical: 10,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        resizeMode: 'center'
    },
    text: {
        color: '#7C9292',
        fontSize: 18,
        textAlign: 'center'
    },
    textInput: {
        fontSize: 24,
        textAlign: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        color: '#7C9292',
        paddingVertical: 5
    },
    btnInc: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInc: {
        fontSize: 40,
        color: '#748080'
    },
})
