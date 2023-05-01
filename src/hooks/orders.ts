import {useState} from "react";
import {doc, getDoc, getFirestore, setDoc, getDocs, collection} from "firebase/firestore";
import {authentication} from "firebase-config";
import {useNotification} from "@/hooks/useNotification";
import {useAuth} from "@/hooks/useAuth";
import {compareArraysByKeys} from "@/hooks/useCart";

export const useOrders = () => {
    const {addNotification} = useNotification();

    const {authContext} = useAuth();

    const [ordersHook, setOrdersHook] = useState([] as any);


    const addItemToOrders = async (newItems: any) => {
        if (authContext.user.uid) {
            if (authentication) {
                const db = getFirestore();
                const docRef = doc(db, "orders", authContext.user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const arr = docSnap.data();
                    arr.orders.push(newItems)
                    setDoc(docRef, arr);
                    return;
                } else {
                    const db = getFirestore();
                    const collectionId = "orders";
                    const documentId = authContext.user.uid;
                    const newArray = {orders: [newItems]}
                    setDoc(doc(db, collectionId, documentId), newArray);
                }
            }
        }
    }

    const getAllOrders = async () => {
        if (authContext.user.uid) {
            const db = getFirestore();
            const querySnapshot = await getDocs(collection(db, "orders"));
            setOrdersHook(querySnapshot.docs)

        }
    };


    const getOrders = async () => {
        if (authentication) {
            const db = getFirestore();
            const docRef = doc(db, "orders", authContext.user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setOrdersHook(docSnap.data())
            }
        }
    }

    return {
        addItemToOrders,
        getAllOrders,
        ordersHook,
        getOrders
    };
}