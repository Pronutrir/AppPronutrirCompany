import React, { useContext } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { TextMask, TextInputMask } from 'react-native-masked-text';
import { foneMask } from '../../../services/validacoes';
import AuthContext from '../../../contexts/auth';

import UserSvg from '../../../assets/svg/user.svg';
import ProximoSvg from '../../../assets/svg/proximo.svg';
import moment from 'moment';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export default function DadosContato({ navigation }) {
    const { stateAuth, dispatchAuth } = useContext(AuthContext);
    const { usertasy } = stateAuth;

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <Text style={styles.textLabelInfo}>
                    Mantenha seus dados atualizados
                </Text>
            </View>
            <View style={styles.box2}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('AtualizarEmail')}>
                    <View style={styles.item1}>
                        {/* <HospitalLocationSvg fill={'#748080'} width={40} height={40} /> */}
                    </View>
                    <View style={styles.item2}>
                        <Text style={styles.text}>E-mail</Text>
                        <Text style={styles.textInfo}>{usertasy.dS_EMAIL}</Text>
                    </View>
                    <View style={styles.item3}>
                        <ProximoSvg fill={'#748080'} width={15} height={15} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('AtualizarCelular')}>
                    <View style={styles.item1}>
                        {/* <HospitalLocationSvg fill={'#748080'} width={40} height={40} /> */}
                    </View>
                    <View style={styles.item2}>
                        <Text style={styles.text}>Celular</Text>
                        <Text style={styles.textInfo}>
                            {foneMask(
                                `${usertasy.nR_DDD_CELULAR} ${usertasy.nR_TELEFONE_CELULAR}`,
                            )}
                        </Text>
                    </View>
                    <View style={styles.item3}>
                        <ProximoSvg fill={'#748080'} width={15} height={15} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    box1: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imgLogo: {
        margin: 10,
        width: 120,
        height: 120,
    },
    text1: {
        fontSize: RFValue(15, 680),
        color: '#1E707D',
    },
    text2: {
        fontSize: RFValue(15, 680),
        color: '#7A8B8E',
        padding: 5,
        textAlign: 'center',
    },
    text3: {
        fontSize: RFValue(21, 680),
        color: '#7A8B8E',
        marginHorizontal: 10,
    },
    TextAgendar: {
        color: '#08948A',
        fontWeight: 'bold',
        fontSize: RFValue(16, 680),
        marginRight: 20,
    },
    card: {
        width: '100%',
        height: Dimensions.get('screen').height / 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 5,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    item1: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item2: {
        flex: 2,
        alignItems: 'flex-start',
    },
    item3: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: RFValue(18, 680),
        color: '#748080',
    },
    textInfo: {
        fontSize: RFValue(16, 680),
        color: '#748080',
        opacity: 0.5,
    },
    textLabelInfo: {
        fontSize: RFValue(18, 680),
        color: '#08948A',
        opacity: 0.6,
    },
});
