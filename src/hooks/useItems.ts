import {useState} from "react";
import {Item} from "@/Interfaces/ItemIterface";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import {authentication} from "firebase-config";

export const useItems = () => {

    const [itemHook, setItemHook] = useState([] as Item[]);


    const getItem = async (typeGoods: string) => {
        if (authentication) {
            const db = getFirestore();
            const docRef = doc(db, "goods", typeGoods);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setItemHook(docSnap.data().items)
            }
        }

    }
    return {
        getItem,
        itemHook
    };
}