import React from 'react';
import { StyleSheet, Text, View, Modal, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function MyModalHorarios({ modalActive, setModalActive, Horarios, addAgenda }) {

    const toggleModal = () => {
        setModalActive(!modalActive)
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalActive}
                presentationStyle={'overFullScreen'}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.labelHrs}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => toggleModal()}
                            >
                                <Text style={styles.textClose}>X</Text>
                            </TouchableOpacity>
                            <Text style={styles.textLabel}>Horários</Text>
                        </View>
                        <ScrollView style={styles.horarios}>
                            {Horarios.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index.toString()} onPress={() => addAgenda(item)}>
                                        <Text style={styles.texthrs}>{ moment(item.dT_AGENDA).format('HH:mm') }</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        alignItems: 'center'
        //marginTop: '80%',
    },
    modalView: {
        borderRadius: 10,
        backgroundColor: "#FFF",
        paddingBottom: 0,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: (Dimensions.get('window').width / 2),
        height: (Dimensions.get('window').height / 3),
        marginTop: '70%'
    },
    labelHrs: {
        justifyContent: 'center',
        width: '100%',
    },
    textLabel: {
        marginTop: -10,
        fontSize: RFValue(20, 680),
        alignSelf: 'center',
        color: '#08948A',
        fontWeight: 'bold'
    },
    textClose: {
        color: "#7C9292",
        fontWeight: "bold",
        fontSize: RFValue(20, 680),
        alignSelf: 'flex-end',
        zIndex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    texthrs: {
        letterSpacing: 3,
        fontSize: RFValue(24, 680),
        margin: 8,
        color: '#7C9292',
        fontWeight: 'bold'
    },
    horarios: {
        margin: 10,
    },
    closeButton:{
        
    }
})
