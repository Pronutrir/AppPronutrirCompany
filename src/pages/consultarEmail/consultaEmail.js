import React, { useRef, useState, useContext } from 'react';
import {
    Text,
    View,
    Pressable,
    TextInput,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';

import styles from './style';
import Loading from '../../components/Loading/Loading';
import Btnprosseguir from '../../components/buttons/Btnprosseguir';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../contexts/auth';
import BackButton from '../../components/buttons/BackButton';
import firestore from '@react-native-firebase/firestore';

export default function consultaEmail({ navigation }) {
    const [modalActive, setModalActive] = useState(false);
    const { dispatchAuth, stateAuth } = useContext(AuthContext);

    const Email = useRef(null);

    const validacaoEmail = async (email) => {
        if (email) {
            const usersRef = firestore().collection('users');

            const emailExiste = await usersRef
                .where('email', '==', email)
                .get();

            return emailExiste.empty;
        }
    };

    const FormSchema = Yup.object().shape({
        Email: Yup.string()
            .required('Email é obrigatório!')
            .email('Por favor digite um Email válido!')
            .test('validationEmail', 'E-mail já está em uso', (value) =>
                validacaoEmail(value),
            ),
    });

    const setEmail = (value) => {
        dispatchAuth({ type: 'UpdateUserTasyEmail', payload: value.Email });
        navigation.navigate('ConsultaConfimarEmail');
    };

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <ImageBackground
                style={styles.BackgroundImage}
                source={require('../../assets/imagens/logoBackgroud.png')}>
                <View style={{ marginTop: 20 }}>
                    <BackButton onPress={() => navigation.goBack()} />
                </View>
                <Formik
                    initialValues={{
                        Email: '',
                    }}
                    onSubmit={(values) => {
                        setEmail(values);
                    }}
                    validationSchema={FormSchema}>
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        isValid,
                    }) => (
                        <View style={{ flex: 1 }}>
                            <KeyboardAvoidingView
                                style={{ flex: 1 }}
                                behavior={Platform.OS === 'ios' && 'padding'}
                                keyboardVerticalOffset={
                                    Platform.OS === 'ios' ? 105 : 0
                                }>
                                <View style={styles.box1}>
                                    <Text style={styles.textInfo}>
                                        Informe seu Email
                                    </Text>
                                    <Text style={styles.text}>
                                        Informe os dados para validar seu acesso
                                        !
                                    </Text>
                                    <TextInput
                                        ref={Email}
                                        style={styles.input}
                                        onChangeText={handleChange('Email')}
                                        onBlur={handleBlur('Email')}
                                        value={values.Email}
                                        keyboardType={'email-address'}
                                        autoCapitalize={'none'}
                                        maxLength={40}
                                    />
                                    {touched.Email && errors.Email && (
                                        <Text style={styles.Error}>
                                            {errors.Email}
                                        </Text>
                                    )}
                                </View>
                                <View style={styles.box2}>
                                    <Btnprosseguir
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
        </Pressable>
    );
}
