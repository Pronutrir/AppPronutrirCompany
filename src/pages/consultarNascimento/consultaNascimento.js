import React, { useContext, useRef, useState } from 'react';
import { Text, View, Pressable, Keyboard, TextInput, ImageBackground, KeyboardAvoidingView, Dimensions } from 'react-native';

import styles from './style';
import Loading from '../../componentes/Loading';
import Btnprosseguir from '../../components/buttons/Btnprosseguir';
import { TextInputMask } from 'react-native-masked-text';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../contexts/auth';
import BackButton from '../../components/buttons/BackButton';

export default function consultaNascimento({ navigation }) {

    const [modalActive, setModalActive] = useState(false);
    const { dispatchAuth } = useContext(AuthContext);

    const DataNascimento = useRef(null);

    const validacaoData = (value) => {
        let data = value.replace(/[" "/]/g, "");
        if (data.length == 8) {
            return true
        } else {
            return false;
        }
    }

    const FormSchema = Yup.object().shape({
        DataNascimento: Yup
            .string()
            .required('Telefone é obrigatório!')
            .test('validationData', 'Data inválida', value => value && validacaoData(value))
    })

    const setDataNasc = (value) => {
        dispatchAuth({ type: 'UpdateUserTasyDataNasc', dT_NASCIMENTO: value.DataNascimento })
        navigation.navigate('ConsultaEmail')
    }

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <ImageBackground style={styles.BackgroundImage} source={require('../../assets/imagens/logoBackgroud.png')}>
                <View style={{ marginTop: 20 }}>
                    <BackButton onPress={() => navigation.goBack()} />
                </View>
                <Formik
                    initialValues={{
                        DataNascimento: '',
                    }}
                    onSubmit={values => {
                        setDataNasc(values);
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
                                    <Text style={styles.textInfo}>Informe Sua data de Nascimento</Text>
                                    <Text style={styles.text}>Informe os dados para validar seu acesso !</Text>
                                    <TextInputMask
                                        type={'datetime'}
                                        options={{
                                            format: 'DD/MM/YYYY',

                                        }}
                                        ref={DataNascimento}
                                        style={styles.input}
                                        onChangeText={handleChange('DataNascimento')}
                                        onBlur={handleBlur('DataNascimento')}
                                        value={values.DataNascimento}
                                        placeholder={'00/00/0000'}
                                        placeholderTextColor={'#95a6a9a6'}
                                        maxLength={40}
                                    />
                                    {(touched.DataNascimento && errors.DataNascimento) && <Text style={styles.Error}>{errors.DataNascimento}</Text>}
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
