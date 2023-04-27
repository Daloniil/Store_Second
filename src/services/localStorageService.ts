import {Item} from "@/Interfaces/ItemIterface";
import {Auth} from "@/Interfaces/ProvidersInterface";
import {ContextKey} from "./localKey";

type ItemType = string;

export class LocalStorageService {
    public static getItem<T>(key: ItemType) {
        try {
            let item = localStorage.getItem(key);
            item = item ?? sessionStorage.getItem(key);

            return item ? (JSON.parse(item) as T) : null;
        } catch {
            return null;
        }
    }

    public static setAuth(auth: Auth, session = false) {
        const storage = session ? sessionStorage : localStorage;
        storage.setItem(ContextKey.AUTH, JSON.stringify(auth));
    }

    public static removeAuth(session = false) {
        const storage = session ? sessionStorage : localStorage;
        storage.setItem(
            ContextKey.AUTH,
            JSON.stringify({user: {displayName: "", uid: ""}})
        );
        localStorage.clear()
        document.location.reload()
    }

    public static setCart(item: Item, session = false) {
        const storage = session ? sessionStorage : localStorage;
        let items = LocalStorageService.getItem<Item[]>(ContextKey.CART)
        if (items) {
            const it = items.find(it => it.id === item.id);
            if (it) {
                // @ts-ignore
                items.find(it => it.id === item.id).amount++;
            } else {
                items.push(item)
            }
        } else {
            items = [item]
        }

        storage.setItem(ContextKey.CART, JSON.stringify(items));
    }


    public static setCarts(item: Item[], session = false) {
        const storage = session ? sessionStorage : localStorage;
        let items = LocalStorageService.getItem<Item[]>(ContextKey.CART)

        if (!items) {
            items = []
        }

        item.forEach((item: Item) => {
            const it = items?.find((it: Item) => it.id === item.id);
            if (it) {
                return
            } else {
                items?.push(item)
            }
        })
        storage.setItem(ContextKey.CART, JSON.stringify(items));
    }

    public static removeItemCart(id: number, session = false) {
        const storage = session ? sessionStorage : localStorage;
        let items = LocalStorageService.getItem<Item[]>(ContextKey.CART)
        const indexGoods = items?.map((id: Item) => id.id).indexOf(id);
        // @ts-ignore
        items?.splice(indexGoods, 1);
        storage.setItem(ContextKey.CART, JSON.stringify(items));
    }


    public static minusItemCart(id: number, session = false) {
        const storage = session ? sessionStorage : localStorage;
        let items = LocalStorageService.getItem<Item[]>(ContextKey.CART)
        const indexGoods = items?.map((id: Item) => id.id).indexOf(id);
        // @ts-ignore
        items[indexGoods].amount -= 1
        storage.setItem(ContextKey.CART, JSON.stringify(items));
    }

    public static plusItemCart(id: number, session = false) {
        const storage = session ? sessionStorage : localStorage;
        let items = LocalStorageService.getItem<Item[]>(ContextKey.CART)
        const indexGoods = items?.map((id: Item) => id.id).indexOf(id);
        // @ts-ignore
        items[indexGoods].amount += 1
        storage.setItem(ContextKey.CART, JSON.stringify(items));
    }


}
