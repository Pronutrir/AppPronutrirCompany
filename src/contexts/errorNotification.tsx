import React, { createContext, useState, useCallback } from 'react';

interface ErrorContextData {
    error: Notification | null;
    addError(notification: Notification): void;
    removeError(): void;
    notification: Notification | null;
    addNotification(notification: Notification): void;
    removeNotification(): void;
}

type Notification = {
    message: string;
    status: 'sucess' | 'error' | 'warning' | 'info';
}

const ErrorContext = createContext({} as ErrorContextData);

export const ErrorNotificationProvider: React.FC = ({ children }) => {

    const [error, setError] = useState<Notification | null>(null);
    const [notification, setNotification] = useState<Notification | null>(null);

    const removeError = () => setError(null);
    const removeNotification = () => setNotification(null);

    const addError = (notification: Notification) => setError(notification);
    const addNotification = (notification: Notification) => setNotification(notification);

    const contextValue: ErrorContextData = {
        error,
        addError: useCallback(notification => addError(notification), []),
        removeError: useCallback(() => removeError(), []),
        notification,
        addNotification: useCallback(notification => addNotification(notification), []),
        removeNotification: useCallback(() => removeNotification(), [])
    };

    return (
        <ErrorContext.Provider value={contextValue}>
            {children}
        </ErrorContext.Provider>
    )
}

export default ErrorContext;
