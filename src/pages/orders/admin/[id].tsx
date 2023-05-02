import Router, {useRouter} from "next/router";
import {useAuth} from "@/hooks/useAuth";


const OrderAdminPage = () => {
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
    console.log(parsedObject)


    return (
        <div>
            {parsedObject.orders.map((item: any) => {
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
            })}
        </div>
    )
}

export default OrderAdminPage