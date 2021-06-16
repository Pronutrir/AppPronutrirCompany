import React, { useRef, useState, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, Keyboard, TextInput, ImageBackground, KeyboardAvoidingView, Dimensions } from 'react-native';

import styles from './style';
import Loading from '../../componentes/Loading';
import Prosseguir from '../../componentes/prosseguir';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../contexts/auth';
import MybackButton from '../../componentes/MyBackButton';

export default function consultarNome({ navigation }) {

    const { dispatchAuth } = useContext(AuthContext);
    const [modalActive, setModalActive] = useState(false);

    const Nome = useRef(null);

    const FormSchema = Yup.object().shape({
        Nome: Yup
            .string()
            .required('Nome é obrigatório!')
            .matches(/(\w.+\s).+/, 'Insira seu nome e sobrenome'),
    })

    const setNome = (value) => {
        dispatchAuth({ type: 'UpdateUserTasyNome', nM_PESSOA_FISICA: value.Nome })
        navigation.navigate('consultarNascimento')
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
                            Nome: '',
                        }}
                        onSubmit={values => {
                            setNome(values);
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
                                        <Text style={styles.textInfo}>Informe seu nome e sobrenome</Text>
                                        <Text style={styles.text}>Informe os dados para validar seu acesso !</Text>
                                        <TextInput
                                            ref={Nome}
                                            style={styles.input}
                                            onChangeText={handleChange('Nome')}
                                            onBlur={handleBlur('Nome')}
                                            value={values.Nome}
                                            maxLength={40}
                                        />
                                        {(touched.Nome && errors.Nome) && <Text style={styles.Error}>{errors.Nome}</Text>}
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
