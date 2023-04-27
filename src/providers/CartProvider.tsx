import {CartContextType} from "@/Interfaces/ProvidersInterface";
import {ContextKey} from "@/services/localKey";
import {LocalStorageService} from "@/services/localStorageService";
import React, {ReactNode, useCallback, useState} from "react";
import {Item} from "@/Interfaces/ItemIterface";

export const CartContext = React.createContext<CartContextType>({
    cartContext: [],
    addItemCart: () => {
    },
    removeItemCart: () => {
    },
    setItemCart: () => {
    },
    minusItemCart: () => {
    },
    plusItemCart: () => {
    }
});

const appGetAuth = (key: string): Item[] => {
    return (
        LocalStorageService.getItem<Item[]>(key) ?? []
    );
};

export const CartProvider = ({children}: { children: ReactNode }) => {
    const [cartContext, setCart] = useState(appGetAuth(ContextKey.CART));

    const updateState = () => {
        setCart(appGetAuth(ContextKey.CART));
    };

    const handleSetCart = (item: Item) => {
        LocalStorageService.setCart(item);
        updateState();
    };

    const handleSetsCart = (items: Item[]) => {
        LocalStorageService.setCarts(items);
        updateState();
    };

    const handleRemoveCart = (id: number) => {
        LocalStorageService.removeItemCart(id);
        updateState();
    };

    const handleMinusCart = (id: number) => {
        LocalStorageService.minusItemCart(id);
        updateState();
    };

    const handlePlusCart = (id: number) => {
        LocalStorageService.plusItemCart(id);
        updateState();
    };

    const value = {
        cartContext,
        addItemCart: useCallback((item: Item) => handleSetCart(item), []),
        setItemCart: useCallback((items: Item[]) => handleSetsCart(items), []),
        removeItemCart: useCallback((id: number) => handleRemoveCart(id), []),
        minusItemCart: useCallback((id: number) => handleMinusCart(id), []),
        plusItemCart: useCallback((id: number) => handlePlusCart(id), []),

    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
