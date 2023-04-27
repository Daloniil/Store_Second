import {useContext} from "react";
import {CartContext} from "@/providers/CartProvider";

export const useCartContext = () => {
    const {
        cartContext,
        addItemCart,
        removeItemCart,
        setItemCart,
        minusItemCart,
        plusItemCart
    } = useContext(CartContext);

    return {
        cartContext,
        addItemCart,
        removeItemCart,
        setItemCart,
        minusItemCart,
        plusItemCart
    };
};
