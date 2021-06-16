import React from 'react';
import { StyleSheet, Dimensions, Text, View, Modal, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import Cancel from '../assets/svg/cancel.svg';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import moment from 'moment';

const MyModal = ({ modalActive, postagem, mudarState }) => {

    const toggleModal = () => {
        mudarState(!modalActive)
    }

    return (
        <View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalActive}
            >
                <SafeAreaView style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.box1}>
                            <View style={styles.boxBtn}>
                                <TouchableOpacity
                                    style={{ ...styles.openButton }}
                                    onPress={() => toggleModal()}
                                >
                                    <Cancel fill={'#748080'} width={15} height={15} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.imgView}>
                                <Image style={styles.img} source={{ uri: postagem.media_url }} />
                            </View>
                        </View>
                        <ScrollView style={styles.box2}>
                            <Text style={[styles.modalText, styles.modalTextTitulo]}>{postagem.username}</Text>
                            {
                                <Text style={styles.modalText}>
                                    {postagem.caption}
                                </Text>
                            }
                            
                            <Text style={styles.modalText}>
                                #pronutrironcologia
                            </Text>
                           
                            <Text style={styles.textPublicacao}>Publicado {moment(postagem.timestamp).format('DD-MM-YYYY - HH:mm')}</Text>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    )
}

export default MyModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: '#fff'
    },
    modalView: {
        flex: 1,
        backgroundColor: "#fff",
        paddingBottom: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3
    },
    box1: {
        flex: 1,
    },
    box2: {
        flex: 1,
        margin: 10,
    },
    modalText: {
        textAlign: 'left',
        fontSize: RFValue(12, 680),
        margin: 0.1,
        padding: 5
    },
    modalTextTitulo: {
        fontSize: RFValue(15, 680),
        fontWeight: 'bold'
    },
    modalTextItem: {
        fontSize: RFValue(15, 680)
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: RFValue(20, 680)
    },
    boxBtn: {
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'flex-end',
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
        }),
    },
    openButton: {
        backgroundColor: "#fff",
        padding: 10,
        margin: 10,
        borderRadius: 30
    },
    imgView: {
        flex: 1
    },
    img: {
       flex: 1,
        resizeMode: 'stretch',
    },
    BoxMedico: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textPublicacao: {
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        paddingBottom: 10,
        fontSize: RFValue(10, 680)
    }
})
