import React, { useContext, useState, useRef } from 'react';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native';

import Api from '../../services/api';
import { valicacaoCPF } from '../../services/validacaoCpf';
import AuthContext from '../../contexts/auth';
import ErrorContext from '../../contexts/errorNotification';
import { TextInputMask } from 'react-native-masked-text';
import Loading from '../../componentes/Loading';
import styles from './style';
import AvatarImg from '../../assets/svg/avatar.svg';
import CadeadoImg from '../../assets/svg/cadeado.svg';
import EmailImg from '../../assets/svg/o-email.svg';
import TelefoneImg from '../../assets/svg/telefone.svg';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MyModalSimples from '../../componentes/MyModalSimples';
import auth from '@react-native-firebase/auth';
import moment from 'moment';


export default function cadastro({ navigation }) {

    const { addError } = useContext(ErrorContext);
    const { stateAuth, token } = useContext(AuthContext);
    const [modalActive, setModalActive] = useState(false);
    const [msnModal, setMsnModal] = useState();
    const [loading, setloading] = useState(false);

    const Nome = useRef(null);
    const Cpf = useRef(null);
    const Telefone = useRef(null);
    const Email = useRef(null);
    const Senha = useRef(null);
    const confirmSenha = useRef(null);

    const cadastroFireBase = async (values) => {
        return auth().createUserWithEmailAndPassword(values.Email, values.Senha).then(response => {
            return response;
        }).catch(error => {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setMsnModal('Email Já Está em Uso!')
                    setModalActive(true)
                    break;
                case 'auth/invalid-email':
                    setMsnModal('Formato Inválido de E-mail')
                    setModalActive(true)
                    break;
                case 'auth/weak-password':
                    setMsnModal('Sua senha precisa ter pelo menos 8 caracteres')
                    setModalActive(true)
                    break;
                default:
                    setMsnModal(error.code)
                    setModalActive(true)
            }
        })
    }

    const cadastroTasy = async (values) => {
        return Api.post('PessoaFisica', {
            iE_TIPO_PESSOA: 2,
            nM_USUARIO: "AppMobile",
            nR_CPF: values.Cpf.replace(/[.-]/g, ""),
            iE_FUNCIONARIO: 'N',
            dT_ATUALIZACAO: moment().format(),
            nM_PESSOA_FISICA: values.Nome.toUpperCase(),
            nR_TELEFONE_CELULAR: values.Telefone.replace(/[" "()-]/g, ""),
        }).then(response => {
            const { result } = response.data;
            return result;
        })
    }

    const cadastroPessoaFisica = async (values) => {
        setloading(true);
        try {
            const cpf = await ConsultaCpf(values.Cpf);
            if (!cpf) {
                const cadTasy = await cadastroTasy(values);
                if (cadTasy) {
                    const cadFirebase = await cadastroFireBase(values);
                }
            } else {
                setMsnModal('Cpf Já cadastrado!');
                setModalActive(true)
            }
        } catch (error) {
            setMsnModal('Error ao criar sua conta' + error)
            setModalActive(true)
            addError(`Não foi possivel realizar o cadastro! tente mais tarde - ${error.message}`);
        } finally {
            setloading(false);
        }
    }

    const ConsultaCpf = async (cpf) => {
        let _Cpf = cpf.replace(/[.-]/g, "")
        if (valicacaoCPF(_Cpf)) {
            return Api.get(`PessoaFisica/buscaCpf/${_Cpf}`).then(response => {
                const { result } = response.data
                if (result == null) {
                    return false;
                } else {
                    return true;
                }
            })
        }
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
        Nome: Yup
            .string()
            .required('Nome é obrigatório!')
            .matches(/(\w.+\s).+/, 'Insira seu nome e sobrenome'),
        Cpf: Yup
            .string()
            .required('Cpf é obrigatório!')
            .test('validationCpf', 'Cpf inválido', value => value && valicacaoCPF(value.replace(/[.-]/g, ""))),
        Email: Yup
            .string()
            .email("Por favor digite um Email válido!")
            .required("Email é obrigatório!"),
        Telefone: Yup
            .string()
            .required("Telefone é obrigatório!")
            .test('validationTelefone', 'Telefone inválido', value => value && validacaoTelefone(value)),
        Senha: Yup
            .string()
            .required("Senha é obrigatório!")
            .min(8, ({ min }) => `A senha deve ter pelo menos ${min} caracteres`),
        confirmSenha: Yup
            .string()
            .required("Confirmar senha é obrigatório!")
            .oneOf([Yup.ref('Senha')], 'As senhas digitadas são diferentes')
            .min(8, ({ min }) => `A senha deve ter pelo menos ${min} caracteres`),
    })

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={{ flex: 1 }} resizeMode={'cover'} source={require('../../assets/imagens/logoBackgroud.png')} >
                <View style={styles.box1}>
                    <Image style={styles.logo} source={require('../../assets/imagens/Pronutrir1.png')} />
                </View>
                <ScrollView style={styles.box2}>
                    <Formik
                        initialValues={{
                            Nome: '',
                            Cpf: '',
                            Telefone: '',
                            Email: '',
                            Senha: '',
                            confirmSenha: ''
                        }}
                        onSubmit={values => {
                            cadastroPessoaFisica(values);
                        }}
                        validationSchema={FormSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, }) => (
                            <View style={styles.box2item1}>
                                <View style={styles.SectionStyle}>
                                    <View style={styles.Icon}>
                                        <AvatarImg fill={'#748080'} width={20} height={20} />
                                    </View>
                                    <TextInput
                                        ref={Nome}
                                        placeholder={'Nome e Sobrenome'}
                                        style={styles.input}
                                        onChangeText={handleChange('Nome')}
                                        onBlur={handleBlur('Nome')}
                                        value={values.Nome}
                                    />
                                </View>
                                {(touched.Nome && errors.Nome) && <Text style={styles.textError}>{errors.Nome}</Text>}
                                <View style={styles.SectionStyle}>
                                    <View style={styles.Icon}>
                                        <AvatarImg fill={'#748080'} width={20} height={20} />
                                    </View>
                                    <TextInputMask
                                        ref={Cpf}
                                        type={'cpf'}
                                        placeholder={"CPF"}
                                        style={styles.input}
                                        onChangeText={handleChange('Cpf')}
                                        onBlur={handleBlur('Cpf')}
                                        value={values.Cpf}
                                        keyboardType='numeric'
                                    />
                                </View>
                                {(touched.Cpf && errors.Cpf) && <Text style={styles.textError}>{errors.Cpf}</Text>}
                                <View style={styles.SectionStyle}>
                                    <View style={styles.Icon}>
                                        <TelefoneImg fill={'#748080'} width={20} height={20} />
                                    </View>
                                    <TextInputMask
                                        ref={Telefone}
                                        style={styles.input}
                                        type={'cel-phone'}
                                        options={{
                                            maskType: 'BRL',
                                            withDDD: true,
                                            //dddMask: '(85)'
                                        }}
                                        placeholder={'(00)00000-0000'}
                                        value={values.Telefone}
                                        onChangeText={handleChange('Telefone')}
                                        onBlur={handleBlur('Telefone')}
                                    />
                                </View>
                                {(touched.Telefone && errors.Telefone) && <Text style={styles.textError}>{errors.Telefone}</Text>}
                                <View style={styles.SectionStyle}>
                                    <View style={styles.Icon}>
                                        <EmailImg fill={'#748080'} width={20} height={20} />
                                    </View>
                                    <TextInput
                                        ref={Email}
                                        placeholder={'Email'}
                                        style={styles.input}
                                        onChangeText={handleChange('Email')}
                                        onBlur={handleBlur('Email')}
                                        value={values.Email}
                                        keyboardType='email-address'
                                    />
                                </View>
                                {(touched.Email && errors.Email) && <Text style={styles.textError}>{errors.Email}</Text>}
                                <View style={styles.SectionStyle}>
                                    <View style={styles.Icon}>
                                        <CadeadoImg fill={'#748080'} width={20} height={20} />
                                    </View>
                                    <TextInput
                                        ref={Senha}
                                        placeholder={"Senha"}
                                        style={styles.input}
                                        onChangeText={handleChange('Senha')}
                                        onBlur={handleBlur('Senha')}
                                        value={values.Senha}
                                        secureTextEntry={true}
                                    />
                                </View>
                                {(touched.Senha && errors.Senha) && <Text style={styles.textError}>{errors.Senha}</Text>}
                                <View style={styles.SectionStyle}>
                                    <View style={styles.Icon}>
                                        <CadeadoImg fill={'#748080'} width={20} height={20} />
                                    </View>
                                    <TextInput
                                        ref={confirmSenha}
                                        placeholder={"Confirmar Senha"}
                                        style={styles.input}
                                        onChangeText={handleChange('confirmSenha')}
                                        onBlur={handleBlur('confirmSenha')}
                                        value={values.confirmSenha}
                                        secureTextEntry={true}
                                    />
                                </View>
                                {(touched.confirmSenha && errors.confirmSenha) && <Text style={styles.textError}>{errors.confirmSenha}</Text>}
                                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                                    <Text style={styles.text}>CADASTRAR</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>

                </ScrollView>
                <Loading activeModal={loading} />
                <MyModalSimples activeModal={modalActive} setActiveModal={setModalActive} label={msnModal} />
            </ImageBackground>
        </SafeAreaView>
    )
}

