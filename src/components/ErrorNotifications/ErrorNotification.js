import React, { useContext, useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Modal, TouchableOpacity } from 'react-native';
import OkImg from '../../assets/svg/ok.svg';
import { RFValue } from "react-native-responsive-fontsize";
import ErrorContext from "../../contexts/errorNotification";

export default function ErrorNotification() {

    const { error, removeError } = useContext(ErrorContext);

    const size = Dimensions.get('screen').width / 20

    const disabled = () => {
        removeError();
    }

    return (
        <View>
            <Modal
                animationType='fade'
                transparent={true}
                //backdropOpacity={0.9}
                visible={!!error}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.box}>
                            <Text style={styles.Titulo}>Aviso:</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text}>
                                {error && error.message}
                            </Text>
                        </View>
                        <View style={styles.boxBtn}>
                            <TouchableOpacity style={styles.btn} onPress={() => disabled()}>
                                <OkImg fill={'#08948A'} width={20} height={20} />
                                <Text style={styles.text}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.8)'

    },
    modalView: {
        backgroundColor: "#ffff",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
    },
    box: {
        marginVertical: 10,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        flex: 1,
        backgroundColor: '#fff',
        opacity: 0.9,
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
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    boxBtn: {
        marginVertical: 20,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        color: '#7C9292',
        fontSize: RFValue(14, 680),
        textAlign: 'justify',
        margin: 5
    },
    Titulo: {
        color: '#08948A',
        fontWeight: 'bold',
        fontSize: RFValue(18, 680)
    },
    textOk: {
        color: '#08948A',
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    box1: {
        flexDirection: 'row',
        marginVertical: 20,
        alignSelf: 'flex-start'
    },
    labelDescription: {
        fontSize: RFValue(16, 680),
        color: '#08948A'
    },
    description: {
        fontSize: RFValue(16, 680),
        color: '#08948A'
    },
    boxBtn: {
        marginVertical: 20,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    btn: {
        width: 80,
        height: 50,
        backgroundColor: '#fff',
        opacity: 0.9,
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
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    },
})
