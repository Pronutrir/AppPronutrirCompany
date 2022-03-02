import React, { useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import OkImg from '../assets/svg/ok.svg';
import Cancel from '../assets/svg/cancel.svg';
import InfoSvg from '../assets/svg/informacoes.svg';
import AlertSvg from '../assets/svg/alerta.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import notificationGlobalContext from '../contexts/notificationGlobalContext';

export default function Notification() {
    const { notification, removeNotification } = useContext(
        notificationGlobalContext,
    );

    const size = Dimensions.get('screen').width / 20;

    const disabled = () => {
        removeNotification();
    };

    const buttomType = () => {
        switch (notification?.status) {
            case 'sucess':
                return '#388e3c';

            case 'error':
                return '#dc2c2c';

            case 'warning':
                return '#f57c00';

            case 'info':
                return '#1976d2';

            default:
                return '#648dae';
        }
    };

    const ImgType = () => {
        switch (notification?.status) {
            case 'sucess':
                return <OkImg fill={'#fff'} width={size} height={size} />;

            case 'error':
                return <Cancel fill={'#fff'} width={size} height={size} />;

            case 'warning':
                return <AlertSvg fill={'#fff'} width={size} height={size} />;

            case 'info':
                return <InfoSvg fill={'#fff'} width={size} height={size} />;

            default:
                return <OkImg fill={'#fff'} width={size} height={size} />;
        }
    };

    if (notification) {
        return (
            <Animatable.View
                animation="bounceInLeft"
                easing="ease-in-out"
                iterationCount={1}
                style={styles.container}>
                <View style={styles.box1}>
                    <Animatable.View
                        animation="bounceOutLeft"
                        onAnimationEnd={() => disabled()}
                        easing="ease-in-out"
                        iterationCount={1}
                        delay={6000}
                        style={[
                            styles.Animatable,
                            notification.status && {
                                backgroundColor: buttomType(),
                            },
                        ]}>
                        <View style={styles.item1}>{ImgType()}</View>
                        <View style={styles.item2}>
                            {notification ? (
                                <Text style={styles.text}>
                                    {notification.message}
                                </Text>
                            ) : (
                                <Text style={styles.text}>?</Text>
                            )}
                        </View>
                    </Animatable.View>
                </View>
                <View style={styles.box2} />
            </Animatable.View>
        );
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height / 12,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
        marginBottom: 70,
    },
    box1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box2: {
        width: '20%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10,
        elevation: 3,
    },
    Animatable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        paddingStart: 10,
        paddingTop: 3,
        paddingBottom: 3,
        flexDirection: 'row',
        borderTopRightRadius: 10,
        borderBottomEndRadius: 10,
    },
    item1: {
        width: '10%',
    },
    item2: {
        width: '90%',
    },
    text: {
        color: '#ffF',
        fontSize: RFValue(14, 680),
        padding: 5,
        fontWeight: 'bold',
    },
});
