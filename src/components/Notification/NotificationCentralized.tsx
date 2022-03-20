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
import notificationGlobalContext from '../../contexts/notificationGlobalContext';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';

const NotificationCentralized: React.FC = () => {
    const { notification, removeNotification } = useContext(
        notificationGlobalContext,
    );

    const styles = useThemeAwareObject(createStyles);

    const disabled = () => {
        removeNotification();
    };

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={Boolean(notification)}>
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

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.BACKDROP,
        },
        modalView: {
            backgroundColor: theme.colors.BACKGROUND_1,
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
            backgroundColor: theme.colors.BACKGROUND_1,
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
            fontSize: theme.typography.SIZE.fontysize16,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            textAlign: 'justify',
            margin: 5,
        },
        Titulo: {
            fontSize: theme.typography.SIZE.fontysize18,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
        },
        textOk: {
            fontSize: theme.typography.SIZE.fontysize16,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            paddingHorizontal: 10,
        },
        box1: {
            flexDirection: 'row',
            marginVertical: 20,
            alignSelf: 'flex-start',
        },
        labelDescription: {
            fontSize: theme.typography.SIZE.fontysize16,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            paddingHorizontal: 10,
        },
        description: {
            fontSize: theme.typography.SIZE.fontysize16,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            paddingHorizontal: 10,
        },
    });
    return styles;
};
