import React, { useState, memo, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Modal, Platform } from 'react-native';
import BtnOptions from '../buttons/BtnOptions';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
interface Props {
    activeModal: boolean;
    message: string;
    onpress(): void;
    setActiveModal(parms: boolean): void;
};

const ModalCentralized: React.FC<Props> = ({ activeModal = false, message = 'teste', onpress, setActiveModal }: Props) => {

    /* useEffect(() => {
       setActive(activeModal);
    }, [activeModal]) */

    const Ok = () => {
        setActiveModal(false);
        onpress();
    }
    const Cancel = () => {
        setActiveModal(false);
    }

    return (
        <View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={activeModal}
            >
                <View style={styles.centeredView}>
                    <SafeAreaView style={styles.modalView}>
                        <View style={styles.menssage}>
                            <Text style={styles.textMenssage}>{message}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
                            <BtnOptions valueText={"Ok"} onPress={() => Ok()}/>
                            <BtnOptions valueText={"Cancelar"} onPress={() => Cancel()}/>
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
        fontSize: RFValue(16, 680),
        padding: 10
    }
})

export default memo(ModalCentralized);