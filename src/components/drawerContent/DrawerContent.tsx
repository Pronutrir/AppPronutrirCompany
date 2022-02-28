import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Dimensions,
    Platform,
} from 'react-native';
import { Image } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '../../components/Loading/Loading';
import AuthContext from '../../contexts/auth';
import { IPerfis } from '../../reducers/UserReducer';
import auth from '@react-native-firebase/auth';
import ArrowBackImg from '../../assets/svg/arrowBack.svg';
import AvatarImg from '../../assets/svg/avatar.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import SelectedDropdown from '../selectedDropdown/SelectedDropdown';
import { Idata } from '../../components/selectedDropdown/SelectedDropdown';

interface Props {
    navigation: any;
}

const DrawerContent: React.FC<Props> = ({ navigation }: Props) => {
    const size = Dimensions.get('screen').width / 15;

    const {
        stateAuth: {
            usertasy,
            usertasy: { usuariO_FUNCIONARIO_PERFIL },
            PerfilSelected
        },
        dispatchAuth,
    } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const logout = () => {
        Alert.alert(
            'Mensagem',
            'Deseja Realmente sair?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () =>
                        auth()
                            .signOut()
                            .then(() => {
                                dispatchAuth({ type: 'delUser', payload: '' });
                                setLoading(true);
                            })
                            .catch((error) => {
                                Alert.alert('Erro', error.code);
                            }),
                },
            ],
            { cancelable: true },
        );
    };

    const RefactoryData = () => {
        const result = usuariO_FUNCIONARIO_PERFIL.map((element) => {
            return { label: element.dS_PERFIL, value: element };
        });
        return result.sort((a, b) => {
            return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
        });
    };

    const SelectedPerfilApp = (item: Idata) => {
        dispatchAuth({type: 'setPerfilApp', payload: item.value})
    }

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <Image
                    style={styles.imgLogo}
                    source={require('../../assets/imagens/PRONUTRIR-preview.png')}
                />
                <Text style={styles.text1}>Bem Vindo</Text>
                <Text style={styles.text2}>
                    {usertasy ? usertasy.nM_PESSOA_FISICA : null}
                </Text>
                <Text style={styles.text2}>
                    {usertasy
                        ? `*** . *** . ${usertasy.nR_CPF.substring(
                              6,
                              9,
                          )}-${usertasy.nR_CPF.substring(9, 11)}`
                        : null}
                </Text>
            </View>
            <View style={styles.box2}>
                <SelectedDropdown data={RefactoryData()} onChange={SelectedPerfilApp} value={PerfilSelected} placeholder={'Perfil do App'} />
                {/* <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Perfil')}>
                    <AvatarImg fill={'#748080'} width={size} height={size} />
                    <Text style={styles.text3}>Perfil</Text>
                </TouchableOpacity> */}
            </View>
            <View style={styles.box3}>
                <TouchableOpacity
                    style={styles.btnSair}
                    onPress={() => logout()}>
                    <ArrowBackImg fill={'#748080'} width={size} height={size} />
                    <Text style={styles.text3}>Sair</Text>
                </TouchableOpacity>
                <Text style={styles.text2}>Versão 1.5</Text>
            </View>
            <Loading activeModal={loading} />
        </View>
    );
};

export default DrawerContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box1: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box2: {
        flex: 1,
        paddingHorizontal: 35,
    },
    box3: {
        flex: 1,
        paddingHorizontal: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgLogo: {
        width: Dimensions.get('screen').width / 5,
        height: Dimensions.get('screen').width / 5,
    },
    text1: {
        fontSize: RFValue(25, 680),
        color: '#1E707D',
    },
    text2: {
        fontSize: RFValue(15, 680),
        color: '#7A8B8E',
        padding: 15,
        textAlign: 'center',
    },
    text3: {
        fontSize: RFValue(21, 680),
        color: '#7A8B8E',
        marginHorizontal: 10,
    },
    btn: {
        width: '100%',
        height: '55%',
        alignItems: 'center',
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            },
        }),
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    btnSair: {
        width: '50%',
        height: '45%',
        alignItems: 'center',
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            },
        }),
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});
