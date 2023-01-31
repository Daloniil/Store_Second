export type AuthContextType = {
    authContext: Auth;
    setAuth: (auth: Auth) => void;
    removeAuth: () => void;
};

export type Auth = {
    user: CurrentUser;
};

export type CurrentUser = {
    uid: string;
    displayName: string;
};

export type NotificationContextType = {
    notification: string | null;
    statusNotification: string | null;
    addNotification: (message: string, status: string) => void;
    removeNotification: () => void;
};