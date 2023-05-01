import {Item} from "@/Interfaces/ItemIterface";

export type AuthContextType = {
    authContext: Auth;
    setAuth: (auth: Auth) => void;
    removeAuth: () => void;
};

export type CartContextType = {
    cartContext: Item[];
    addItemCart: (item: Item) => void;
    removeItemCart: (id: number) => void;
    setItemCart: (items: Item[]) => void
    minusItemCart: (id: number) => void
    plusItemCart: (id: number) => void
    removeCart: () => void



};

export type Auth = {
    user: CurrentUser;
};

export type CurrentUser = {
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: number;
};

export type NotificationContextType = {
    notification: string | null;
    statusNotification: string | null;
    addNotification: (message: string, status: string) => void;
    removeNotification: () => void;
};