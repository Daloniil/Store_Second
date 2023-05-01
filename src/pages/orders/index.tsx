import {useAuth} from "@/hooks/useAuth";
import {useEffect} from "react";
import {ADMIN_UID} from "@/services/localKey";
import Router, {useRouter} from "next/router";
import {useOrders} from "@/hooks/orders";

const OrdersPage = () => {
    const {authContext} = useAuth();
    const router = useRouter();
    const {getAllOrders, ordersHook, getOrders} = useOrders()


    useEffect(() => {
        if (!authContext.user || !authContext.user.uid) {
            Router.push("/main");
        } else {
            if (authContext.user.uid === ADMIN_UID.UID) {
                getAllOrders()
            } else {
                getOrders()
            }
        }
    }, [])

    useEffect(() => {
        if (!authContext.user || !authContext.user.uid) {
            Router.push("/main");
        }
    }, [authContext])


    return (
        <div>
            {ordersHook ?
                authContext.user.uid === ADMIN_UID.UID ? ordersHook.map((doc: any) => {
                    const item = doc.data().orders[0]
                    return (
                        <div key={Math.random()} onClick={() => {
                            router.push({
                                pathname: `/orders/admin/${Math.random().toString(36).substr(2, 9)}`,
                                query: {items: JSON.stringify(doc.data())},
                            });
                        }}>
                            {item.name}
                            {item.number}
                            {item.mail}
                        </div>
                    )
                }) : ordersHook.orders ? ordersHook.orders.map((item: any) => {
                    return (
                        <div key={Math.random()}
                             onClick={() => {
                                 router.push({
                                     pathname: `/orders/${Math.random().toString(36).substr(2, 9)}`,
                                     query: {items: JSON.stringify(item.item)},
                                 });
                             }}>
                            {item.name}
                            {item.number}
                            {item.mail}
                        </div>
                    )
                }) : '' : 'No Orders'}
        </div>
    )
}

export default OrdersPage