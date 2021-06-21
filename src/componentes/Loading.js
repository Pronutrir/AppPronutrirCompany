import React from 'react';
import { View, StyleSheet, Image, Modal, Dimensions } from 'react-native';

export default function Loading({ activeModal }) {
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                backdropOpacity={0.3}
                visible={activeModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image style={styles.modalImg} source={require('../assets/imagens/logo.gif')} />
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
        backgroundColor: '#847e7e',
        opacity: 0.7
    },
    modalView: {
        backgroundColor: "#fff",
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
        elevation: 5
    },
    modalImg: {
        width: Dimensions.get('screen').width / 10,
        height: Dimensions.get('screen').width / 10,
    },
})
