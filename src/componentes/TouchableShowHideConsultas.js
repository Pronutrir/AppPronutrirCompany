import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, LayoutAnimation, UIManager, Image, Linking, Dimensions } from 'react-native';

import moment from 'moment';
import Share from 'react-native-share';
import MedicoColorImg from '../assets/svg/medicoColor.svg';
import ExcluirImg from '../assets/svg/excluir.svg';
import Compartilhar from '../assets/svg/compartilhar.svg';
import LocalizacaoImg from '../assets/svg/localizacao.svg'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FormatText } from '../services/validacoes';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TouchableShowHideConsultas({ item, option1, option2 }) {

    const size = Dimensions.get('screen').width / 10

    const pronutirFortaleza = 'https://goo.gl/maps/3Mv4oDGMVAenesFg6';
    const pronutrirCarriri = 'https://goo.gl/maps/qLwmSBdDggXUTVz5A';
    const pronutrirSobral = 'https://goo.gl/maps/c5rjxfwXYcUMUNXL7';

    const [expanded, setExpanded] = useState(false);

    const [status, setStatus] = useState();

    const statusConsulta = item => {
        switch (item) {
            case "N":
                return styles.statusNormal
                break;
            case "E":
                return styles.statusExecutado
                break;
            case "C":
                return styles.statusCancelado
                break;
            case "I":
                return styles.statusAusente
                break;
            case "F":
                return styles.statusAusente
                break;
            default:
                return styles.statusProcessInterno
                break;
        }
    }

    const nomeStatus = item => {
        switch (item) {
            case "N":
                return "Agendado"
                break;
            case "E":
                return "Concluído"
                break;
            case "C":
                return "Cancelado"
                break;
            case "I":
                return "Falta"
                break;
            case "F":
                return "Falta"
                break;
            default:
                return "Indefinido"
                break;
        }
    }

    const Compatilhar = () => {
        const shareOptions = {
            title: 'Dados da consulta',
            message: "dados da consulta",
            url: "dados da consulta",
            social: Share.Social.WHATSAPP,
            whatsAppNumber: "9199999999",  // country code + phone number
            filename: 'test', // only for base64 file in Android
        };
        Share.open(shareOptions)
            .then((res) => { console.log(res) })
            .catch((err) => { err && console.log(err); });
    }

    const selectEstabelecimento = (codEstabelecimento) => {
        switch (codEstabelecimento) {
            case 7: return pronutirFortaleza
                break;
            case 12: return pronutrirSobral
                break;
            case 8: return pronutrirCarriri
                break;
            default: return pronutirFortaleza
                break;
        }
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                setExpanded(!expanded);
            }}>
                <View style={[styles.button, statusConsulta(item.iE_STATUS_AGENDA)]}>
                    <View style={styles.buttonItem1}>
                        <MedicoColorImg width={size} height={size} />
                    </View>
                    <View style={styles.buttonItem2}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.Label}>Consulta: </Text>
                            <Text style={styles.textLabel}>{FormatText(item.dS_ESPECIALIDADE)}</Text>
                        </View>
                        <View >
                            <Text style={styles.Label}>Médico(a): </Text>
                            <Text style={styles.textLabel}>{FormatText(item.nM_GUERRA)}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonItem3}>
                        <Image
                            style={styles.arrowImg}
                            source={expanded ?
                                require('../assets/imagens/seta-para-cima.png') :
                                require('../assets/imagens/seta-para-baixo.png')
                            }
                        />
                    </View>
                </View>
            </TouchableHighlight>
            {expanded && (
                <View style={styles.boxContainer}>
                    <View style={styles.box1}>
                        <Text style={styles.Label}>Detalhes: </Text>
                        <View style={styles.btns}>
                            {/* <TouchableOpacity style={styles.btn} onPress={() => Compatilhar()}>
                                <Compartilhar fill={'#748080'} width={25} height={25} />
                            </TouchableOpacity> */}
                            {
                                item.iE_STATUS_AGENDA === "N" &&
                                <TouchableOpacity style={styles.btn} onPress={() => option1(item)}>
                                    <ExcluirImg fill={'#748080'} width={30} height={30} />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.boxLabel}>
                            <Text style={styles.Label}>Status: </Text>
                            <Text style={styles.text}>{nomeStatus(item.iE_STATUS_AGENDA)}</Text>
                        </View>
                        <View style={styles.boxLabel}>
                            <Text style={styles.Label}>Consulta: </Text>
                            <Text style={styles.text}>{FormatText(item.dS_ESPECIALIDADE)}</Text>
                        </View>
                        <View style={styles.boxLabel}>
                            <Text style={styles.Label}>Médico(a): </Text>
                            <Text style={styles.text}>{FormatText(item.nM_GUERRA)}</Text>
                        </View>
                        <View style={styles.boxLabel}>
                            <Text style={styles.Label}>Convênio: </Text>
                            <Text style={styles.text}>{FormatText(item.dS_CONVENIO)}</Text>
                        </View>
                        <View style={styles.boxLabel}>
                            <Text style={styles.Label}>Plano: </Text>
                            <Text style={styles.text}>{FormatText(item.dS_PLANO)}</Text>
                        </View>
                        <View style={styles.boxLabelLink}>
                            <Text style={styles.Label}>Endereço: </Text>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Linking.openURL(selectEstabelecimento(item.cD_ESTABELECIMENTO))}>
                                <Text style={styles.text}>{FormatText(item.endereco)}<LocalizacaoImg width={25} height={25} /></Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.boxLabel}>
                            <Text style={styles.Label}>Data - Hora : </Text>
                            <Text style={styles.text}>{moment(item.dT_AGENDA).format('DD-MM-YYYY - HH:mm')} hrs</Text>
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 2,
        marginTop: 10,
    },
    button: {
        flex: 1,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3
            }
        }),
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 7,
        paddingVertical: 10,
        borderLeftColor: '#08948A',
        borderLeftWidth: 5
    },
    buttonItem1: {
        flex: 1,
        alignItems: 'center'
    },
    buttonItem2: {
        flex: 4,
    },
    buttonItem3: {
        flex: 1,
        alignItems: 'center'
    },
    statusNormal: {
        borderLeftColor: '#0ac9eb'
    },
    statusCancelado: {
        borderLeftColor: '#ff5b5beb'
    },
    statusAusente: {
        borderLeftColor: '#f1ca3e'
    },
    statusExecutado: {
        borderLeftColor: '#08948A'
    },
    statusProcessInterno: {
        borderLeftColor: '#f1ca3e'
    },
    Label: {
        color: '#08948A',
        fontSize: RFValue(16, 680),
        marginTop: 5,
    },
    textLabel: {
        color: '#7C9292',
        fontSize: RFValue(14, 680),
        marginTop: 5
    },
    text: {
        color: '#7C9292',
        fontSize: RFValue(16, 680),
        marginTop: 5
    },
    textLink: {
        color: '#1a0dab',
        fontSize: RFValue(16, 680),
        marginTop: 5
    },
    boxLabel: {
        flexDirection: 'row'
    },
    boxLabelLink: {
        flexDirection: 'column'
    },
    arrowImg: {
        width: Dimensions.get('screen').width / 20,
        height: Dimensions.get('screen').width / 20
    },
    Img: {
        width: 40,
        height: 40
    },
    btnImg: {
        width: 25,
        height: 25
    },
    box: {
        width: '100%',
        marginVertical: 10
    },
    box1: {
        width: '100%',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    boxContainer: {
        backgroundColor: '#EDF5F4',
        marginTop: 3,
        padding: 10
    },
    btns: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    btn: {
        marginHorizontal: 20,
    }
});
