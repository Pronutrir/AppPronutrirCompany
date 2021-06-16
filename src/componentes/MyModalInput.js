import React, { useState, useRef } from 'react'

import {
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

export default function MyModalInput({ activeModal, mudarEstado, enviarSms }) {

    const navigation = useNavigation();
    const [fone, setFone] = useState("");
    const [foneValida, setFoneValida] = useState(true);

    const Enviar = () => {

        let _fone = fone.replace(/[()-]/g, "");

        if (_fone.length >= 10) {
            enviarSms(`+55${_fone}`);
        } else {
            setFoneValida(false);
        }
    }

    const validarFone = text =>{
        setFone(text)
        setFoneValida(true)
    }

    const closeModal = () => {
        mudarEstado(!activeModal)
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType='fade'
                transparent={true}
                visible={activeModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.close} onPress={() => closeModal()}>
                            <Image style={styles.closeImg} source={require('../assets/imagens/fechar.png')} />
                        </TouchableOpacity>
                        <Text style={styles.modalText}>Insira seu telefone</Text>
                        {foneValida ? null : <Text style={styles.Error}>Telefone Inválido !</Text>}
                        <TextInputMask
                            style={styles.Input}
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                //dddMask: '(85)'
                            }}
                            placeholder={'(00)00000-0000'}
                            value={fone}
                            onChangeText={text => validarFone(text)}
                        />
                        <TouchableOpacity
                            style={{ ...styles.openButton }}
                            onPress={() => Enviar()}
                        >
                            <Text style={styles.textStyle}>Enviar SMS</Text>
                        </TouchableOpacity>
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
    },
    modalView: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 10,
        paddingBottom: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        textAlign: "center",
        fontSize: 20,
        margin: 10,
        padding: 10,
        color: '#1E707D'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16
    },
    openButton: {
        backgroundColor: "#00A1A3",
        borderRadius: 10,
        elevation: 5,
        marginBottom: 20,
        padding: 10
    },
    Input: {
        width: (Dimensions.get('window').width / 10 * 6),
        margin: 10,
        borderBottomWidth: 2,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 25, 
        letterSpacing: 1
    },
    Error: {
        color: 'red',
        fontSize: 16
    },
    close: {
        width: 20, alignItems: 'center',
        alignSelf: 'flex-end'
    },
    closeImg: {
        width: 15,
        height: 15
    }
})