import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    UIManager,
    Image,
    LayoutAnimation,
    Pressable
} from 'react-native';

import PilulaImg from '../assets/svg/medical-prescription.svg';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ConversorMedicamento } from '../services/conversorUnidadeMedicamento';


if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TouchableShowHideMedicamentos({ item }) {

    const [expanded, setExpanded] = useState(true);

    return (
        <View style={styles.container}>
            <Pressable onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                setExpanded(!expanded);
            }}>
                <View style={styles.button}>
                    <View style={styles.buttonItem1}>
                        <PilulaImg width={30} height={30} />
                    </View>
                    <View style={styles.buttonItem2}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.Label}>Medicamento </Text>
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
            </Pressable>
            {expanded && (
                <View style={styles.boxContainer}>
                    <View style={styles.box1}>
                        <Text style={styles.Label}>Nome: </Text>
                        <Text style={styles.text}>{item.produto}</Text>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 2,
        marginTop: 10,
    },
    button: {
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 3,
                    height: 5
                },
                shadowOpacity: 0.3,
                shadowRadius: 10,
            },
            android: {
                elevation: 3
            }
        }),
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: 7,
        paddingVertical: 10,
        borderLeftColor: '#08948A',
        borderRightColor: '#08948A',
        borderLeftWidth: 3,
        borderRightWidth: 3
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
        fontSize: RFValue(16, 680),
        marginTop: 5,
    },
    text: {
        color: '#7C9292',
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
        width: 20,
        height: 20
    },
    box: {
        width: '100%',
    },
    box1: {
        width: '100%',
        alignItems: 'flex-start',
    },
    boxContainer: {
        backgroundColor: '#E6ECEC',
        marginTop: 5,
        padding: 10,
        marginHorizontal: 2,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
    },
    btns: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});
