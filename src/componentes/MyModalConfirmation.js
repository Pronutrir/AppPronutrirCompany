import React from 'react';
import { View, StyleSheet, Modal, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import MedicoColorImg from '../assets/svg/medicoColor.svg';
import OkImg from '../assets/svg/ok.svg';
import CancelImg from '../assets/svg/cancel.svg';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function MyModalConfirmation({ activeModal, setActiveModal, action, label }) {

    const size = Dimensions.get('screen').width / 20

    const cancel = () => {
        setActiveModal(false);
    }

    const ok = () => {
        action();
        setActiveModal(false);
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                //backdropOpacity={0.9}
                visible={activeModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.box}>
                            <MedicoColorImg fill={'#748080'} width={size + 20} height={size + 20} />
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text}>{label}</Text>
                        </View>
                        <View style={styles.boxBtn}>
                            <TouchableOpacity style={styles.btn} onPress={() => cancel()}>
                                <CancelImg fill={'#f44336'} width={size} height={size} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={() => ok()}>
                                <OkImg fill={'#08948A'} width={size} height={size} />
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'transparent',
    },
    modalView: {
        opacity: 20,
        backgroundColor: "#ffff",
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '60%',
    },
    box: {
        marginVertical: 10,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        width: Dimensions.get('screen').width / 8,
        height: Dimensions.get('screen').width / 8,
        backgroundColor: '#fff',
        ...Platform.select({
            ios:{
                shadowOffset:{
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android:{
                elevation: 3,
            }
        }),
        alignItems: 'center',
        borderRadius: 30,
        justifyContent: 'center',
    },
    boxBtn: {
        marginVertical: 10,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    img: {
        resizeMode: 'center'
    },
    text: {
        color: '#7C9292',
        fontSize: RFValue(16, 680),
        textAlign: 'center'
    }
})
