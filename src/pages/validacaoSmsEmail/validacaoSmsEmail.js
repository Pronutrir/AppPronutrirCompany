import React, { useState, useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native'
import Prosseguir from '../../componentes/prosseguir'
import auth from '@react-native-firebase/auth'
import styles from './style'
import MyModalInput from '../../componentes/MyModalInput'
import Loading from '../../componentes/Loading'

export default function validacaoSmsEmail({ navigation }) {

    const [confirm, setConfirm] = useState(null);
    const [aguarde, setAguarde] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [numero, setNumero] = useState(20);
    const [Idinterval, setIdInterval] = useState();
    const [codError, setCodErros] = useState(false);

    async function signInWithPhoneNumber(phoneNumber) {
        setModalActive(false)
        setLoading(true)
       
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber).then(response => {
            setTimeout(() => {
                setLoading(false)
                setConfirm(response)
                contagem()
                return response
            }, 5000);

        }).catch(
            error => {
                console.log(error)
                setLoading(false)
            }
        )
    }

    async function confirmCode(text) {
        setCodErros(false);
        setLoading(true)
        try {
            const resposta = await confirm.confirm(text)
        } catch (error) {
            setCodErros(true);
            console.log(error)
            setLoading(false)
        }
    }

    function contagem() {
        setAguarde(true);
        const clearId = setInterval(() => {
            setNumero(numero => numero - 1);
        }, 1000);

        setIdInterval(clearId)
    }

    if (numero <= 0) {
        if(aguarde) setAguarde(false);
        clearInterval(Idinterval)
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            keyboardVerticalOffset={0} behavior={'position'}
        >
            <View style={styles.box1}>
                <View style={styles.box1_1}>
                    <Text style={styles.text1}>Selecione o meio de recebimento do código</Text>
                </View>
                <View style={styles.box1_2}>
                    <Text style={styles.text2}>Seu primeiro acesso no app?</Text>
                    <Text style={styles.text2}>vamos autenticar seu dispositivo!</Text>
                </View>
                <View style={styles.box1_3}>
                    <View style={styles.boxImg}>
                        <TouchableOpacity onPress={() => setModalActive(true)} style={styles.boxImg1}>
                            <Image style={styles.img} source={require('../../assets/imagens/icons8-sms-100.png')} />
                        </TouchableOpacity>
                        <Text style={styles.textImg}>SMS</Text>
                    </View>
                    <View style={styles.boxImg}>
                        <TouchableOpacity style={styles.boxImg1} onPress={() => navigation.navigate('Login')}>
                            <Image style={styles.img} source={require('../../assets/imagens/icons-3.png')} />
                        </TouchableOpacity>
                        <Text style={styles.textImg}>E-Mail</Text>
                    </View>
                </View>
                {aguarde ? <Text style={styles.textAguarde}>Aguarde {numero} seg</Text>: null}
                {numero == 0 ?
                    <View style={styles.box1_4}>
                        <Text style={styles.textCod}>Insira o código</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            onChangeText={text => text.length == 6 ? confirmCode(text) : null}
                        />
                        {codError ? <Text style={styles.textError}>Codigo Inválido</Text>: null}
                    </View>
                    :
                    null
                }

            </View>
            <View style={styles.box2}>
                <Prosseguir /* onPress={() => navigation.navigate('DashBoard')} */ />
            </View>
            <View style={styles.box3}>
                <MyModalInput activeModal={modalActive} mudarEstado={setModalActive} enviarSms={signInWithPhoneNumber} />
                <Loading activeModal={loading} />
            </View>
        </KeyboardAvoidingView>
    )
}