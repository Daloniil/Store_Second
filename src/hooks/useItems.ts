import {useState} from "react";
import {Item, ItemAdd} from "@/Interfaces/ItemIterface";
import {doc, getDoc, getFirestore, setDoc} from "firebase/firestore";
import {authentication} from "firebase-config";
import {NotificationKeys} from "@/services/localKey";
import {useNotification} from "@/hooks/useNotification";

export const useItems = () => {
    const {addNotification} = useNotification();


    const [itemHook, setItemHook] = useState([] as Item[]);

    const itemType = ['type']


    const getItem = async (typeGoods: string) => {
        if (authentication) {
            const db = getFirestore();
            const docRef = doc(db, "goods", typeGoods);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setItemHook(docSnap.data().items)
                console.log(docSnap.data().items)
            }
        }
    }

    const addItem = async (item: ItemAdd) => {
        if (authentication) {
            const db = getFirestore();
            const docRef = doc(db, "goods", item.type);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const arr = docSnap.data();
                const items = arr.items

                const newItem = {
                    id: items.length,
                    amount: 0,
                    cost: item.cost,
                    description: item.description,
                    photo: item.photo,
                    name: item.name
                }
                items.push(newItem)
                setDoc(docRef, arr);
                return;
            }
        }
    }


    const deleteWord = async (id: number, typeGoods: string) => {
        if (authentication) {
            const db = getFirestore();
            const docRef = doc(db, "goods", typeGoods);
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
        getItem,
        itemHook,
        itemType,
        addItem,
        deleteWord
    };
}