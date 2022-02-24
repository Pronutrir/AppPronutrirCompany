import React, { useEffect } from 'react';
import Routes from './routes/index';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/auth';
import { NotificationGlobalProvider } from './contexts/notificationGlobalContext';
import NotificationAlert from './components/Notification/NotificationAlert';
import NotificationCentralized from './components/Notification/NotificationCentralized';
import OneSignal from 'react-native-onesignal';

//import messaging from '@react-native-firebase/messaging';
//import OneSignal from 'react-native-onesignal';

const Index: React.FC = () => {
    /*  async function registerAppWithFCM() {
         await messaging().registerDeviceForRemoteMessages();
     } */

    // Register background handler
    /*  messaging().setBackgroundMessageHandler(async remoteMessage => {
         console.log('Message handled in the background!', remoteMessage);
     }); */

    /* useEffect(() => {
        registerAppWithFCM();
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, []) */

    useEffect(() => {
        //@ts-ignore
        Text.defaultProps = Text.defaultProps || {};
        // Ignore dynamic type scaling on iOS
        //@ts-ignore
        Text.defaultProps.allowFontScaling = false;

        //OneSignal Init Code
        OneSignal.setLogLevel(6, 0);
        OneSignal.setAppId('2c990bbc-f7ab-404f-9b95-ef981885ff18');
        //END OneSignal Init Code

        OneSignal.setRequiresUserPrivacyConsent(false);
        OneSignal.getDeviceState().then((response) => {
            console.log(response);
        });

        //Prompt for push on iOS
        OneSignal.promptForPushNotificationsWithUserResponse((response) => {
            console.log('Prompt response:', response);
        });

        //Method for handling notifications received while app in foreground
        OneSignal.setNotificationWillShowInForegroundHandler(
            (notificationReceivedEvent) => {
                console.log(
                    'OneSignal: notification will show in foreground:',
                    notificationReceivedEvent,
                );
                let notification = notificationReceivedEvent.getNotification();
                console.log('notification: ', notification);
                const data = notification.additionalData;
                console.log('additionalData: ', data);
                // Complete with null means don't show a notification.
                notificationReceivedEvent.complete(notification);
            },
        );

        //Method for handling notifications opened
        OneSignal.setNotificationOpenedHandler((notification) => {
            console.log('OneSignal: notification opened:', notification);
        });
    }, []);

    return (
        <NavigationContainer>
            {/* contexto disponível para toda aplicação */}
            <NotificationGlobalProvider>
                <AuthProvider>
                    <Routes />
                    <NotificationCentralized />
                    <NotificationAlert />
                </AuthProvider>
            </NotificationGlobalProvider>
        </NavigationContainer>
    );
};

export default Index;
