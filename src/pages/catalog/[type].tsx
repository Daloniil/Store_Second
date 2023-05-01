import {useItems} from "@/hooks/useItems";
import {useEffect, useState} from "react";
import {Item} from "@/Interfaces/ItemIterface";
import Image from "next/image";
import {ADMIN_UID} from "@/services/localKey";
import {useRouter} from "next/router";
import {Auth} from "@/Interfaces/ProvidersInterface";
import {useAuth} from "@/hooks/useAuth";
import {Button, CircularProgress} from "@mui/material";
import {circularProgress} from "@/styles/typeStyle";
import {useCartContext} from "@/hooks/useCartContext";

const TypePage = () => {
    const {authContext} = useAuth();
    const {itemHook, getItem, deleteItem} = useItems();
    const {addItemCart} = useCartContext()


    const [user, setUser] = useState({} as Auth);
    const router = useRouter()


    useEffect(() => {
        getItem(String(router.query.type))
    }, [])

    useEffect(() => {
        setUser(authContext)
    }, [authContext])

    useEffect(() => {
        getItem(String(router.query.type))
    }, [router])


    const remover = (id: number, type: string) => {
        deleteItem(id, String(type))
        const indexGoods = itemHook?.map((id: Item) => id.id).indexOf(id);
        itemHook?.splice(indexGoods, 1);
    }


    return <div>
        {itemHook.length ? itemHook?.map((item) => {
            return (
                <div key={item.id}>
                    {item.name}
                    <Image src={item.photo} alt={item.name} width={150} height={150}/>
                    {user.user && user.user.uid !== ADMIN_UID.UID ? '' :
                        <Button onClick={() => remover(item.id, String(router.query.type))}>Delete</Button>}
                    <Button onClick={() => addItemCart(item)}>Add to cart</Button>

                </div>
            )
        }) : <CircularProgress sx={circularProgress}/>}
    </div>
}

export default TypePage
