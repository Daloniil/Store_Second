import {useState} from "react";
import {Item, ItemAdd} from "@/Interfaces/ItemIterface";
import {doc, getDoc, getFirestore, setDoc} from "firebase/firestore";
import {authentication} from "firebase-config";
import {NotificationKeys} from "@/services/localKey";
import {useNotification} from "@/hooks/useNotification";
import { itemType } from "@/utils/itemType";

export const useItems = () => {
    const {addNotification} = useNotification();

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

    const addItem = async (item: ItemAdd) => {
        if (authentication) {
            const db = getFirestore();
            const docRef = doc(db, "goods", item.type);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const arr = docSnap.data();
                const items = arr.items

                const newItem = {
                    id: Math.random().toString(36).substr(2, 9),
                    amount: 1,
                    cost: item.cost,
                    description: item.description,
                    photo: item.photo,
                    name: item.name
                }
                items.push(newItem)
                setDoc(docRef, arr);
                return;
            } else {
                const db = getFirestore();
                const collectionId = "goods";
                const documentId = item.type;

                const newItem = {
                    id: Math.random().toString(36).substr(2, 9),
                    amount: 1,
                    cost: item.cost,
                    description: item.description,
                    photo: item.photo,
                    name: item.name
                }
                const newArray = {items: [newItem]}

                setDoc(doc(db, collectionId, documentId), newArray);
            }
        }
    }


    const deleteItem = async (id: number, typeGoods: string) => {
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
        deleteItem
    };
}