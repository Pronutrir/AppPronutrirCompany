import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import OkImg from '../assets/svg/ok.svg';

export default function MyModalButtom({ activeModal, setActiveModal, action, label }) {

    const _view = useRef(null);
    const [childrenIds, setChildrenIds] = useState();

    const getIdRef = () => {
        const { current } = _view;
        if (current) {
            setChildrenIds(current._nativeTag);
        }
    }

    const cancel = () => {
        setActiveModal(false);
    }

    const ok = () => {
        action();
        setActiveModal(false);
    }

    useEffect(() => {
        getIdRef();
    }, [activeModal])
    
    return (
        <View>
            <Modal
                animationType='slide'
                transparent={true}
                //backdropOpacity={0.9}
                visible={activeModal}
            >
                <View style={styles.centeredView}
                    ref={_view}
                    onStartShouldSetResponder={evt => {
                        evt.persist();
                        if (evt.target._nativeTag === childrenIds) {
                            setActiveModal(false)
                        }
                    }}
                >
                    <View style={styles.modalView}>
                        <View style={styles.box}>
                            <Text style={[styles.text, styles.Titulo]}>Informações</Text>
                        </View>
                        <View style={styles.box}>
                            <View style={styles.box1}>
                                <Text style={styles.labelDescription}>
                                    Valor da Consulta :
                                </Text>
                                <Text style={styles.description}>
                                    teste
                                </Text>
                            </View>
                            <Text style={styles.text}>
                                Declaro ter verificado os dados e confirmo a veracidade das informações,
                                estando ciente que dados incorretos podem impossibilitar a realização da consulta.
                        </Text>
                        </View>
                        <View style={styles.boxBtn}>
                            <TouchableOpacity style={styles.btn} onPress={() => ok()}>
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#847e7e',
        opacity: 0.9

    },
    modalView: {
        backgroundColor: "#ffff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    box: {
        marginVertical: 10,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
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
    boxBtn: {
        marginVertical: 20,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        color: '#7C9292',
        fontSize: 16,
        textAlign: 'justify',
        margin: 5
    },
    Titulo: {
        color: '#08948A',
        fontWeight: 'bold',
        fontSize: 18
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
        fontSize: 16,
        color: '#08948A'
    },
    description: {
        fontSize: 16,
        color: '#7C9292'
    }
})
