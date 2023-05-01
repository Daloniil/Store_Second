import {useState} from "react";
import {Item} from "@/Interfaces/ItemIterface";
import {doc, getDoc, getFirestore, setDoc} from "firebase/firestore";
import {authentication} from "firebase-config";
import {NotificationKeys} from "@/services/localKey";
import {useNotification} from "@/hooks/useNotification";
import {useAuth} from "@/hooks/useAuth";
import {useCartContext} from "@/hooks/useCartContext";


export const compareArraysByKeys = (a: Item[], b: Item[]): boolean => {
    if (a.length !== b.length) {
        return false;
    }

    // @ts-ignore
    const keys = [...new Set(a.concat(b).flatMap(item => Object.keys(item)))];

    return a.every((item, index) => {
        const otherItem = b[index];
        // @ts-ignore
        return keys.every(key => item[key] === otherItem[key]);
    });
}

export const useCart = () => {
    const {addNotification} = useNotification();

    const {authContext} = useAuth();
    const [cartHook, setCartHook] = useState([] as Item[]);
    const {cartContext, setItemCart} = useCartContext()


    const getCart = async () => {
        if (authContext.user.uid) {
            if (authentication) {
                const db = getFirestore();
                const docRef = doc(db, "cart", authContext.user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    if (compareArraysByKeys(docSnap.data().cart, cartHook)) {
                        return
                    } else {
                        setCartHook(docSnap.data().cart)
                    }
                }
            }
        }
    }

    const getCartCheckout = async () => {
        if (authContext.user.uid) {
            if (authentication) {
                const db = getFirestore();
                const docRef = doc(db, "cart", authContext.user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    if (compareArraysByKeys(docSnap.data().cart, cartHook)) {
                        return
                    } else {
                        setCartHook(docSnap.data().cart)
                        if (cartHook.length !== cartContext.length) {
                            setItemCart(docSnap.data().cart)
                        }
                    }
                }
            }
        }
    }


    const addItemToCart = async (newItems: Item[]) => {
        if (authContext.user.uid) {
            if (authentication) {
                const db = getFirestore();
                const docRef = doc(db, "cart", authContext.user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const arr = docSnap.data();
                    if (compareArraysByKeys(arr.cart, newItems)) {
                        return
                    } else {
                        arr.cart = newItems
                        setDoc(docRef, arr);
                        return;
                    }
                } else {
                    const db = getFirestore();
                    const collectionId = "cart";
                    const documentId = authContext.user.uid;


                    const newArray = {cart: newItems}

                    setDoc(doc(db, collectionId, documentId), newArray);
                }
            }
        }
    }

    const deleteItem = async (id: number) => {
        if (authentication) {
            const db = getFirestore();
            const docRef = doc(db, "cart", authContext.user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let arr = docSnap.data();
                const items = arr.items
                const indexGoods = items.map((id: Item) => id.id).indexOf(id);
                items.splice(indexGoods, 1);
                setDoc(docRef, arr);
                addNotification("Delete Success", NotificationKeys.SUCCESS);
            }
        }
    };


    return {
        cartHook,
        getCart,
        addItemToCart,
        deleteItem,
        getCartCheckout
    };
}