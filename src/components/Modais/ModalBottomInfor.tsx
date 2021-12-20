import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    Modal,
    ViewStyle,
    Platform,
    TouchableOpacity,
    TextStyle,
} from 'react-native';
import OkImg from '../../assets/svg/ok.svg';
import Credencial from '../../assets/svg/carteira-de-identidade.svg';
import { RFValue } from 'react-native-responsive-fontsize';
interface Props {
    activeModal: boolean;
    setActiveModal(parm: boolean): void;
    message: string;
    ContainerStyle?: ViewStyle;
    TextStyle?: TextStyle;
    animationType: 'none' | 'slide' | 'fade';
}

const ModalBottomInfor: React.FC<Props> = ({
    activeModal,
    setActiveModal,
    ContainerStyle,
    animationType = 'none',
    message = 'Adicione seu texto',
    TextStyle,
}: Props) => {
    const size = Dimensions.get('screen').width / 10;

    const _view = useRef<any>();
    const [childrenIds, setChildrenIds] = useState();

    const getIdRef = () => {
        const { current } = _view;
        if (current) {
            setChildrenIds(current?._nativeTag);
        }
    };

    const ok = () => {
        setActiveModal(false);
    };

    useEffect(() => {
        getIdRef();
    }, [activeModal]);

    return (
        <View>
            <Modal
                animationType={animationType}
                transparent={true}
                visible={activeModal}>
                <View
                    style={styles.centeredView}
                    ref={_view}
                    onStartShouldSetResponder={(evt) => {
                        evt.persist();
                        if (evt.nativeEvent.target === childrenIds) {
                            setActiveModal(false);
                        }
                        return true;
                    }}>
                    <SafeAreaView
                        style={[
                            styles.modalView,
                            ContainerStyle && { ...ContainerStyle },
                        ]}>
                        <View style={styles.box}>
                            <Credencial
                                fill={'#08948A'}
                                width={size}
                                height={size}
                            />
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text}>{message}</Text>
                        </View>
                        <View style={styles.boxBtn}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => ok()}>
                                <OkImg
                                    fill={'#08948A'}
                                    width={20}
                                    height={20}
                                />
                                <Text
                                    style={[
                                        styles.text,
                                        TextStyle && { ...TextStyle },
                                    ]}>
                                    OK
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </View>
            </Modal>
        </View>
    );
};

export default ModalBottomInfor;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.6)',
    },
    modalView: {
        backgroundColor: '#fff',
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
        alignItems: 'center',
    },
    btn: {
        width: 100,
        height: 60,
        backgroundColor: '#fff',
        opacity: 0.9,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            },
        }),
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    boxBtn: {
        marginVertical: 20,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        color: '#7C9292',
        fontSize: RFValue(16, 680),
        textAlign: 'justify',
        margin: 5,
    },
    Titulo: {
        color: '#08948A',
        fontWeight: 'bold',
        fontSize: RFValue(18, 680),
    },
    textOk: {
        color: '#08948A',
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    box1: {
        flexDirection: 'row',
        marginVertical: 20,
        alignSelf: 'flex-start',
    },
    labelDescription: {
        fontSize: RFValue(16, 680),
        color: '#08948A',
    },
    description: {
        fontSize: RFValue(16, 680),
        color: '#08948A',
    },
});
