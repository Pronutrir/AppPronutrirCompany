import React, { useEffect } from 'react';
import Routes from './routes/index';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/auth';
import { NotificationGlobalProvider } from './contexts/notificationGlobalContext';
import { SinaisVitaisProvider } from './contexts/sinaisVitaisContext';
import NotificationAlert from './components/Notification/NotificationAlert';
import NotificationCentralized from './components/Notification/NotificationCentralized';

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
        /*  OneSignal.setAppId("2c990bbc-f7ab-404f-9b95-ef981885ff18");
        OneSignal.setLogLevel(6, 0);
        OneSignal.setRequiresUserPrivacyConsent(false);
        OneSignal.getDeviceState().then(response => {
            console.log(response);
        })
        OneSignal.promptForPushNotificationsWithUserResponse(response => {
            console.log("Prompt response:", response);
        }); */
        /* O N E S I G N A L  H A N D L E R S */
        /*  OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
             //console.log("OneSignal: notification will show in foreground:", notifReceivedEvent);
             let notif = notifReceivedEvent.getNotification();

             const button1 = {
                 text: "Cancel",
                 onPress: () => { notifReceivedEvent.complete(); },
                 style: "cancel"
             };

             const button2 = { text: "Complete", onPress: () => { notifReceivedEvent.complete(notif); } };

             Alert.alert("Complete notification?", "Test", [button1, button2], { cancelable: true });
         }); */
    }, []);

    return (
        <NavigationContainer>
            {/* contexto disponível para toda aplicação */}
            <NotificationGlobalProvider>
                <AuthProvider>
                    <SinaisVitaisProvider>
                        <Routes />
                        <NotificationCentralized />
                        <NotificationAlert />
                    </SinaisVitaisProvider>
                </AuthProvider>
            </NotificationGlobalProvider>
        </NavigationContainer>
    );
};

export default Index;
