import {useState} from "react";
import {doc, getDoc, getFirestore, setDoc, getDocs, collection} from "firebase/firestore";
import {authentication} from "firebase-config";
import {useAuth} from "@/hooks/useAuth";

export const useOrders = () => {
    const {authContext} = useAuth();
    const [ordersHook, setOrdersHook] = useState([] as any);

    const bese64Img = (photo: string) => {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const img = new Image();
            img.src = photo;
            img.onload = () => {
                canvas.width = 200;
                canvas.height = 200;
                //@ts-ignore
                ctx.imageSmoothingEnabled = true;
                //@ts-ignore
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const newBase64 = canvas.toDataURL("image/jpeg", 0.3);
                resolve(newBase64);
            }
            img.onerror = (err) => {
                reject(err);
            }
        });
    }


    const addItemToOrders = async (newItems: any) => {
        const changedItems = await Promise.all(newItems.item.map(async (item: any) => {
            item.photo = await bese64Img(item.photo);
            return item;
        }));
        newItems.item = changedItems
        if (authContext.user.uid) {
            if (authentication) {
                const db = getFirestore();
                const docRef = doc(db, "orders", authContext.user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const arr = docSnap.data();
                    arr.orders.push(newItems);
                    setDoc(docRef, arr);
                } else {
                    const db = getFirestore();
                    const collectionId = "orders";
                    const documentId = authContext.user.uid;
                    const newArray = {orders: [newItems]};
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