import React, { useRef, useContext, useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Dimensions, Keyboard, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';
import Btnprosseguir from '../../../components/buttons/Btnprosseguir';
import AuthContext from '../../../contexts/auth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import VisaoPassword from '../../../componentes/visaoPassword';
import { foneMask } from '../../../services/validacoes';
import Loading from '../../../componentes/Loading';
import Notification from '../../../componentes/Notification';
import Api from '../../../services/api';
import moment from 'moment';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function atualizarEmail({ navigation }) {

    const { stateAuth, dispatchAuth } = useContext(AuthContext);
    const { usertasy } = stateAuth;
    const [loadingActive, setLoadingActive] = useState(false);
    const [modalNotification, setModalNotification] = useState({
        active: false,
        message: '',
        type: ''
    });
    const [formActive, setFormActive] = useState(false);
    const [showPassword, setShowPassword] = useState(true);

    const Email = useRef(null);
    const SenhaAtual = useRef(null);

    /*ATUALIZAR DADOS NA API*/
    const atualizarPerfil = async (values) => {
        setLoadingActive(true);
        return Api.put(`PessoaFisica/${usertasy.cD_PESSOA_FISICA}`, {
            cD_PESSOA_FISICA: usertasy.cD_PESSOA_FISICA,
            nM_PESSOA_FISICA: usertasy.nM_PESSOA_FISICA,
            dT_ATUALIZACAO: moment().format(),
            nR_DDD_CELULAR: usertasy.nR_DDD_CELULAR,
            nR_TELEFONE_CELULAR: usertasy.nR_TELEFONE_CELULAR,
            dT_NASCIMENTO: usertasy.dT_NASCIMENTO,
            nM_USUARIO: "WebApp",
            dS_EMAIL: values.Email,
            iE_TIPO_PESSOA: usertasy.iE_TIPO_PESSOA,
            iE_FUNCIONARIO: usertasy.iE_FUNCIONARIO,
            nR_SEQUENCIA: usertasy.nR_SEQUENCIA,
            iE_TIPO_COMPLEMENTO: usertasy.iE_TIPO_COMPLEMENTO
        }
        ).then(response => {
            const { result } = response.data
            if (result) {
                setModalNotification(prevState => {
                    return { ...prevState, active: true, message: 'O Seu E-mail foi atualizado com sucesso!', type: 'success' }
                });
                dispatchAuth({ type: 'UpdateUserTasyEmail', dS_EMAIL: result.dS_EMAIL })
            }
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

    const consultaFirebase = async (cpf) => {

        const usersRef = firestore().collection('users');
        let dados = null;

        const cpfExiste = await usersRef.where('cpf', '==', cpf).get();

        if (cpfExiste.size !== 0) {
            cpfExiste.docs.forEach(item => {
                dados = item.data();
            })
            return dados;
        } else {
            return null;
        }
    }

    const updateEmailFirebase = async (email, cd_firestone) => {

        var user = auth().currentUser;
        const usersRef = firestore().collection('users');

        const upEmail = await user.updateEmail(email);

        const result = await usersRef.doc(cd_firestone.token).set({
            nome: cd_firestone.nome,
            cpf: cd_firestone.cpf.replace(/[.-]/g, ""),
            email: email,
            token: cd_firestone.token,
            nM_USUARIO: 'WebApp'
        });
    }

    const atualizarDados = async (values) => {
        const result = await atualizarPerfil(values);
        if (result) {
            try {
                const cd_firestone = await consultaFirebase(usertasy.nR_CPF.replace(/[.-]/g, ""));
                const upFirebase = await updateEmailFirebase(values.Email, cd_firestone);
                setLoadingActive(false);
            } catch (error) {
                setLoadingActive(false);
            }
        }
    }

    const reauthenticate = async (values) => {
        setLoadingActive(true);
        var user = auth().currentUser;
        var cred = auth.EmailAuthProvider.credential(usertasy.dS_EMAIL, values.SenhaAtual);
        user.reauthenticateWithCredential(cred).then(response => {
            setFormActive(true);
            setLoadingActive(false);
        }).catch(error => {
            const { code, message } = error;
            if (code) {
                switch (code) {
                    case 'auth/wrong-password':
                        setModalNotification(prevState => {
                            return { ...prevState, active: true, message: 'A senha é inválida.', type: 'error' }
                        });
                        break;
                    case 'auth/network-request-failed':
                        setModalNotification(prevState => {
                            return { ...prevState, active: true, message: 'Verifique sua conexão com a Internet.', type: 'error' }
                        });
                        break;
                    case 'auth/too-many-requests':
                        setModalNotification(prevState => {
                            return { ...prevState, active: true, message: 'Aguarde!, muitas tentativas de acesso!', type: 'error' }
                        });
                        break;
                    default:
                        setModalNotification(prevState => {
                            return { ...prevState, active: true, message: error.code, type: 'error' }
                        });
                        break;
                }
            } else {
                switch (message) {
                    default:
                        setModalNotification(prevState => {
                            return { ...prevState, active: true, message: error.message, type: 'error' }
                        });
                        break;
                }
            }
            setLoadingActive(false);
        });
    }

    const validacaoEmail = async (email) => {
        if (email) {
            const usersRef = firestore().collection('users');

            const emailExiste = await usersRef.where('email', '==', email).get();

            return emailExiste.empty
        }
    }

    const FormSchema = Yup.object().shape({
        Email: Yup
            .string()
            .required('Email é obrigatório!')
            .email('Por favor digite um Email válido!')
            .test('validationEmail', 'E-mail já está em uso', value => validacaoEmail(value)),
    })

    const FormSchema2 = Yup.object().shape({
        SenhaAtual: Yup
            .string()
            .required("Senha é obrigatório!")
            .min(6, ({ min }) => `A senha deve ter pelo menos ${min} caracteres`),
    })

    return (
        <View style={styles.container}>
            {
                !formActive ?
                    <View style={styles.box}>
                        <Pressable onPress={Keyboard.dismiss}>
                            <Formik
                                initialValues={{
                                    SenhaAtual: '',
                                    Email: usertasy.dS_EMAIL,

                                }}
                                onSubmit={reauthenticate}
                                validationSchema={FormSchema2}
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
                                                    <Text style={styles.text}>Senha atual</Text>
                                                    <View style={styles.sectionInput}>
                                                        <TextInput
                                                            ref={SenhaAtual}
                                                            style={styles.inputPass}
                                                            onChangeText={handleChange('SenhaAtual')}
                                                            onBlur={handleBlur('SenhaAtual')}
                                                            value={values.SenhaAtual}
                                                            secureTextEntry={showPassword}
                                                            autoCapitalize={'none'}
                                                            placeholder={'Digite sua senha'}
                                                            placeholderTextColor={'#95a6a9a6'}
                                                            maxLength={40}
                                                        />
                                                        <VisaoPassword active={showPassword} setActive={setShowPassword} />
                                                    </View>
                                                    {(touched.SenhaAtual && errors.SenhaAtual) && <Text style={styles.Error}>{errors.SenhaAtual}</Text>}
                                                </View>
                                                <TouchableOpacity style={styles.btnRecovery} onPress={() => navigation.navigate('RecuperarSenha')}>
                                                    <Text style={styles.textRecovery}>Recuperar senha</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.box2}>
                                                <Btnprosseguir
                                                    valueText={'Prosseguir'}
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
                    :
                    <View style={styles.box}>
                        <Pressable onPress={Keyboard.dismiss}>
                            <Formik
                                initialValues={{
                                    Email: usertasy.dS_EMAIL,
                                    Celular: foneMask(`${usertasy.nR_DDD_CELULAR} ${usertasy.nR_TELEFONE_CELULAR}`),
                                }}
                                onSubmit={values => {
                                    atualizarDados(values);
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
                                                    <Text style={styles.text}>E-mail</Text>
                                                    <TextInput
                                                        ref={Email}
                                                        style={styles.input}
                                                        onChangeText={handleChange('Email')}
                                                        onBlur={handleBlur('Email')}
                                                        value={values.Email}
                                                        keyboardType={'email-address'}
                                                        autoCapitalize={'none'}
                                                    />
                                                    {(touched.Email && errors.Email) && <Text style={styles.Error}>{errors.Email}</Text>}
                                                </View>
                                            </View>
                                            <View style={styles.box2}>
                                                <Prosseguir
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
            }
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
    },
    sectionInput: {
        flexDirection: 'row',
        width: '80%',
        borderBottomColor: '#DBCCCC',
        borderBottomWidth: 2,
        alignItems: 'center',
        marginVertical: 10
        //backgroundColor: 'blue'
    },
    btnRecovery: {
        marginTop: 10,
        alignSelf: 'center'
    },
    textRecovery: {
        color: '#7A8B8E',
        fontSize: RFValue(15, 680)
    }
})

