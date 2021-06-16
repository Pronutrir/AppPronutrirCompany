import React, { useRef, useState, useContext } from 'react';
import { Text, View, Pressable, Keyboard, ImageBackground, KeyboardAvoidingView, Dimensions } from 'react-native';

import styles from './style';
import { TextInputMask } from 'react-native-masked-text';
import Loading from '../../componentes/Loading';
import Prosseguir from '../../componentes/prosseguir';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../contexts/auth';
import MybackButton from '../../componentes/MyBackButton';

export default function consultaCelular({ navigation }) {

    const [modalActive, setModalActive] = useState(false);
    const { dispatchAuth } = useContext(AuthContext)

    const Telefone = useRef(null);

    const validacaoTelefone = (value) => {
        let telefone = value.replace(/[" "()-]/g, "");
        if (telefone.length >= 10 || telefone.length >= 11) {
            return true
        } else {
            return false
        }
    }

    const FormSchema = Yup.object().shape({
        Telefone: Yup
            .string()
            .required("Telefone é obrigatório!")
            .test('validationTelefone', 'Telefone inválido', value => value && validacaoTelefone(value)),
    })

    const FormSchema2 = Yup.object().shape({
        Telefone: Yup
            .string()
            .required("Telefone é obrigatório!")
            .test('validationTelefone', 'Telefone inválido', value => value && validacaoTelefone(value)),
    })

    const setFone = (value) => {
        dispatchAuth({ type: 'UpdateUserTasyFone', nR_TELEFONE_CELULAR: value.Telefone })
        navigation.navigate('ConsultarSenha')
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Pressable style={styles.container} onPress={Keyboard.dismiss}>
                <ImageBackground style={styles.BackgroundImage} source={require('../../assets/imagens/logoBackgroud.png')}>
                    <View style={{ marginTop: 20 }}>
                        <MybackButton onPress={() => navigation.goBack()} />
                    </View>
                    <Formik
                        initialValues={{
                            Telefone: '',
                        }}
                        onSubmit={values => {
                            setFone(values)
                        }}
                        validationSchema={FormSchema2}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, }) => (
                            <View style={{ flex: 1 }} >
                                <KeyboardAvoidingView
                                    style={{ flex: 1 }}
                                    behavior={Platform.OS === "ios" ? "height" : "height"}
                                    keyboardVerticalOffset={Dimensions.get('screen').height / 6.8}
                                >
                                    <View style={styles.box1}>
                                        <Text style={styles.textInfo}>Informe seu Telefone</Text>
                                        <Text style={styles.text}>Informe os dados para validar seu acesso !</Text>
                                        <TextInputMask
                                            ref={Telefone}
                                            style={styles.input}
                                            type={'cel-phone'}
                                            options={{
                                                maskType: 'BRL',
                                                withDDD: true,
                                                //dddMask: '(85)'
                                            }}
                                            placeholder={'(00)00000-0000'}
                                            value={values.Telefone}
                                            onChangeText={handleChange('Telefone')}
                                            onBlur={handleBlur('Telefone')}
                                            placeholder={'(85)99999-9999'}
                                            placeholderTextColor={'#95a6a9a6'}
                                            maxLength={40}
                                        />
                                        {(touched.Telefone && errors.Telefone) && <Text style={styles.Error}>{errors.Telefone}</Text>}
                                    </View>
                                    <View style={styles.box2}>
                                        <Prosseguir
                                            onPress={() => handleSubmit()}
                                        />
                                    </View>
                                    <View style={styles.box3}>
                                        <Loading activeModal={modalActive} />
                                    </View>
                                </KeyboardAvoidingView>
                            </View>
                        )}
                    </Formik>
                </ImageBackground>
            </Pressable >
        </KeyboardAvoidingView>
    )
}
