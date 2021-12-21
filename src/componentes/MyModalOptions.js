import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import PhotoSvg from '../assets/svg/foto.svg';
import { RFValue } from "react-native-responsive-fontsize";

export default function MyModalOptions({ activeModal, setActiveModal, option1, option2 }) {

    const size = Dimensions.get('screen').width / 10

    const _view = useRef(null);
    const [childrenIds, setChildrenIds] = useState();

    const getIdRef = () => {
        const { current } = _view;
        if (current) {
            setChildrenIds(current._nativeTag);
        }
    }

    const ok = () => {
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
                <SafeAreaView style={styles.centeredView}
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
                            <PhotoSvg width={size} height={size} fill="#748080" />
                        </View>
                        <View style={styles.box}>
                            <TouchableOpacity onPress={() => option2()}>
                                <Text style={styles.text}>
                                    Nova foto de perfil
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => option1()}>
                                <Text style={styles.text}>
                                    Importar da Galeria
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.8)',
    },
    modalView: {
        backgroundColor: "#ffff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingBottom: 10
    },
    box: {
        width: '100%',
        marginVertical: 10,
        marginHorizontal: 20,
        alignItems: 'center'
    },
    text: {
        color: '#666666',
        fontSize: RFValue(18, 680),
        margin: 10,
        alignSelf: 'flex-start'
    }
})
