import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, Modal } from 'react-native';
import propTypes from 'prop-types';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const ModalBottom = ({children , activeModal, setActiveModal, style }) => {

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
                animationType='slide'
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
                    <SafeAreaView style={[styles.modalView, style && {...style}]}>
                        {children}
                    </SafeAreaView>
                </View>
            </Modal>
        </View>
    )
}

export default ModalBottom;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.6)'
    },
    modalView: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    }
});

ModalBottom.propTypes = {
    activeModal: propTypes.bool
}

ModalBottom.defaultProps = {
    activeModal: false
}