import {useItems} from "@/hooks/useItems";
import {useEffect, useState} from "react";
import {Item} from "@/Interfaces/ItemIterface";
import Image from "next/image";
import {ADMIN_UID} from "@/services/localKey";
import Router from "next/router";
import {Auth} from "@/Interfaces/ProvidersInterface";
import {useAuth} from "@/hooks/useAuth";
import {useCartContext} from "@/hooks/useCartContext";
import {useCart} from "@/hooks/useCart";

const MainPage = () => {
    const {authContext} = useAuth();
    const {cartContext, setItemCart} = useCartContext()
    const {getCart, cartHook, addItemToCartUpdate} = useCart()

    const [user, setUser] = useState({} as Auth);

    getCart()

    useEffect(() => {
        if (cartHook.length !== cartContext.length) {

            if (!cartContext.length) {
                setItemCart(cartHook)
            } else {
                addItemToCartUpdate(cartContext)
            }
        }
    }, [cartHook])


    useEffect(() => {
        setUser(authContext)
    }, [authContext])

    useEffect(() => {
        if (user.user && user.user.uid !== ADMIN_UID.UID) {
            Router.push("/main");
        }
    }, [user])


    return <div>
        {/*{items?.map((item) => {*/}
        {/*    return (*/}
        {/*        <div key={item.id}>*/}
        {/*            {item.name}*/}
        {/*            <Image src={item.photo} alt={item.name} width={150} height={150}/>*/}
        {/*            {user.user && user.user.uid !== ADMIN_UID.UID ? '' :*/}
        {/*                <button onClick={() => deleteItem(item.id, 'type')}>Delete</button>}*/}
        {/*        </div>*/}
        {/*    )*/}
        {/*})}*/}
    </div>
}

export default MainPage
