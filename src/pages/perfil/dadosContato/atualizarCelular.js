import React, { useRef, useContext, useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Dimensions, Keyboard, KeyboardAvoidingView } from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';
import Btnprosseguir from '../../../components/buttons/Btnprosseguir';
import AuthContext from '../../../contexts/auth';
import { foneMask } from '../../../services/validacoes';
import Loading from '../../../components/Loading/Loading';
import Notification from '../../../componentes/Notification';
import Api from '../../../services/api';
import moment from 'moment';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function atualizarCelular() {
    const { stateAuth, dispatchAuth } = useContext(AuthContext);
    const { usertasy } = stateAuth;
    const [loadingActive, setLoadingActive] = useState(false);
    const [modalNotification, setModalNotification] = useState({
        active: false,
        message: '',
        type: ''
    });

    const Celular = useRef(null);

    /*ATUALIZAR DADOS NA API*/
    const atualizarPerfil = async (values) => {
        setLoadingActive(true);
        values.Celular = values.Celular.replace(/[() -]/g, "");
        return Api.put(`PessoaFisica/${usertasy.cD_PESSOA_FISICA}`, {
            cD_PESSOA_FISICA: usertasy.cD_PESSOA_FISICA,
            nM_PESSOA_FISICA: usertasy.nM_PESSOA_FISICA,
            dT_ATUALIZACAO: moment().format(),
            nR_DDD_CELULAR: values.Celular.substring(0, 2),
            nR_TELEFONE_CELULAR: values.Celular.substring(2, 12),
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
                    return { ...prevState, active: true, message: 'O Seu celular foi atualizado com sucesso!', type: 'success' }
                });
                dispatchAuth({ type: 'UpdateUserTasyDDD', payload: result.nR_DDD_CELULAR })
                dispatchAuth({ type: 'UpdateUserTasyFone', payload: result.nR_TELEFONE_CELULAR })
            }
            setLoadingActive(false);
            return result
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
            setLoadingActive(false);
        })
    }

    const validacaoTelefone = (value) => {
        let telefone = value.replace(/[" "()-]/g, "");
        if (telefone.length >= 10 || telefone.length >= 11) {
            return true
        } else {
            return false
        }
    }

    const FormSchema = Yup.object().shape({
        Celular: Yup
            .string()
            .required("Telefone é obrigatório!")
            .test('validationTelefone', 'Telefone inválido', value => value && validacaoTelefone(value)),
    })

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Pressable onPress={Keyboard.dismiss}>
                    <Formik
                        initialValues={{
                            Celular: foneMask(`${usertasy.nR_DDD_CELULAR} ${usertasy.nR_TELEFONE_CELULAR}`),
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
                                    behavior={Platform.OS === "ios" ? "padding" : "padding"}
                                    keyboardVerticalOffset={Platform.OS === "ios" ? 140 : -180}
                                >
                                    <View style={styles.box1}>
                                        <View style={styles.item1}>
                                            <Text style={styles.text}>Celular</Text>
                                            <TextInput
                                                ref={Celular}
                                                style={styles.input}
                                                onChangeText={handleChange('Celular')}
                                                onBlur={handleBlur('Celular')}
                                                value={foneMask(values.Celular)}
                                            />
                                            {(touched.Celular && errors.Celular) && <Text style={styles.Error}>{errors.Celular}</Text>}
                                        </View>
                                    </View>
                                    <View style={styles.box2}>
                                        <Btnprosseguir
                                            valueText={'Alterar'}
                                            onPress={() => handleSubmit()}
                                        />
                                    </View>
                                    <View style={styles.box3}>
                                        <Loading activeModal={loadingActive} />
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
        fontSize: RFValue(18, 680),
        textAlign: 'center',
        color: '#7A8B8E'
    },
    inputPass: {
        width: '90%',
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
        fontSize: RFValue(20, 680),
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
    },
    disabled: {
        opacity: 0.5
    },
    sectionInput: {
        flexDirection: 'row',
        width: '80%',
        borderBottomColor: '#DBCCCC',
        borderBottomWidth: 2,
        alignItems: 'center',
        marginVertical: 10
        //backgroundColor: 'blue'
    }
})

