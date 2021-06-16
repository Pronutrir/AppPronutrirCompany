import React, { useRef, useContext, useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Dimensions, Keyboard } from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';
import Prosseguir from '../../../componentes/prosseguir';
import AuthContext from '../../../contexts/auth';
import { cpfMask } from '../../../services/validacoes';
import Loading from '../../../componentes/Loading';
import MyModalInfor from '../../../componentes/MyModalInfor';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function credenciais() {

    const { stateAuth, dispatchAuth } = useContext(AuthContext);
    const { usertasy } = stateAuth;
    const [modalActive, setModalActive] = useState(false);
    const [ modalInfor, setModalInfor ] = useState(false);

    const CPF = useRef(null);

    const FormSchema = Yup.object().shape({
        Nome: Yup
            .string()
            .required('Nome é obrigatório!')
            .matches(/(\w.+\s).+/, 'Insira seu nome e sobrenome'),
    })

    const infor = () => {
        setModalInfor(true);
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Pressable onPress={Keyboard.dismiss}>
                    <Formik
                        initialValues={{
                            CPF: cpfMask(usertasy.nR_CPF),
                        }}
                        onSubmit={values => {
                            atualizarPerfil(values);
                        }}
                        validationSchema={FormSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, }) => (
                            <View style={{ flex: 1 }} >
                                <View style={styles.box1}>
                                    <Pressable style={styles.item1} onPress={() => infor()}>
                                        <Text style={styles.text}>CPF</Text>
                                        <TextInput
                                            ref={CPF}
                                            style={styles.input}
                                            onChangeText={handleChange('CPF')}
                                            onBlur={handleBlur('CPF')}
                                            value={values.CPF}
                                            editable={false}
                                        />
                                        {(touched.CPF && errors.CPF) && <Text style={styles.Error}>{errors.CPF}</Text>}
                                    </Pressable>
                                </View>
                                <View style={styles.box2}>
                                    <Prosseguir
                                        valueText={'Alterar'}
                                        onPress={() => handleSubmit()}
                                    />
                                </View>
                                <View style={styles.box3}>
                                    <Loading activeModal={modalActive} />
                                </View>
                            </View>
                        )}
                    </Formik>
                </Pressable >
            </View>
        <MyModalInfor
            activeModal={modalInfor}
            setActiveModal={setModalInfor}
            message={'Essa credencial é usada para fazer login na sua conta no app Pronutir. por motivos de segurança, não podemos alterar essa informação.'}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    box: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },
    box1: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    item1: {
        width: (Dimensions.get('screen').width),
        height: (Dimensions.get('screen').height / 10),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    box2: {
        width: (Dimensions.get('screen').width),
        height: (Dimensions.get('screen').height / 15)
    },
    input: {
        width: '80%',
        borderBottomColor: '#DBCCCC',
        borderBottomWidth: 2,
        ...Platform.select({
            ios: {
                margin: 5,
                padding: 5
            },
            android: {
                margin: 0,
                padding: 0
            },
            default: {
                margin: 10,
            }
        }),
        fontSize: RFValue(16, 680),
        textAlign: 'center',
        color: '#748080',
    },
    textInfo: {
        color: '#1E707D',
        fontSize: RFValue(26, 680),
        textAlign: 'center'
    },
    text: {
        width: '80%',
        color: '#7A8B8E',
        fontSize: RFValue(15, 680),
    },
    Error: {
        color: 'red',
        fontSize: RFValue(14, 680),
        textAlign: 'center'
    }
})
