import { Auth } from "@/Interfaces/ProvidersInterface";
import { ContextKey } from "./localKey";

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
    }

}
