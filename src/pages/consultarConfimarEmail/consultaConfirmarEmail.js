import React, { useRef, useState, useContext } from 'react';
import { Text, View, Pressable, TextInput, ImageBackground, Keyboard, KeyboardAvoidingView, Dimensions } from 'react-native';

import styles from './style';
import Loading from '../../componentes/Loading';
import Prosseguir from '../../componentes/prosseguir';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../contexts/auth';
import BackButton from '../../components/buttons/BackButton';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

export default function consultaConfirmarEmail({ navigation }) {

    const { stateAuth } = useContext(AuthContext);
    const [modalActive, setModalActive] = useState(false);

    const ConfEmail = useRef(null);

    const validacaoEmail = (value) => {
        if (value.ConfEmail === stateAuth.usertasy.dS_EMAIL) {
            return true;
        } else {
            return false;
        }
    }

    const FormSchema = Yup.object().shape({
        ConfEmail: Yup
            .string()
            .required('Email é obrigatório!')
            .email('Por favor digite um Email válido!')
            .oneOf([stateAuth.usertasy.dS_EMAIL], 'Os e-mails digitados são diferentes')
        //.test('validationEmail', 'Os e-mails digitados são diferentes!', value => value && validacaoEmail(value)),
    })

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <ImageBackground style={styles.BackgroundImage} source={require('../../assets/imagens/logoBackgroud.png')}>
                <View>
                    <BackButton onPress={() => navigation.goBack()} />
                </View>
                <Formik
                    initialValues={{
                        ConfEmail: '',
                    }}
                    onSubmit={values => {
                        navigation.navigate('ConsultaCelular');
                    }}
                    validationSchema={FormSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, }) => (
                        <View style={{ flex: 1 }} >
                            <KeyboardAvoidingView
                                style={{ flex: 1 }}
                                behavior={Platform.OS === "ios" ? "padding" : "padding"}
                                keyboardVerticalOffset={-180}
                            >
                                <View style={styles.box1}>
                                    <Text style={styles.textInfo}>Confirme seu Email</Text>
                                    <Text style={styles.text}>Informe os dados para validar seu acesso !</Text>
                                    <TextInput
                                        ref={ConfEmail}
                                        style={styles.input}
                                        onChangeText={handleChange('ConfEmail')}
                                        onBlur={handleBlur('ConfEmail')}
                                        keyboardType={'email-address'}
                                        value={values.ConfEmail}
                                        autoCapitalize={'none'}
                                        maxLength={40}
                                    />
                                    {(touched.ConfEmail && errors.ConfEmail) && <Text style={styles.Error}>{errors.ConfEmail}</Text>}
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
    )
}
