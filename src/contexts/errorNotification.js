import React, { createContext, useState, useCallback } from 'react';

const ErrorContext = createContext({
    error: null,
    addError: () => {},
    removeError: () => {},
    notification: null,
    addNotification: () => {},
    removeNotification: () => {}
})

export const ErrorNotificationProvider = ({ children }) => {

    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);

    const removeError = () => setError(null);
    const removeNotification = () => setNotification(null);

    const addError = (message, status) => setError({ message, status });
    const addNotification = (message, status) => setNotification({ message, status });

    const contextValue = {
        error,
        addError: useCallback((message, status) => addError(message, status), []),
        removeError: useCallback(() => removeError(), []),
        notification,
        addNotification: useCallback((message, status) => addNotification(message, status), []),
        removeNotification: useCallback(() => removeNotification(), [])
    };

    return (
        <ErrorContext.Provider value={contextValue}>
            {children}
        </ErrorContext.Provider>
    )
}

export default ErrorContext;
