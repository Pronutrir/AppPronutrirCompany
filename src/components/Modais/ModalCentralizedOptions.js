import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Modal } from 'react-native';
import BtnOptions from '../buttons/BtnOptions';
import propTypes from 'prop-types';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const ModalCentralized = ({ activeModal = true, message = 'teste' }) => {

    const [active, setActive] = useState(activeModal);

    return (
        <View>
            <Modal
                animationType='fade'
                transparent={true}
                backdropOpacity={0.9}
                visible={active}
            >
                <View style={styles.centeredView}>
                    <SafeAreaView style={styles.modalView}>
                        <View style={styles.menssage}>
                            <Text style={styles.textMenssage}>{message}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
                            <BtnOptions valueText={"Ok"}/>
                            <BtnOptions valueText={"Cancelar"} onPress={() => setActive(false)}/>
                        </View>
                    </SafeAreaView>
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
        backgroundColor: 'rgba(0,0,0,.8)'
    },
    modalView: {
        padding: 10,
        backgroundColor: "#ffff",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
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
                elevation: 3,
            }
        })
    },
    menssage:{
        
    },
    textMenssage:{
        padding: 10
    }
})

ModalCentralized.propTypes = {
    activeModal: propTypes.bool
}

ModalCentralized.defaultProps = {
    activeModal: false
}

export default ModalCentralized;