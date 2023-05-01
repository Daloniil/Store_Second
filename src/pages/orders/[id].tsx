import Router, {useRouter} from "next/router";
import {OrderPage} from "@/components/OrderPage";
import {useAuth} from "@/hooks/useAuth";


const OrderUserPage = () => {
    const router = useRouter();
    const {authContext} = useAuth();

    const {items} = router.query;

    if (items === undefined || items === null) {
        if (typeof window !== "undefined") {
            router.push("/main");
        }
        return null;
    } else {
        if (!authContext.user || !authContext.user.uid) {
            Router.push("/main");
        }
    }


    //@ts-ignore
    const parsedObject = JSON.parse(items);


    return (
        <div>
            <OrderPage items={parsedObject}/>
        </div>
    )
}

export default OrderUserPage