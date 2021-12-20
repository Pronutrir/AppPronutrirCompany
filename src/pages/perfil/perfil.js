import React, { useContext, useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import AuthContext from '../../contexts/auth';

import MyModaloptions from '../../componentes/MyModalOptions';
import styles from './style';
import UserSvg from '../../assets/svg/user.svg';
import ProximoSvg from '../../assets/svg/proximo.svg';
import PhotoSvg from '../../assets/svg/foto.svg';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Api from '../../services/api';
import moment from 'moment';
import Notification from '../../componentes/Notification';
import Loading from '../../components/Loading/Loading';
import LoadingBall from '../../components/Loading/LoadingBall';

export default function perfil({ navigation }) {

    const size = Dimensions.get('screen').width / 18

    const { stateAuth, dispatchAuth } = useContext(AuthContext);
    const { usertasy } = stateAuth;

    const [imageSource, setImageSource] = useState();
    const [modalActive, setModalActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalNotification, setModalNotification] = useState({
        active: false,
        message: '',
        type: ''
    });

    const options = {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200
    }

    const PostImgPerfil = (imgBase64) => {
        setLoading(true);
        Api.post('PessoaFisica/InserirImagemPerfil', {
            cD_PESSOA_FISICA: usertasy.cD_PESSOA_FISICA,
            base64image: imgBase64,
            dT_ATUALIZACAO: moment().format(),
            dT_ATUALIZACAO_NREC: moment().format(),
            nM_USUARIO_NREC: "AppMobile",
            iE_FOTO_PERM_TWS: "S",
            nM_USUARIO: "AppMobile"
        }).then(response => {
            const { result } = response.data
            if (result) {
                dispatchAuth({ type: 'setImgPerfil', payload: result.iM_PESSOA_FISICA })
            }
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            setModalNotification(prevState => {
                return { ...prevState, active: true, message: "algo deu errado, tente mais tarde.", type: 'error' }
            })
        })
    }

    const PutImgPerfil = (cD_PESSOA_FISICA, imgBase64) => {
        setLoading(true);
        Api.put(`PessoaFisica/PutFotoPerfil/${cD_PESSOA_FISICA}`, {
            cD_PESSOA_FISICA: usertasy.cD_PESSOA_FISICA,
            base64image: imgBase64,
            dT_ATUALIZACAO: moment().format(),
            dT_ATUALIZACAO_NREC: moment().format(),
            nM_USUARIO_NREC: "AppMobile",
            iE_FOTO_PERM_TWS: "S",
            nM_USUARIO: "AppMobile"
        }).then(response => {
            const { result } = response.data
            if (result) {
                dispatchAuth({ type: 'setImgPerfil', payload: result.iM_PESSOA_FISICA })
            }
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            setModalNotification(prevState => {
                return { ...prevState, active: true, message: "algo deu errado, tente mais tarde.", type: 'error' }
            })
        })
    }

    const GetImgPerfil = () => {
        Api.get(`PessoaFisica/DadosFotoPerfilPessoaFisica?cpf=${usertasy.nR_CPF}`).then(response => {
            const { result } = response.data
            if (result) {
                dispatchAuth({ type: 'setImgPerfil', payload: result.iM_PESSOA_FISICA })
            }else{
                dispatchAuth({ type: 'setImgPerfil', payload: null })
            }
        }).catch(error => {
            setModalNotification(prevState => {
                return { ...prevState, active: true, message: "algo deu errado, tente mais tarde.", type: 'error' }
            })
        })
    }

    const showImagePicker = () => {
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
            }
            if (response.errorMessage) {
                setModalNotification(prevState => {
                    return { ...prevState, active: true, message: response.errorMessage, type: 'error' }
                });
            }
            if (usertasy.ImgPerfil && response.base64) {
                PutImgPerfil(usertasy.cD_PESSOA_FISICA, response.base64)
            }
            if (!usertasy.ImgPerfil && response.base64) {
                PostImgPerfil(response.base64);
            }
            setModalActive(false);
        });
    }

    const ShowCameraPicker = () => {
        setModalActive(false);
        navigation.navigate('CameraPerson');
    }

    const OptionsModal = () => {
        setModalActive(true);
    }

    useEffect(() => {
        GetImgPerfil();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <TouchableOpacity style={styles.boxImg} onPress={() => OptionsModal()}>
                    {
                        !usertasy.ImgPerfil ?
                            usertasy.ImgPerfil === undefined ?
                                <View style={{ width: 50, margin: 30 }}>
                                    <LoadingBall active={true} width={50} />
                                </View>
                                :
                                <UserSvg width={size + 60} height={size + 60} />
                            :
                            <Image
                                style={styles.perfilImg}
                                source={{ uri: `data:image/png;base64,${usertasy.ImgPerfil}` }}
                                fadeDuration={2000}
                            />
                    }
                    <PhotoSvg width={size} height={size} fill="#748080" />
                </TouchableOpacity>
                <TextInput
                    editable={false}
                    style={styles.inputText}
                    value={usertasy && usertasy.nM_PESSOA_FISICA}
                    enabled={false}
                />
            </View>
            <View style={styles.box2}>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('InformacoesPessoais')}>
                    <View style={styles.item1}>
                        {/* <HospitalLocationSvg fill={'#748080'} width={40} height={40} /> */}
                    </View>
                    <View style={styles.item2}>
                        <Text style={styles.text}>Informações pessoais</Text>
                        <Text style={styles.textInfo}>Nome completo e data nascimento</Text>
                    </View>
                    <View style={styles.item3}>
                        <ProximoSvg fill={'#748080'} width={size} height={size} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DadosContato')}>
                    <View style={styles.item1}>
                        {/* <HospitalLocationSvg fill={'#748080'} width={40} height={40} /> */}
                    </View>
                    <View style={styles.item2}>
                        <Text style={styles.text}>Dados de contato</Text>
                        <Text style={styles.textInfo}>Email e telefone de contato</Text>
                    </View>
                    <View style={styles.item3}>
                        <ProximoSvg fill={'#748080'} width={size} height={size} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Credenciais')}>
                    <View style={styles.item1}>
                        {/* <HospitalLocationSvg fill={'#748080'} width={size} height={size} /> */}
                    </View>
                    <View style={styles.item2}>
                        <Text style={styles.text}>Credenciais</Text>
                        <Text style={styles.textInfo}>Dados de acesso a conta</Text>
                    </View>
                    <View style={styles.item3}>
                        <ProximoSvg fill={'#748080'} width={size} height={size} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AlterarSenha')}>
                    <View style={styles.item1}>
                        {/* <HospitalLocationSvg fill={'#748080'} width={size} height={size} /> */}
                    </View>
                    <View style={styles.item2}>
                        <Text style={styles.text}>Alterar senha</Text>
                        <Text style={styles.textInfo}>Atualização de acesso</Text>
                    </View>
                    <View style={styles.item3}>
                        <ProximoSvg fill={'#748080'} width={size} height={size} />
                    </View>
                </TouchableOpacity>
                <MyModaloptions
                    activeModal={modalActive}
                    setActiveModal={setModalActive}
                    option1={showImagePicker}
                    option2={ShowCameraPicker}
                />
            </View>
            <Notification
                active={modalNotification.active}
                setActive={setModalNotification}
                type={modalNotification.type}
                message={modalNotification.message}
            />
            <Loading activeModal={loading} />
        </View>
    )
}


