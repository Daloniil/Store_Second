import {NotificationContextType} from "@/Interfaces/ProvidersInterface";
import React, {useState, useCallback, ReactNode} from "react";

export const NotificationContext = React.createContext<NotificationContextType>(
    {
        notification: null,
        statusNotification: null,
        addNotification: () => {
        },
        removeNotification: () => {
        },
    }
);

export const NotificationProvider = ({children}: {children: ReactNode}) => {
    const [notification, setNotification] = useState<string | null>(null);
    const [statusNotification, setStatusNotification] = useState<string | null>(
        null
    );

    const removeNotification = () => setNotification(null);

    const addNotification = (message: string, status: string) => {
        setNotification(message);
        setStatusNotification(status);
    };

    const contextValue = {
        notification,
        statusNotification,
        addNotification: useCallback(
            (message: string, status: string) => addNotification(message, status),
            []
        ),
        removeNotification: useCallback(() => removeNotification(), []),
    };

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
        </NotificationContext.Provider>
    );
};
