import React, { useRef, useState, useContext } from 'react';
import { Text, View, Pressable, Keyboard, TextInput, ImageBackground, KeyboardAvoidingView, Dimensions } from 'react-native';

import styles from './style';
import Loading from '../../componentes/Loading';
import Btnprosseguir from '../../components/buttons/Btnprosseguir';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../contexts/auth';
import BackButton from '../../components/buttons/BackButton';
import VisaoPassword from '../../componentes/visaoPassword';

export default function consultarSenha({ navigation }) {

    const [modalActive, setModalActive] = useState(false);
    const { dispatchAuth } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(true);

    const Senha = useRef(null);

    const FormSchema = Yup.object().shape({
        Senha: Yup
            .string()
            .required("Senha é obrigatório!")
            .min(6, ({ min }) => `A senha deve ter pelo menos ${min} caracteres`),
    })

    const setSenha = (value) => {
        dispatchAuth({ type: 'UpdateSenha', payload: value.Senha })
        navigation.navigate('ConsultarConfirmarSenha')
    }

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <ImageBackground style={styles.BackgroundImage} source={require('../../assets/imagens/logoBackgroud.png')}>
                <View style={{ marginTop: 20 }}>
                    <BackButton onPress={() => navigation.goBack()} />
                </View>
                <Formik
                    initialValues={{
                        Senha: '',
                    }}
                    onSubmit={values => {
                        setSenha(values);
                    }}
                    validationSchema={FormSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ flex: 1 }} >
                            <KeyboardAvoidingView
                                style={{ flex: 1 }}
                                behavior={Platform.OS === "ios" ? "padding" : "padding"}
                                keyboardVerticalOffset={-180}
                            >
                                <View style={styles.box1}>
                                    <Text style={styles.textInfo}>Cadastre sua senha</Text>
                                    <Text style={styles.text}>Informe os dados para validar seu acesso !</Text>
                                    <View style={styles.sectionInput}>
                                        <TextInput
                                            ref={Senha}
                                            style={styles.input}
                                            onChangeText={handleChange('Senha')}
                                            onBlur={handleBlur('Senha')}
                                            value={values.Senha}
                                            secureTextEntry={showPassword}
                                            autoCapitalize={'none'}
                                            maxLength={40}
                                        />
                                        <VisaoPassword active={showPassword} setActive={setShowPassword} />
                                    </View>
                                    {(touched.Senha && errors.Senha) && <Text style={styles.Error}>{errors.Senha}</Text>}
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
        </Pressable >
    )
}
