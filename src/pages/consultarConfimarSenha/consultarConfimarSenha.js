import React, { useRef, useState, useContext } from 'react';
import { Text, View, Pressable, TextInput, ImageBackground, Keyboard, KeyboardAvoidingView, Dimensions } from 'react-native';

import styles from './style';
import Loading from '../../componentes/Loading';
import Prosseguir from '../../componentes/prosseguir';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../../contexts/auth';
import MybackButton from '../../componentes/MyBackButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MyModalSimples from '../../componentes/MyModalSimples';
import Api from '../../services/api';
import moment from 'moment';
import VisaoPassword from '../../componentes/visaoPassword';
import Notification from '../../componentes/Notification';

export default function consultarConfimarSenha({ navigation }) {

    const { stateAuth } = useContext(AuthContext);
    const { usertasy } = stateAuth;
    const [loadingActive, setLoadingActive] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [modalNotification, setModalNotification] = useState({
        active: false,
        message: '',
        type: ''
    });

    const Senha = useRef(null);

    //consulta e retorna o token para acesso a api tasy
    const cadastroTasy = async (usertasy) => {
        return Api.post('PessoaFisica', {
            iE_TIPO_PESSOA: 2,
            iE_FUNCIONARIO: 'N',
            nM_PESSOA_FISICA: usertasy.nM_PESSOA_FISICA.toUpperCase(),
            nR_CPF: usertasy.nR_CPF,
            dT_ATUALIZACAO: moment().format('YYYY-MM-DD'),
            nR_DDD_CELULAR: usertasy.nR_TELEFONE_CELULAR.replace(/[() -]/g, "").substring(0, 2),
            nR_TELEFONE_CELULAR: usertasy.nR_TELEFONE_CELULAR.replace(/[() -]/g, "").substring(2, 12),
            dT_NASCIMENTO: moment(usertasy.dT_NASCIMENTO, "DD-MM-YYYY").format('YYYY-MM-DD'),
            nM_USUARIO: "AppMobile",
            dS_EMAIL: usertasy.dS_EMAIL
        }).then(response => {
            const { result } = response.data;
            return result;
        })
    }

    // atualiza cadastro tasy
    const UpdateCadastroTasy = async (usertasy) => {
        return Api.put(`PessoaFisica/${usertasy.cD_PESSOA_FISICA}`, {
            cD_PESSOA_FISICA: usertasy.cD_PESSOA_FISICA,
            nM_PESSOA_FISICA: usertasy.nM_PESSOA_FISICA.toUpperCase(),
            nR_CPF: usertasy.nR_CPF,
            dT_ATUALIZACAO: moment().format('YYYY-MM-DD'),
            nR_DDD_CELULAR: usertasy.nR_TELEFONE_CELULAR.replace(/[() -]/g, "").substring(0, 2),
            nR_TELEFONE_CELULAR: usertasy.nR_TELEFONE_CELULAR.replace(/[() -]/g, "").substring(2, 12),
            dT_NASCIMENTO: moment(usertasy.dT_NASCIMENTO, "DD-MM-YYYY").format('YYYY-MM-DD'),
            nM_USUARIO: "AppMobile",
            dS_EMAIL: usertasy.dS_EMAIL,
            iE_TIPO_PESSOA: 2,
            iE_FUNCIONARIO: usertasy.iE_FUNCIONARIO ? usertasy.iE_FUNCIONARIO : 'N',
            nR_SEQUENCIA: usertasy.nR_SEQUENCIA,
            iE_TIPO_COMPLEMENTO: usertasy.iE_TIPO_COMPLEMENTO
        }).then(response => {
            const { result } = response.data;
            return result;
        })
    }

    const cadastroFireBase = async (values) => {
        return auth().createUserWithEmailAndPassword(values.dS_EMAIL, values.nR_Senha).then(response => {
            return response.user;
        })
    }

    const cadastroFireStone = async (cd_firebase, usertasy) => {
        const usersRef = firestore().collection('users');
        await usersRef.doc(cd_firebase.uid).set({
            nome: usertasy.nM_PESSOA_FISICA,
            cpf: usertasy.nR_CPF.replace(/[.-]/g, ""),
            email: usertasy.dS_EMAIL,
            token: cd_firebase.uid,
            nM_USUARIO: 'AppMobile'
        }).then(() => {
            return true;
        });
    }

    const cadastrarUsuario = async () => {
        setLoadingActive(true);
        try {
            const { cD_PESSOA_FISICA } = usertasy;
            let updateTasy = null;
            let cd_tasy = null;

            if (cD_PESSOA_FISICA) {
                updateTasy = await UpdateCadastroTasy(usertasy);
            } else {
                cd_tasy = await cadastroTasy(usertasy)
            }

            if (cd_tasy || updateTasy) {
                await cadastroFireBase(usertasy).then(cd_firebase => {
                    cadastroFireStone(cd_firebase, usertasy);
                });
            }
        } catch (error) {
            const { code, message } = error;
            if (code) {
                switch (code) {
                    case 'auth/invalid-email':
                        setModalNotification(prevState => {
                            return { ...prevState, active: true, message: 'Formato Inválido de E-mail!', type: 'error' }
                        });
                        break;
                    case 'auth/user-not-found':
                        setModalNotification(prevState => {
                            return { ...prevState, active: true, message: 'Usuário não encontrado!', type: 'error' }
                        });
                        break;
                    case 'auth/wrong-password':
                        setModalNotification(prevState => {
                            return { ...prevState, active: true, message: 'A senha é inválida ou o usuário não possui uma senha.', type: 'error' }
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
                    case 'auth/email-already-in-use':
                        setModalNotification(prevState => {
                            return { ...prevState, active: true, message: 'Email já está sendo utilizado!', type: 'error' }
                        });
                        break;
                    case 'auth/weak-password':
                        setModalNotification(prevState => {
                            return { ...prevState, active: true, message: 'Sua senha precisa ter pelo menos 8 caracteres', type: 'error' }
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
                            return { ...prevState, active: true, message: message, type: 'error' }
                        });
                        break;
                }
            }
            setLoadingActive(false);
        }
    }

    const FormSchema = Yup.object().shape({
        Senha: Yup
            .string()
            .required("Senha é obrigatório!")
            .min(6, ({ min }) => `A senha deve ter pelo menos ${min} caracteres`)
            .oneOf([stateAuth.usertasy.nR_Senha], 'As senhas digitadas são diferentes')
    })

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
                            Senha: '',
                        }}
                        onSubmit={values => {
                            cadastrarUsuario();
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
                                        <Text style={styles.textInfo}>Confirme sua senha</Text>
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
                                        <Prosseguir
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
                </ImageBackground>
            </Pressable >
        </KeyboardAvoidingView>
    )
}
