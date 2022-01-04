import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import BtnOptions from '../buttons/BtnOptions';

interface Props {
    message?: string;
    activeModal?: boolean;
}

const NotificationsSimples: React.FC<Props> = ({
    message = 'teste',
    activeModal = false,
}: Props) => {
    const [active, setActive] = useState(activeModal);
    const disabled = () => {
        setActive(false);
    };

    useEffect(() => {
        setActive(activeModal);
    }, [activeModal]);

    return (
        <View>
            <Modal animationType="slide" transparent={true} visible={active}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.box}>
                            <Text style={styles.textLabel}>Mensagem:</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text}>{message}</Text>
                        </View>
                        <BtnOptions
                            valueText={'OK'}
                            onPress={() => disabled()}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default NotificationsSimples;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.8)',
    },
    modalView: {
        opacity: 20,
        backgroundColor: '#ffff',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '60%',
    },
    box: {
        marginVertical: 10,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxBtn: {
        marginVertical: 10,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        color: '#7C9292',
        fontSize: 16,
        textAlign: 'center',
    },
    textLabel: {
        color: '#08948A',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
