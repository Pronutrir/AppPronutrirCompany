import React from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MyModalSimples({ activeModal, setActiveModal, label }) {

    const navigation = useNavigation();

    const ok = () => {
        setActiveModal(false);
        navigation.goBack();
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                backdropOpacity={0.9}
                visible={activeModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <View style={styles.box}>
                            <Text style={styles.textLabel}>Mensagem:</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text}>{label}</Text>
                        </View>
                        <View style={styles.boxBtn}>
                            <TouchableOpacity style={styles.btn} onPress={() => ok()}>
                            <Text style={styles.textBtn}>OK</Text>
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
        height: 40,
        backgroundColor: '#08948A',
        elevation: 2,
        alignItems: 'center',
        borderRadius: 5,
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
    },
    textLabel:{
        color: '#08948A',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textBtn:{
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})
