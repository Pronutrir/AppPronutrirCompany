import React, { useRef, useState, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    Dimensions,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';
import Prosseguir from '../../../components/buttons/Btnprosseguir';
import VisaoPassword from '../../../componentes/visaoPassword';
import auth from '@react-native-firebase/auth';
import Loading from '../../../components/Loading/Loading';
import Notification from '../../../componentes/Notification';
import AuthContext from '../../../contexts/auth';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export default function AlterarSenha({ navigation }) {
    const { stateAuth } = useContext(AuthContext);
    const { usertasy } = stateAuth;

    const [modalNotification, setModalNotification] = useState({
        active: false,
        message: '',
        type: '',
    });

    const [modalActive, setModalActive] = useState(false);
    const [showPassword1, setShowPassword1] = useState(true);
    const [showPassword2, setShowPassword2] = useState(true);
    const [formActive, setFormActive] = useState(false);

    const SenhaAtual = useRef(null);
    const Senha = useRef(null);
    const ConfirmarSenha = useRef(null);

    const FormSchema = Yup.object().shape({
        Senha: Yup.string()
            .required('Senha é obrigatório!')
            .min(
                6,
                ({ min }) => `A senha deve ter pelo menos ${min} caracteres`,
            ),
        ConfirmarSenha: Yup.string()
            .required('Confirmar Senha é obrigatório!')
            .min(
                6,
                ({ min }) => `A senha deve ter pelo menos ${min} caracteres`,
            )
            .oneOf([Yup.ref('Senha')], 'As senhas digitadas são diferentes'),
    });

    const FormSchema2 = Yup.object().shape({
        SenhaAtual: Yup.string()
            .required('Senha é obrigatório!')
            .min(
                6,
                ({ min }) => `A senha deve ter pelo menos ${min} caracteres`,
            ),
    });

    const UpdateSenha = async (value, { resetForm }) => {
        setModalActive(true);
        const user = auth().currentUser;
        user.updatePassword(value.Senha)
            .then((response) => {
                setModalNotification((prevState) => {
                    return {
                        ...prevState,
                        active: true,
                        message: 'Senha alterada com sucesso!',
                        type: 'success',
                    };
                });
                setModalActive(false);
                resetForm();
            })
            .catch((error) => {
                setModalNotification((prevState) => {
                    return {
                        ...prevState,
                        active: true,
                        message: 'Erro ao alterar a senha, tente mais tarde!',
                        type: 'error',
                    };
                });
                setModalActive(false);
            });
    };

    const reauthenticate = async (values) => {
        setModalActive(true);
        var user = auth().currentUser;
        var cred = auth.EmailAuthProvider.credential(
            usertasy.dS_EMAIL,
            values.SenhaAtual,
        );
        user.reauthenticateWithCredential(cred)
            .then((response) => {
                setFormActive(true);
                setModalActive(false);
            })
            .catch((error) => {
                const { code, message } = error;
                if (code) {
                    switch (code) {
                        case 'auth/wrong-password':
                            setModalNotification((prevState) => {
                                return {
                                    ...prevState,
                                    active: true,
                                    message: 'A senha é inválida.',
                                    type: 'error',
                                };
                            });
                            break;
                        case 'auth/network-request-failed':
                            setModalNotification((prevState) => {
                                return {
                                    ...prevState,
                                    active: true,
                                    message:
                                        'Verifique sua conexão com a Internet.',
                                    type: 'error',
                                };
                            });
                            break;
                        case 'auth/too-many-requests':
                            setModalNotification((prevState) => {
                                return {
                                    ...prevState,
                                    active: true,
                                    message:
                                        'Aguarde!, muitas tentativas de acesso!',
                                    type: 'error',
                                };
                            });
                            break;
                        default:
                            setModalNotification((prevState) => {
                                return {
                                    ...prevState,
                                    active: true,
                                    message: error.code,
                                    type: 'error',
                                };
                            });
                            break;
                    }
                } else {
                    switch (message) {
                        default:
                            setModalNotification((prevState) => {
                                return {
                                    ...prevState,
                                    active: true,
                                    message: error.message,
                                    type: 'error',
                                };
                            });
                            break;
                    }
                }
                setModalActive(false);
            });
    };

    return (
        <View style={styles.container}>
            {!formActive ? (
                <View style={styles.box}>
                    <Pressable onPress={Keyboard.dismiss}>
                        <Formik
                            initialValues={{
                                SenhaAtual: '',
                            }}
                            onSubmit={reauthenticate}
                            validationSchema={FormSchema2}>
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
                                        behavior={
                                            Platform.OS === 'ios' && 'padding'
                                        }
                                        keyboardVerticalOffset={
                                            Platform.OS === 'ios' ? 105 : 0
                                        }>
                                        <View style={styles.box1}>
                                            <View style={styles.item1}>
                                                <Text style={styles.text}>
                                                    Senha atual
                                                </Text>
                                                <View
                                                    style={styles.sectionInput}>
                                                    <TextInput
                                                        ref={SenhaAtual}
                                                        style={styles.input}
                                                        onChangeText={handleChange(
                                                            'SenhaAtual',
                                                        )}
                                                        onBlur={handleBlur(
                                                            'SenhaAtual',
                                                        )}
                                                        value={
                                                            values.SenhaAtual
                                                        }
                                                        secureTextEntry={
                                                            showPassword1
                                                        }
                                                        autoCapitalize={'none'}
                                                        placeholder={
                                                            'Digite sua senha'
                                                        }
                                                        placeholderTextColor={
                                                            '#95a6a9a6'
                                                        }
                                                        maxLength={40}
                                                    />
                                                    <VisaoPassword
                                                        active={showPassword1}
                                                        setActive={
                                                            setShowPassword1
                                                        }
                                                    />
                                                </View>
                                                {touched.SenhaAtual &&
                                                    errors.SenhaAtual && (
                                                        <Text
                                                            style={
                                                                styles.Error
                                                            }>
                                                            {errors.SenhaAtual}
                                                        </Text>
                                                    )}
                                            </View>
                                            <TouchableOpacity
                                                style={styles.btnRecovery}
                                                onPress={() =>
                                                    navigation.navigate(
                                                        'RecuperarSenha',
                                                    )
                                                }>
                                                <Text
                                                    style={styles.textRecovery}>
                                                    Recuperar senha
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.box2}>
                                            <Prosseguir
                                                valueText={'Prosseguir'}
                                                onPress={() => handleSubmit()}
                                            />
                                        </View>
                                        <View style={styles.box3}>
                                            <Loading
                                                activeModal={modalActive}
                                            />
                                        </View>
                                    </KeyboardAvoidingView>
                                </View>
                            )}
                        </Formik>
                    </Pressable>
                </View>
            ) : (
                <View style={styles.box}>
                    <Pressable onPress={Keyboard.dismiss}>
                        <Formik
                            initialValues={{
                                Senha: '',
                                ConfirmarSenha: '',
                            }}
                            onSubmit={UpdateSenha}
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
                                        behavior={
                                            Platform.OS === 'ios' && 'padding'
                                        }
                                        keyboardVerticalOffset={
                                            Platform.OS === 'ios' ? 105 : 0
                                        }>
                                        <View style={styles.box1}>
                                            <View style={styles.item1}>
                                                <Text style={styles.text}>
                                                    Nova senha
                                                </Text>
                                                <View
                                                    style={styles.sectionInput}>
                                                    <TextInput
                                                        ref={Senha}
                                                        style={styles.input}
                                                        onChangeText={handleChange(
                                                            'Senha',
                                                        )}
                                                        onBlur={handleBlur(
                                                            'Senha',
                                                        )}
                                                        value={values.Senha}
                                                        secureTextEntry={
                                                            showPassword1
                                                        }
                                                        autoCapitalize={'none'}
                                                        placeholder={
                                                            'Digite sua nova senha'
                                                        }
                                                        placeholderTextColor={
                                                            '#95a6a9a6'
                                                        }
                                                        maxLength={40}
                                                    />
                                                    <VisaoPassword
                                                        active={showPassword1}
                                                        setActive={
                                                            setShowPassword1
                                                        }
                                                    />
                                                </View>
                                                {touched.Senha &&
                                                    errors.Senha && (
                                                        <Text
                                                            style={
                                                                styles.Error
                                                            }>
                                                            {errors.Senha}
                                                        </Text>
                                                    )}
                                            </View>
                                            <View style={styles.item1}>
                                                <Text style={styles.text}>
                                                    Confirmar senha
                                                </Text>
                                                <View
                                                    style={styles.sectionInput}>
                                                    <TextInput
                                                        ref={ConfirmarSenha}
                                                        style={styles.input}
                                                        onChangeText={handleChange(
                                                            'ConfirmarSenha',
                                                        )}
                                                        onBlur={handleBlur(
                                                            'ConfirmarSenha',
                                                        )}
                                                        value={
                                                            values.ConfirmarSenha
                                                        }
                                                        secureTextEntry={
                                                            showPassword2
                                                        }
                                                        autoCapitalize={'none'}
                                                        placeholder={
                                                            'Confirme sua nova senha'
                                                        }
                                                        placeholderTextColor={
                                                            '#95a6a9a6'
                                                        }
                                                        maxLength={40}
                                                    />
                                                    <VisaoPassword
                                                        active={showPassword2}
                                                        setActive={
                                                            setShowPassword2
                                                        }
                                                    />
                                                </View>
                                                {touched.ConfirmarSenha &&
                                                    errors.ConfirmarSenha && (
                                                        <Text
                                                            style={
                                                                styles.Error
                                                            }>
                                                            {
                                                                errors.ConfirmarSenha
                                                            }
                                                        </Text>
                                                    )}
                                            </View>
                                        </View>
                                        <View style={styles.box2}>
                                            <Prosseguir
                                                valueText={'Alterar'}
                                                onPress={() => handleSubmit()}
                                            />
                                        </View>
                                        <View style={styles.box3}>
                                            <Loading
                                                activeModal={modalActive}
                                            />
                                        </View>
                                    </KeyboardAvoidingView>
                                </View>
                            )}
                        </Formik>
                    </Pressable>
                </View>
            )}
            <Notification
                active={modalNotification.active}
                setActive={setModalNotification}
                type={modalNotification.type}
                message={modalNotification.message}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    box: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    box1: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    item1: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height / 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Dimensions.get('screen').height / 25,
    },
    box2: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height / 15,
    },
    input: {
        width: '90%',
        ...Platform.select({
            ios: {
                margin: 5,
                padding: 5,
            },
            android: {
                margin: 0,
                padding: 0,
            },
            default: {
                margin: 10,
            },
        }),
        fontSize: RFValue(20, 680),
        textAlign: 'center',
        color: '#748080',
    },
    textInfo: {
        color: '#1E707D',
        fontSize: RFValue(26, 680),
        textAlign: 'center',
    },
    text: {
        width: '80%',
        color: '#7A8B8E',
        fontSize: RFValue(15, 680),
    },
    Error: {
        color: 'red',
        fontSize: RFValue(14, 680),
        textAlign: 'center',
    },
    disabled: {
        opacity: 0.5,
    },
    sectionInput: {
        flexDirection: 'row',
        width: '80%',
        borderBottomColor: '#DBCCCC',
        borderBottomWidth: 2,
        alignItems: 'center',
        marginVertical: 10,
        //backgroundColor: 'blue'
    },
    btnRecovery: {
        marginTop: 10,
        alignSelf: 'center',
    },
    textRecovery: {
        color: '#7A8B8E',
        fontSize: RFValue(15, 680),
    },
});
