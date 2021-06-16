import React, { useRef, useState, useContext } from 'react';
import { Dimensions } from 'react-native';
import { Text, View, Image, TouchableOpacity, Platform, useWindowDimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import FotoClick from '../../assets/svg/circulo.svg';
import ReloadSvg from '../../assets/svg/refresh.svg';
import ConfirmarSvg from '../../assets/svg/checked.svg';
import styles from './style';
import Api from '../../services/api';
import AuthContext from '../../contexts/auth';
import Loading from '../../componentes/Loading';
import moment from 'moment';
import { Svg, Defs, Rect, Mask, Circle } from 'react-native-svg';
import Notification from '../../componentes/Notification';

export default function cameraPerson({ navigation }) {

    const { stateAuth, dispatchAuth } = useContext(AuthContext);
    const { usertasy } = stateAuth;
    const [loading, setLoading] = useState(false);
    const [modalNotification, setModalNotification] = useState({
        active: false,
        message: '',
        type: ''
    });

    const size = Dimensions.get('screen').width / 4

    const refCamera = useRef();

    const [fotoPerfil, setFotoPerfil] = useState(null);

    const takePicture = async () => {
        if (refCamera.current) {
            const options = { quality: 0.5, base64: true, mirrorImage: true, orientation: 'portrait', forceUpOrientation: true, fixOrientation: true};
            const data = await refCamera.current.takePictureAsync(options)
            setFotoPerfil(data.base64);
        }
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
                dispatchAuth({ type: 'setImgPerfil', ImgPerfil: result.iM_PESSOA_FISICA })
            }
            setLoading(false);
            navigation.goBack();
        }).catch(error => {
            setLoading(false);
            setModalNotification(prevState => {
                return { ...prevState, active: true, message: "Algo deu errado tente mais tarde.", type: 'error' }
            });
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
                dispatchAuth({ type: 'setImgPerfil', ImgPerfil: result.iM_PESSOA_FISICA })
            }
            setLoading(false);
            navigation.goBack();
        }).catch(error => {
            setLoading(false);
            setModalNotification(prevState => {
                return { ...prevState, active: true, message: "Algo deu errado tente mais tarde.", type: 'error' }
            });
        })
    }

    const TakeSavePicture = () => {
        if (usertasy.ImgPerfil) {
            PutImgPerfil(usertasy.cD_PESSOA_FISICA, fotoPerfil)
        } else {
            PostImgPerfil(fotoPerfil);
        }
    }

    const TakeReset = () => {
        setFotoPerfil(null);
    }

    const { height, width } = useWindowDimensions();
    const circleRadius = width / 2.5;
    const viewBox = `0 0 ${width} ${height}`

    const WrappedSvg = () => (
        <View style={{ aspectRatio: 1 }}>
            <Svg
                height={height}
                viewBox={viewBox}
            >
                <Defs>
                    <Mask id="mask" >
                        <Rect
                            height={height}
                            width={width}
                            //fill="#fff"
                            fill="rgba(148, 121, 121)"
                        //fill-opacity="0" 
                        />
                        <Circle
                            r={circleRadius}
                            cx={width / 2}
                            cy={height / 4}
                            fill="#000"
                            strokeWidth="8"
                            stroke="green" />
                    </Mask>
                </Defs>
                <Rect
                    height={height}
                    width={width}
                    fill="#ffffff"
                    mask="url(#mask)"
                />
            </Svg>
        </View>
    );

    const AcessoNotAuthorize = () =>(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.textBtn}>Acesso a camera não autorizada.</Text>
        </View>
    );

    const PendingAuthorizationView = () => (
        <View>
            <Text>teste</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                {
                    fotoPerfil ?
                        <View style={Platform.OS === 'ios' ? styles.cameraIosFoto : styles.cameraAndroidFoto}>
                            <Image
                                style={styles.perfilImg}
                                source={{ uri: `data:image/png;base64,${fotoPerfil}` }}
                            />
                        </View>
                        :
                        <RNCamera
                            ref={refCamera}
                            style={Platform.OS === 'ios' ? styles.cameraIos : styles.cameraAndroid}
                            type={RNCamera.Constants.Type.front}
                            flashMode={RNCamera.Constants.FlashMode.auto}
                            autoFocus={RNCamera.Constants.AutoFocus.on}
                            captureAudio={false}
                            keepAudioSession={false}
                            notAuthorizedView={<AcessoNotAuthorize/>}
                            PendingAuthorizationView={<PendingAuthorizationView/>}
                            androidCameraPermissionOptions={{
                                title: 'Permisão para usar a camera',
                                message: 'Precisamos de sua permisão para usar sua camera',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}
                        >
                            <WrappedSvg />
                        </RNCamera>
                }
            </View>
            <View style={styles.box2}>
                {
                    !fotoPerfil ?
                        <View style={styles.cameraElements}>
                            <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => takePicture()} style={styles.capture}>
                                    <FotoClick fill={'#fff'} width={size} height={size} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View style={styles.cameraElements2}>
                            <View style={{ flex: 4, alignItems: 'center' }}>
                                <Text style={styles.textLabel}>Gostou da foto?</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ alignItems: 'center' }} >
                                        <TouchableOpacity onPress={() => TakeReset()} style={styles.btn}>
                                            <ReloadSvg fill={'#fff'} width={size - 20} height={size - 20} />
                                        </TouchableOpacity>
                                        <Text style={styles.textBtn}>Tentar Novamente</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => TakeSavePicture()} style={styles.btn}>
                                            <ConfirmarSvg fill={'#fff'} width={size - 20} height={size - 20} />
                                        </TouchableOpacity>
                                        <Text style={styles.textBtn}>Salvar Foto</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                }
            </View>
            <Loading activeModal={loading} />
            <Notification
                active={modalNotification.active}
                setActive={setModalNotification}
                type={modalNotification.type}
                message={modalNotification.message}
            />
        </View>
    )
}


