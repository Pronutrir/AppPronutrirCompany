import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function MyModalDiasSemana({
    activeModal,
    setActiveModal,
    action,
    diasSelected,
}) {
    const [dias_semana, setDiasSemana] = useState([]);

    const cancel = () => {
        action(false, dias_semana);
        setActiveModal(false);
    };

    const ok = (item) => {
        action(true, dias_semana);
        setActiveModal(false);
    };

    const addDiaSemana = (isChecked, item) => {
        if (
            isChecked &&
            !dias_semana.some((element) => element.id == item.id)
        ) {
            setDiasSemana([...dias_semana, item]);
        }
        if (!isChecked) {
            setDiasSemana(
                dias_semana.filter((element) => element.id != item.id),
            );
        }
    };

    const DiasSemana = [
        { id: 1, dia: 'Segunda-feira' },
        { id: 2, dia: 'Terça-feira' },
        { id: 3, dia: 'Quarta-feira' },
        { id: 4, dia: 'Quinta-feira' },
        { id: 5, dia: 'Sexta-feira' },
        { id: 6, dia: 'Sábado' },
        { id: 7, dia: 'Domingo' },
    ];

    useEffect(() => {
        setDiasSemana(diasSelected ? diasSelected : []);
    }, []);

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={activeModal}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.box}>
                            <Text style={styles.text}>
                                Escolha os dias da semana
                            </Text>
                        </View>
                        {DiasSemana.map((item) => (
                            <View
                                key={item.id.toString()}
                                style={{ width: 150 }}>
                                <BouncyCheckbox
                                    style={styles.checkBox}
                                    size={25}
                                    fillColor="#08948A"
                                    unfillColor="#FFFFFF"
                                    iconStyle={{ color: 'red' }}
                                    text={item.dia}
                                    isChecked={
                                        diasSelected &&
                                        diasSelected.some(
                                            (element) => element.id == item.id,
                                        )
                                    }
                                    onPress={(isChecked) =>
                                        addDiaSemana(isChecked, item)
                                    }
                                />
                            </View>
                        ))}
                        <View style={styles.boxBtn}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => cancel()}>
                                <Text style={styles.text}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => ok()}>
                                <Text style={styles.text}>Definir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.5)',
    },
    modalView: {
        backgroundColor: '#ffff',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
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
        alignItems: 'center',
    },
    btn: {
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    boxBtn: {
        marginVertical: 10,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        resizeMode: 'center',
    },
    text: {
        color: '#7C9292',
        fontSize: 18,
        textAlign: 'center',
    },
    textInput: {
        fontSize: 24,
        textAlign: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        color: '#7C9292',
        paddingVertical: 5,
    },
    btnInc: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInc: {
        fontSize: 40,
        color: '#748080',
    },
    checkBox: {
        marginVertical: 10,
    },
});
