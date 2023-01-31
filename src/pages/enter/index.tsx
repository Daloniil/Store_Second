import {useItems} from "@/hooks/useItems";
import {useEffect, useState} from "react";
import {Item} from "@/Interfaces/ItemIterface";

const EnterPage = () => {

    const [items, setItems] = useState([] as Item[])

    const {itemHook, getItem} = useItems();

    useEffect(() => {
        getItem('type' )
        setItems(itemHook)
    }, [itemHook])

    return <div>
        {items?.map((item) => {
            return (
                <div key={item.id}>
                    {item.name}
                </div>
            )
        })}
    </div>
}

export default EnterPage
