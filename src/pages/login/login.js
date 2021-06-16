import React, { useRef, useState } from 'react';
import { Text, View, Pressable, TextInput, ImageBackground, Keyboard, KeyboardAvoidingView, Dimensions } from 'react-native';

import styles from './style';
import Loading from '../../componentes/Loading';
import Prosseguir from '../../componentes/prosseguir';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MybackButton from '../../componentes/MyBackButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AuthContext from '../../contexts/auth';
import { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import VisaoPassword from '../../componentes/visaoPassword';
import Notification from '../../componentes/Notification';

export default function login({ navigation }) {

    const { stateAuth, dispatchAuth } = useContext(AuthContext);
    const { usertasy } = stateAuth;
    const [loadingActive, setLoadingActive] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [modalNotification, setModalNotification] = useState({
        active: false,
        message: '',
        type: ''
    });

    const Senha = useRef(null);

    // consulta o cpf do cliente na api tasy
    async function getCpf(cpf) {
        return Api.get(`PessoaFisica/buscaCpfEmail?cpf=${cpf}`).then(response => {
            const { result } = response.data;
            return result;
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

    const updateEmailFirebase = async (email, cd_firebase) => {

        var user = auth().currentUser;
        const usersRef = firestore().collection('users');

        const upEmail = await user.updateEmail(email);

        const result = await usersRef.doc(cd_firebase.token).set({
            nome: cd_firebase.nome,
            cpf: cd_firebase.cpf.replace(/[.-]/g, ""),
            email: email,
            token: cd_firebase.token,
            nM_USUARIO: 'WebApp'
        });
    }

    const autenticar = async (email, password) => {
        return auth().signInWithEmailAndPassword(email, password).then(response => {
            return true;
        })
    }

    const autenticacao = async (password) => {

        setLoadingActive(true);

        try {

            const cd_firestone = await consultaFirebase(usertasy.nR_CPF.replace(/[.-]/g, ""));

            if (usertasy.dS_EMAIL === cd_firestone.email) {
                const authFirebase = await autenticar(cd_firestone.email, password);
            } else {
                const authFirebase = await autenticar(cd_firestone.email, password);
                const upFirebase = await updateEmailFirebase(usertasy.dS_EMAIL, cd_firestone);
            }

        } catch (error) {
            const { code, message } = error;
            if (code) {
                switch (code) {
                    case 'auth/invalid-email':
                        setModalNotification(prevState => {                          
                            return { ...prevState, active: true, message: 'Formato Inválido de E-mail', type: 'error' }
                        });
                        break;
                    case 'auth/user-not-found':
                        setModalNotification(prevState => {                          
                            return { ...prevState, active: true, message: 'Usuário não encontrado!', type: 'error' }
                        });
                        break;
                    case 'auth/wrong-password':
                        setModalNotification(prevState => {                           
                            return { ...prevState, active: true, message: 'A senha é inválida!', type: 'error' }
                        });
                        break;
                    case 'auth/network-request-failed':
                        setModalNotification(prevState => {                          
                            return { ...prevState, active: true, message: 'Verifique sua conexão com a Internet', type: 'error' }
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
        }
    }

    const FormSchema = Yup.object().shape({
        Senha: Yup
            .string()
            .required("Senha é obrigatório!")
            .min(6, ({ min }) => `A senha deve ter pelo menos ${min} caracteres`),
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
                            autenticacao(values.Senha);
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
                                        <Text style={styles.textInfo}>Digite sua senha</Text>
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
                                            />
                                            <VisaoPassword active={showPassword} setActive={setShowPassword} />
                                        </View>
                                        {(touched.Senha && errors.Senha) && <Text style={styles.Error}>{errors.Senha}</Text>}
                                        <TouchableOpacity style={styles.btnRecovery} onPress={() => navigation.navigate('RecuperarSenha')}>
                                            <Text style={styles.text}>Recuperar senha</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.box2}>
                                        <Prosseguir
                                            onPress={() => handleSubmit()}
                                        />
                                    </View>
                                </KeyboardAvoidingView>
                            </View>
                        )}
                    </Formik>
                    <Loading activeModal={loadingActive} />
                    <Notification
                        active={modalNotification.active}
                        setActive={setModalNotification}
                        type={modalNotification.type}
                        message={modalNotification.message}
                    />
                </ImageBackground>
            </Pressable>
        </KeyboardAvoidingView>
    )
}
