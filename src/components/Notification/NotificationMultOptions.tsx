import React, {
    useCallback,
    useState,
    useImperativeHandle,
    useRef,
    memo,
} from 'react';
import { StyleSheet, Text, View, Modal, Platform } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import BtnOptions from '../../components/buttons/BtnOptions';

interface Notification {
    message: string;
    status?: 'sucess' | 'error' | 'warning' | 'info';
    onpress(): void;
}

export interface ModalHandles {
    closeNotification(): void;
    openNotification(): void;
}

const NotificationMultOptions = React.forwardRef<ModalHandles, Notification>(
    ({ message, onpress }: Notification, ref) => {
        const [active, setActive] = useState(false);
        const _view = useRef<any>(null);

        const closeNotification = useCallback(() => {
            setActive(false);
        }, []);

        const openNotification = useCallback(() => {
            setActive(true);
        }, []);

        useImperativeHandle(ref, () => {
            return {
                closeNotification,
                openNotification,
            };
        });

        return (
            <View>
                <Modal animationType="fade" transparent={true} visible={active}>
                    <View
                        ref={_view}
                        style={styles.centeredView}
                        onStartShouldSetResponder={(evt) => {
                            evt.persist();
                            if (
                                evt.nativeEvent.target ===
                                _view.current?._nativeTag
                            ) {
                                closeNotification();
                            }
                            return true;
                        }}>
                        <View style={styles.modalView}>
                            <View style={styles.box}>
                                <Text style={styles.Titulo}>Mensagem:</Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.textMsn}>{message}</Text>
                            </View>
                            <View style={styles.boxBtn}>
                                <BtnOptions
                                    onPress={() => onpress()}
                                    valueText={'Ok'}
                                />
                                <BtnOptions
                                    onPress={() => closeNotification()}
                                    valueText={'Cancelar'}
                                    arrayColors={['#cb2720', '#cb20c4']}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    },
);

export default memo(NotificationMultOptions);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        paddingHorizontal: RFPercentage(3),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.8)',
    },
    modalView: {
        backgroundColor: '#ffff',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 20,
    },
    box: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: RFPercentage(15),
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
        backgroundColor: '#ef4063',
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
    btnOk: {
        backgroundColor: '#20c4cb',
    },
    btnCancelar: {
        backgroundColor: '#cb2720',
    },
    boxBtn: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textMsn: {
        color: '#7C9292',
        fontSize: RFValue(16, 680),
        textAlign: 'justify',
        margin: 5,
    },
    text: {
        color: '#fff',
        fontSize: RFValue(16, 680),
        textAlign: 'justify',
        margin: 5,
        fontWeight: 'bold',
    },
    Titulo: {
        color: '#137276',
        fontWeight: 'bold',
        fontSize: RFValue(18, 680),
    },
});
