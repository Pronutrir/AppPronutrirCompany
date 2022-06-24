import React, { createContext, useState, useCallback, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from 'react-query';
interface ErrorContextData {
    alert: Notification | null;
    addAlert(notification: Notification): void;
    removeAlert(): void;
    notification: Notification | null;
    addNotification(notification: Notification): void;
    removeNotification(): void;
}

type Notification = {
    message: string;
    status: 'sucess' | 'error' | 'warning' | 'info';
};

const NotificationGlobalContext = createContext({} as ErrorContextData);

const NotificationGlobalProvider: React.FC = ({ children }) => {
    const [alert, setAlert] = useState<Notification | null>(null);
    const [notification, setNotification] = useState<Notification | null>(null);

    //context de notificação modal centralizado
    const addNotification = useCallback((notify: Notification) => {
        setNotification(notify);
    }, []);

    const removeNotification = () => setNotification(null);

    //context de alerta animado
    const addAlert = useCallback((notify: Notification) => {
        setAlert(notify);
    }, []);

    const removeAlert = () => setAlert(null);

    const contextValue: ErrorContextData = {
        //context de alerta
        alert,
        addAlert: useCallback((notify) => addAlert(notify), [addAlert]),
        removeAlert: useCallback(() => removeAlert(), []),
        //context de notificação modal centralizado
        notification,
        addNotification: useCallback(
            (notify) => addNotification(notify),
            [addNotification],
        ),
        removeNotification: useCallback(() => removeNotification(), []),
    };

    onlineManager.setEventListener((setOnline) => {
        return NetInfo.addEventListener((state) => {
            setOnline(Boolean(state.isConnected));
        });
    });

    useEffect(() => {
        // Subscribe
        const unsubscribe = NetInfo.addEventListener((state) => {
            if(!state.isConnected){
                addNotification({
                    message: 'Falha na conexão com a internet, verifique sua conexão!',
                    status: 'error',
                });
            }
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
        });
        return () => {
            // Unsubscribe
            unsubscribe();
        };
    }, []);

    return (
        <NotificationGlobalContext.Provider value={contextValue}>
            {children}
        </NotificationGlobalContext.Provider>
    );
};

export default NotificationGlobalContext;
export { NotificationGlobalProvider };
