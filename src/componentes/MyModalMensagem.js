import React from 'react';
import { View, StyleSheet, Modal, Text, Image, TouchableOpacity } from 'react-native';
import MedicoColorImg from '../assets/svg/medicoColor.svg';
import OkImg from '../assets/svg/ok.svg';
import CancelImg from '../assets/svg/cancel.svg';

export default function MyModalMensagem({ activeModal, setActiveModal, action, label }) {

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
                            <MedicoColorImg fill={'#748080'} width={40} height={40} />
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text}>{label}</Text>
                        </View>
                        <View style={styles.boxBtn}>
                            <TouchableOpacity style={styles.btn} onPress={() => cancel()}>
                                <CancelImg fill={'#748080'} width={20} height={20} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={() => ok()}>
                                <OkImg fill={'#08948A'} width={20} height={20} />
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
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        elevation: 2,
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
        fontSize: 16,
        textAlign: 'center'
    }
})
