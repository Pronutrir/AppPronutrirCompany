import React, { useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    Platform,
} from 'react-native';
import OkImg from '../../assets/svg/ok.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import notificationGlobalContext from '../../contexts/notificationGlobalContext';

const NotificationCentralized: React.FC = () => {
    const { notification, removeNotification } = useContext(
        notificationGlobalContext,
    );

    const disabled = () => {
        removeNotification();
    };

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={!!notification}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.box}>
                            <Text style={styles.Titulo}>Aviso:</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text}>
                                {notification?.message}
                            </Text>
                        </View>
                        <View style={styles.boxBtn}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => disabled()}>
                                <OkImg
                                    fill={'#08948A'}
                                    width={20}
                                    height={20}
                                />
                                <Text style={styles.text}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default NotificationCentralized;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
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
        padding: 10,
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
        marginVertical: 10,
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
