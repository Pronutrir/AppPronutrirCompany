import React, { useRef, useState, useContext } from 'react';
import { Text, View, Pressable, TextInput, ImageBackground, Keyboard } from 'react-native';

import styles from './style';
import Loading from '../../components/Loading/Loading';
import Btnprosseguir from '../../components/buttons/Btnprosseguir';
import { Formik } from 'formik';
import AuthContext from '../../contexts/auth';
import MybackButton from '../../componentes/MyBackButton';
import auth from '@react-native-firebase/auth';
import MyModalSimples from '../../componentes/MyModalSimples';

export default function recuperarSenha({ navigation }) {

    const { stateAuth } = useContext(AuthContext);
    const { usertasy, Usuario: { email } } = stateAuth;

    const Email = useRef(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalActive, setModalActive] = useState(false);

    const recoveryPassword = () => {
        setModalLoading(true);
        var actionCodeSettings = {
            handleCodeInApp: false,
            url: `https://webapppronutrir.com.br/redefinirsenha`,
            iOS: {
                bundleId: 'com.apppronutrir'
            },
            android: {
                packageName: 'com.apppronutrir',
                installApp: true,
                minimumVersion: '12'
            },
            // When multiple custom dynamic link domains are defined, specify which
            // one to use.
            //dynamicLinkDomain: "https://apppronutrir.page.link"
        };

        auth().sendPasswordResetEmail(email, actionCodeSettings)
            .then(function () {
                // Verification email sent.
                setModalLoading(false);
                setModalActive(true);
            })
            .catch(function (error) {
                // Error occurred. Inspect error.code.
                setModalLoading(false);
            });
    }

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <ImageBackground style={styles.BackgroundImage} source={require('../../assets/imagens/logoBackgroud.png')}>
                <View style={{ marginTop: 20 }}>
                    <MybackButton onPress={() => navigation.goBack()} />
                </View>
                <Formik
                    initialValues={{
                        Email: email,
                    }}
                    onSubmit={values => {
                        recoveryPassword(values);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, }) => (
                        <View style={{ flex: 1 }} >
                            <View style={styles.box1}>
                                <Text style={styles.textInfo}>Enviar Email para recuperar senha</Text>
                                <TextInput
                                    ref={Email}
                                    style={styles.input}
                                    value={values.Email}
                                    keyboardType={'email-address'}
                                    autoCapitalize={'none'}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.box2}>
                                <Btnprosseguir
                                    valueText={'Enviar Email'}
                                    onPress={() => handleSubmit()}
                                />
                            </View>
                            <View style={styles.box3}>
                                <Loading activeModal={modalLoading} />
                                <MyModalSimples activeModal={modalActive} setActiveModal={setModalActive} label={'Email Enviado com sucesso! verifique seu email.'} />
                            </View>
                        </View>
                    )}
                </Formik>
            </ImageBackground>
        </Pressable >
    )
}
