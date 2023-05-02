import Image from "next/image";
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import {useCartContext} from "@/hooks/useCartContext";

const ItemPage = () => {
    const router = useRouter();
    const {addItemCart} = useCartContext()

    const {item} = router.query;

    if (item === undefined || item === null) {
        if (typeof window !== "undefined") {
            router.push("/main");
        }
        return null;
    }
    //@ts-ignore
    const parsedObject = JSON.parse(item);


    return (
        <div>
            {parsedObject.name}
            <Image src={parsedObject.photo} alt={parsedObject.name} width={150} height={150}/>
            <Button onClick={() => addItemCart(parsedObject)}>Add to cart</Button>
        </div>
    )
}

export default ItemPage