import React, { useState, useRef, useContext } from 'react';
import { Text, View, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Prosseguir from '../../componentes/prosseguir';

import styles from './style';
import MybackButton from '../../componentes/MyBackButton';
import Api from '../../services/api';
import { valicacaoCPF } from '../../services/validacaoCpf';
import Loading from '../../componentes/Loading';
import AuthContext from '../../contexts/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import { Pressable } from 'react-native';
import Notification from '../../componentes/Notification';

export default function consultaCpf({ navigation }) {

    const { stateAuth, dispatchAuth } = useContext(AuthContext);
    const [modalActive, setModalActive] = useState(false);
    const [modalNotification, setModalNotification] = useState({
        active: false,
        message: '',
        type: ''
    });

    const CPF = useRef(null);

    // consulta o cpf do cliente na api tasy
    async function getCpf(cpf) {
        return Api.get(`PessoaFisica/buscaCpfEmail?cpf=${cpf}`).then(response => {
            const { result } = response.data;
            return result;
        })
    }

    const consultaFirebase = async (cpf, email) => {

        const usersRef = firestore().collection('users');

        const cpfExiste = await usersRef.where('cpf', '==', cpf).get();

        if (!cpfExiste.empty) {
            return true;
        } else {
            return false;
        }
    }

    const validacaoUsuario = async (values) => {
        let _Cpf = values.CPF.replace(/[.-]/g, "")
        setModalActive(true);
        try {

            let updateTasy = null;
            let cd_tasy = null;
            let firebaseExiste = null;
            let cd_firebase = null

            // consulta o cpf do cliente na api tasy
            const dadosTasy = await getCpf(_Cpf);
    
            if (dadosTasy) {
                //guarda os dados do cliente no reducer
                dispatchAuth({ type: 'setUserTasy', usertasy: dadosTasy })

                // consulta se o usuario tem cadastro no firebase
                firebaseExiste = await consultaFirebase(dadosTasy.nR_CPF, dadosTasy.dS_EMAIL);

                if (firebaseExiste) {
                    navigation.navigate('Login');
                } else {
                    navigation.navigate('ConsultaNome');
                }
            } else {
                dispatchAuth({ type: 'UpdateUserTasyCPF', nR_CPF: _Cpf });
                navigation.navigate('ConsultaNome');
            }

        } catch (error) {
            setModalActive(false);
            const { message } = error
            if (message) {
                setModalNotification(prevState => {
                    return { ...prevState, active: true, message: error.message, type: 'error' }
                });
            }
        } finally {
            setModalActive(false);
        }
    }

    const FormSchema = Yup.object().shape({
        CPF: Yup
            .string()
            .required("CPF é obrigatório!")
            .test('validationCpf', 'CPF inválido', value => value && valicacaoCPF(value.replace(/[.-]/g, ""))),
    })

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <ImageBackground style={styles.BackgroundImage} source={require('../../assets/imagens/logoBackgroud.png')}>
                <View style={{ marginTop: 20 }}>
                    <MybackButton onPress={() => navigation.goBack()} />
                </View>
                <Formik
                    initialValues={{
                        CPF: '',
                    }}
                    onSubmit={values => {
                        validacaoUsuario(values);
                    }}
                    validationSchema={FormSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, }) => (
                        <View style={{ flex: 1 }} >
                            <KeyboardAvoidingView
                                style={{ flex: 1 }}
                                behavior={Platform.OS === "ios" ? "height" : "height"}
                                keyboardVerticalOffset={Dimensions.get('screen').height / 6.8}
                            >
                                <View style={styles.box1}>
                                    <Text style={styles.textInfo}>Informe seu CPF</Text>
                                    <Text style={styles.text}>Informe os dados para validar seu acesso !</Text>
                                    <TextInputMask
                                        ref={CPF}
                                        style={styles.input}
                                        type={`cpf`}
                                        value={values.CPF}
                                        onChangeText={handleChange('CPF')}
                                        onBlur={handleBlur('CPF')}
                                    />
                                    {(touched.CPF && errors.CPF) && <Text style={styles.Error}>{errors.CPF}</Text>}
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
            <Notification
                active={modalNotification.active}
                setActive={setModalNotification}
                type={modalNotification.type}
                message={modalNotification.message}
            />
        </Pressable>
    )
}