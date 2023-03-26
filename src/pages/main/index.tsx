import {useItems} from "@/hooks/useItems";
import {useEffect, useState} from "react";
import {Item} from "@/Interfaces/ItemIterface";
import Image from "next/image";
import {ADMIN_UID} from "@/services/localKey";
import Router from "next/router";
import {Auth} from "@/Interfaces/ProvidersInterface";
import {useAuth} from "@/hooks/useAuth";

const MainPage = () => {
    const {authContext} = useAuth();
    const {itemHook, getItem, deleteWord} = useItems();


    const [items, setItems] = useState([] as Item[])
    const [user, setUser] = useState({} as Auth);


    useEffect(() => {
        getItem('type')
        setItems(itemHook)
    }, [itemHook])

    useEffect(() => {
        setUser(authContext)
    }, [authContext])

    useEffect(() => {
        if (user.user && user.user.uid !== ADMIN_UID.UID) {
            Router.push("/main");
        }
    }, [user])


    return <div>
        {items?.map((item) => {
            return (
                <div key={item.id}>
                    {item.name}
                    <Image src={item.photo} alt={item.name} width={150} height={150}/>
                    {user.user && user.user.uid !== ADMIN_UID.UID ? '' :
                        <button onClick={() => deleteWord(item.id, 'type')}>Delete</button>}
                </div>
            )
        })}
    </div>
}

export default MainPage
