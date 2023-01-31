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
}
