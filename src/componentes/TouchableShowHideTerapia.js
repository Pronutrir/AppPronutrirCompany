import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    UIManager,
    TouchableHighlight,
    Image,
    LayoutAnimation,
    TouchableOpacity
} from 'react-native';

import MedicoColorImg from '../assets/svg/medicoColor.svg';
import Quimioterapia from '../assets/svg/quimioterapia.svg';
import moment from 'moment';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TouchableShowHideTerapia({ item }) {

    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                setExpanded(!expanded);
            }}>
                <View style={styles.button}>
                    <View style={styles.buttonItem1}>
                        <MedicoColorImg width={30} height={30} />
                    </View>
                    <View style={styles.buttonItem2}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Label}>Número do Ciclo: </Text>
                            <Text style={styles.text}>{item.nR_CICLO}</Text>
                        </View>
                        <Text style={styles.Label}>Médico(a):</Text>
                        <Text style={styles.text}>{item.nM_GUERRA}</Text>
                    </View>
                    <View style={styles.buttonItem3}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Label}>Data: </Text>
                            <Text style={styles.text}>{moment(item.dT_REAL).format('DD-MM-YYYY')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Label}>Hora: </Text>
                            <Text style={styles.text}>{moment(item.dT_REAL).format('HH:mm')}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonItem4}>
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
                            <TouchableOpacity style={styles.btn} onPress={() => Compatilhar()}>
                                <Quimioterapia fill={'#748080'} width={35} height={35} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View style={styles.boxLabel}>
                            <Text style={styles.Label}>Protocolo: </Text>
                            <Text style={styles.text}>{item.cD_PROTOCOLO}</Text>
                        </View>
                        <View style={styles.boxLabel}>
                            <Text style={styles.Label}>Medicação: </Text>
                            <Text style={styles.text}>{item.nM_MEDICACAO}</Text>
                        </View>
                        <View style={styles.boxLabel}>
                            <Text style={styles.Label}>Médico(a): </Text>
                            <Text style={styles.text}>{item.nM_GUERRA}</Text>
                        </View>
                        <View style={styles.boxLabel}>
                            <Text style={styles.Label}>Convênio: </Text>
                            <Text style={styles.text}>{item.dS_CONVENIO}</Text>
                        </View>
                        <View style={styles.boxLabel}>
                            <Text style={styles.Label}>Local: </Text>
                            <Text style={styles.text}>{item.nM_FANTASIA_ESTAB}</Text>
                        </View>
                        <View style={styles.boxLabel}>
                            <Text style={styles.Label}>Data - Hora : </Text>
                            <Text style={styles.text}>{moment(item.dT_REAL).format('DD-MM-YYYY - HH:mm')} hrs</Text>
                        </View>
                        <View style={styles.boxLabel}>
                            <Text style={styles.Label}>Ciclo: </Text>
                            <Text style={styles.text}>{item.nR_CICLO} - ({item.dS_DIA_CICLO})</Text>
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
        elevation: 3,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
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
        flex: 2.5,
        alignSelf: 'flex-start'
    },
    buttonItem4: {
        flex: 1,
        alignItems: 'center'
    },
    statusNormal: {
        borderLeftColor: '#08948A'
    },
    statusCancelado: {
        borderLeftColor: '#ff5b5beb'
    },
    statusExecutado: {
        borderLeftColor: '#9DA3AB'
    },
    Label: {
        color: '#08948A',
        fontSize: 12,
        marginTop: 5,
    },
    text: {
        color: '#7C9292',
        fontSize: 12,
        marginTop: 5
    },
    textLink: {
        color: '#1a0dab',
        fontSize: 16,
        marginTop: 5
    },
    boxLabel: {
        flexDirection: 'row'
    },
    boxLabelLink: {
        flexDirection: 'column'
    },
    arrowImg: {
        width: 20,
        height: 20
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
    },
    box1: {
        width: '100%',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
