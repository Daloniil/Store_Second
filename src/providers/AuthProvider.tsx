import {Auth, AuthContextType} from "@/Interfaces/ProvidersInterface";
import {ContextKey} from "@/services/localKey";
import {LocalStorageService} from "@/services/localStorageService";
import React, {ReactNode, useCallback, useState} from "react";

export const AuthContext = React.createContext<AuthContextType>({
    authContext: {user: {displayName: "", uid: "", email: '', phoneNumber: 0}},
    setAuth: () => {
    },
    removeAuth: () => {
    },
});

const appGetAuth = (key: string): Auth => {
    return (
        LocalStorageService.getItem<Auth>(key) ?? {
            user: {displayName: "", uid: "", email: '', phoneNumber: 0},
        }
    );
};

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [authContext, setAuth] = useState(appGetAuth(ContextKey.AUTH));

    const updateState = () => {
        setAuth(appGetAuth(ContextKey.AUTH));
    };

    const handleSetAuth = (auth: Auth) => {
        LocalStorageService.setAuth(auth);
        updateState();
    };

    const handleRemoveAuth = () => {
        LocalStorageService.removeAuth();
        updateState();
    };

    const value = {
        authContext,
        setAuth: useCallback((auth: Auth) => handleSetAuth(auth), []),

        removeAuth: useCallback(() => handleRemoveAuth(), []),
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
