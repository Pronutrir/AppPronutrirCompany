import React, { useRef, useState, useContext } from 'react';
import {
    Text,
    View,
    Pressable,
    TextInput,
    ImageBackground,
    Keyboard,
} from 'react-native';
import _styles from './style';
import Loading from '../../components/Loading/Loading';
import Btnprosseguir from '../../components/buttons/Btnprosseguir';
import { Formik } from 'formik';
import AuthContext from '../../contexts/auth';
import MybackButton from '../../components/buttons/BackButton';
import auth from '@react-native-firebase/auth';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { useNavigation } from '@react-navigation/native';
import NotificationSimples, {
    ModalHandles,
} from '../../components/Notification/NotificationSimple';

export default function RecuperarSenha() {
    const navigation = useNavigation();
    const { stateAuth } = useContext(AuthContext);
    const {
        usertasy: { dS_EMAIL },
    } = stateAuth;

    const styles = useThemeAwareObject(_styles);

    const Email = useRef(null);
    const notificationRef = useRef<ModalHandles>(null);
    const [modalLoading, setModalLoading] = useState(false);

    const recoveryPassword = () => {
        setModalLoading(true);
        const actionCodeSettings = {
            handleCodeInApp: false,
            url: `https://webapppronutrir.com.br/redefinirsenha`,
            iOS: {
                bundleId: 'com.apppronutrir',
            },
            android: {
                packageName: 'com.apppronutrir',
                installApp: true,
                minimumVersion: '12',
            },
            // When multiple custom dynamic link domains are defined, specify which
            // one to use.
            //dynamicLinkDomain: "https://apppronutrir.page.link"
        };

        auth()
            .sendPasswordResetEmail(dS_EMAIL, actionCodeSettings)
            .then(function () {
                // Verification email sent.
                setModalLoading(false);
                notificationRef.current?.openModal();
            })
            .catch(() => {
                // Error occurred. Inspect error.code.
                setModalLoading(false);
            });
    };

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <ImageBackground
                style={styles.BackgroundImage}
                source={require('../../assets/imagens/logoBackgroud.png')}>
                <View style={{ marginTop: 20 }}>
                    <MybackButton onPress={() => navigation.goBack()} />
                </View>
                <Formik
                    initialValues={{
                        Email: dS_EMAIL,
                    }}
                    onSubmit={() => {
                        recoveryPassword();
                    }}>
                    {({ handleSubmit, values }) => (
                        <View style={{ flex: 1 }}>
                            <View style={styles.box1}>
                                <Text style={styles.textLabel}>
                                    Recuperação de senha
                                </Text>
                                <Text style={styles.textInfo}>
                                    Para recuperar a sua senha, nós enviaremos
                                    um link para a alteração da senha.
                                </Text>
                                <TextInput
                                    ref={Email}
                                    style={styles.input}
                                    value={values.Email}
                                    keyboardType={'email-address'}
                                    autoCapitalize={'none'}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.box2}>
                                <Btnprosseguir
                                    valueText={'Enviar'}
                                    onPress={() => handleSubmit()}
                                />
                            </View>
                            <View>
                                <Loading activeModal={modalLoading} />
                                <NotificationSimples
                                    ref={notificationRef}
                                    title="Mensagem:"
                                    message={
                                        'Email Enviado com sucesso! verifique seu email.'
                                    }
                                    onpress={() => navigation.goBack()}
                                />
                            </View>
                        </View>
                    )}
                </Formik>
            </ImageBackground>
        </Pressable>
    );
}
