import React, { useRef, useContext, useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Dimensions, Keyboard, KeyboardAvoidingView } from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';
import Btnprosseguir from '../../../components/buttons/Btnprosseguir';
import AuthContext from '../../../contexts/auth';
import Loading from '../../../componentes/Loading';
import Notification from '../../../componentes/Notification';
import moment from 'moment';
import Api from '../../../services/api';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function informacoesPessoais() {

    const { stateAuth, dispatchAuth } = useContext(AuthContext);
    const { usertasy } = stateAuth;
    const [modalActive, setModalActive] = useState(false);
    const [modalNotification, setModalNotification] = useState({
        active: false,
        message: '',
        type: ''
    });

    const Nome = useRef(null);
    const Nascimento = useRef(null);

    /*ATUALIZAR DADOS NA API*/
    const atualizarPerfil = async (values) => {
        setModalActive(true);
        return Api.put(`PessoaFisica/${usertasy.cD_PESSOA_FISICA}`, {
            cD_PESSOA_FISICA: usertasy.cD_PESSOA_FISICA,
            nM_PESSOA_FISICA: values.Nome,
            dT_ATUALIZACAO: moment().format(),
            nR_DDD_CELULAR: usertasy.nR_DDD_CELULAR,
            nR_TELEFONE_CELULAR: usertasy.nR_TELEFONE_CELULAR,
            /* dT_NASCIMENTO: moment(values.Nascimento).format('YYYY-MM-DD'), */
            dT_NASCIMENTO: usertasy.dT_NASCIMENTO,
            nM_USUARIO: "WebApp",
            dS_EMAIL: usertasy.dS_EMAIL,
            iE_TIPO_PESSOA: usertasy.iE_TIPO_PESSOA,
            iE_FUNCIONARIO: usertasy.iE_FUNCIONARIO,
            nR_SEQUENCIA: usertasy.nR_SEQUENCIA,
            iE_TIPO_COMPLEMENTO: usertasy.iE_TIPO_COMPLEMENTO
        }
        ).then(response => {
            const { result } = response.data
            if (result) {
                setModalNotification(prevState => {
                    return { ...prevState, active: true, message: 'O Seu perfil foi atualizado com sucesso!', type: 'success' }
                });
                dispatchAuth({ type: 'UpdateUserTasyNome', nM_PESSOA_FISICA: result.nM_PESSOA_FISICA })
            }
            setModalActive(false);
        }).catch(error => {
            switch (error.response.status) {
                case 401:
                    setModalNotification(prevState => {
                        return { ...prevState, active: true, message: 'A sua atualização não foi autorizada!', type: 'error' }
                    });
                    break;
                case 400:
                    setModalNotification(prevState => {
                        return { ...prevState, active: true, message: 'Não foi possivel atualizar devido a algum preenchimento incorreto!', type: 'error' }
                    });
                    break;
                default:
                    setModalNotification(prevState => {
                        return { ...prevState, active: true, message: error.message, type: 'error' }
                    });
                    break;
            }
            setModalActive(false);
        })
    }

    const infor = () => {
        setModalNotification(prevState => {
            return { ...prevState, active: true, message: 'Não é permitido alterar a data de nascimento', type: 'warning' }
        });
    }

    const FormSchema = Yup.object().shape({
        Nome: Yup
            .string()
            .required('Nome é obrigatório!')
            .matches(/(\w.+\s).+/, 'Insira seu nome e sobrenome'),
    })


    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Pressable onPress={Keyboard.dismiss}>
                    <Formik
                        initialValues={{
                            Nome: usertasy.nM_PESSOA_FISICA,
                            Nascimento: moment(usertasy.dT_NASCIMENTO).format('DD/MM/YYYY')
                        }}
                        onSubmit={values => {
                            atualizarPerfil(values);
                        }}
                        validationSchema={FormSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, }) => (
                            <View style={{ flex: 1 }} >
                                <KeyboardAvoidingView
                                    style={{ flex: 1 }}
                                    behavior={Platform.OS === "ios" ? "height" : "height"}
                                    keyboardVerticalOffset={Dimensions.get('screen').height / 5.2}
                                >
                                    <View style={styles.box1}>
                                        <View style={styles.item1}>
                                            <Text style={styles.text}>Nome completo</Text>
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
                                        <Pressable style={styles.item1} onPress={() => infor()}>
                                            <Text style={styles.text}>Data de nascimento</Text>
                                            <TextInput
                                                ref={Nascimento}
                                                style={[styles.input, styles.disabled]}
                                                onChangeText={handleChange('Nascimento')}
                                                onBlur={handleBlur('Nascimento')}
                                                value={values.Nascimento}
                                                editable={false}
                                            />
                                            {(touched.Nascimento && errors.Nascimento) && <Text style={styles.Error}>{errors.Nascimento}</Text>}
                                        </Pressable>
                                    </View>
                                    <View style={styles.box2}>
                                        <Btnprosseguir
                                            valueText={'Alterar'}
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
                </Pressable >
            </View>
            <Notification
                active={modalNotification.active}
                setActive={setModalNotification}
                type={modalNotification.type}
                message={modalNotification.message}
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
        color: '#7A8B8E'
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
    },
    disabled: {
        opacity: 0.5
    }
})
