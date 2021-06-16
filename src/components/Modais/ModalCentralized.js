import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Modal } from 'react-native';
import propTypes from 'prop-types';
import Loading from '../../componentes/Loading';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const ModalCentralized = ({children , activeModal, setActiveModal, modal}) => {

    const size = Dimensions.get('screen').width / 10

    const _view = useRef(null);
   
    const [childrenIds, setChildrenIds] = useState();
    const [active, setActive] = useState(activeModal);

    const getIdRef = () => {
        const { current } = _view;
        if (current) {
            setChildrenIds(current._nativeTag);
        }
    }

    useEffect(() => {
        getIdRef();
    }, [activeModal])

    return (
        <View>
            <Modal
                animationType='fade'
                transparent={true}
                backdropOpacity={0.9}
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
                    <SafeAreaView style={styles.modalView}>
                        {children}
                    </SafeAreaView>
                </View>
                {modal}
            </Modal>
        </View>
    )
}

export default ModalCentralized;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,.8)'
    },
    modalView: {
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
    }
})

ModalCentralized.propTypes = {
    activeModal: propTypes.bool
}

ModalCentralized.defaultProps = {
    activeModal: false
}