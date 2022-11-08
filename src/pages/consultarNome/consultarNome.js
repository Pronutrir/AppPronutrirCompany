import React, { useRef, useState, useContext } from 'react';
import {
    Text,
    View,
    Pressable,
    Keyboard,
    TextInput,
    ImageBackground,
    KeyboardAvoidingView,
} from 'react-native';
import styles from './style';
import Loading from '../../components/Loading/Loading';
import Btnprosseguir from '../../components/buttons/Btnprosseguir';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../contexts/auth';
import BackButton from '../../components/buttons/BackButton';

export default function consultarNome({ navigation }) {
    const { dispatchAuth } = useContext(AuthContext);
    const [modalActive, setModalActive] = useState(false);

    const Nome = useRef(null);

    const FormSchema = Yup.object().shape({
        Nome: Yup.string()
            .required('Nome é obrigatório!')
            .matches(/(\w.+\s).+/, 'Insira seu nome completo'),
    });

    const setNome = (value) => {
        dispatchAuth({ type: 'UpdateUserTasyNome', payload: value.Nome });
        navigation.navigate('consultarNascimento');
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
                        Nome: '',
                    }}
                    onSubmit={(values) => {
                        setNome(values);
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
                                        Informe seu nome completo
                                    </Text>
                                    <Text style={styles.text}>
                                        Informe os dados para validar seu acesso
                                        !
                                    </Text>
                                    <TextInput
                                        ref={Nome}
                                        style={styles.input}
                                        onChangeText={handleChange('Nome')}
                                        onBlur={handleBlur('Nome')}
                                        value={values.Nome}
                                        maxLength={40}
                                    />
                                    {touched.Nome && errors.Nome && (
                                        <Text style={styles.Error}>
                                            {errors.Nome}
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
