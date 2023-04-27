import {useCartContext} from "@/hooks/useCartContext";
import {useCart} from "@/hooks/useCart";
import {useEffect} from "react";
import {useState} from "react";
import {Item} from "@/Interfaces/ItemIterface";
import Image from "next/image";
import {Button} from "@mui/material";
import {NotificationKeys} from "@/services/localKey";
import {useNotification} from "@/hooks/useNotification";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartPage = () => {
    const {addNotification} = useNotification();
    const {
        cartContext, removeItemCart,
        minusItemCart,
        plusItemCart
    } = useCartContext()
    const {addItemToCart} = useCart()

    const [item, setItem] = useState([] as Item[])

    useEffect(() => {
        addItemToCart(cartContext)
        setItem(cartContext)
    }, [])


    const remover = (id: number) => {
        removeItemCart(id)
        const indexGoods = item?.map((id: Item) => id.id).indexOf(id);
        item?.splice(indexGoods, 1);
        setItem(item)
        addItemToCart(item)
        addNotification("Delete Success", NotificationKeys.SUCCESS);
    }

    const minus = (id: number) => {
        minusItemCart(id)
        const indexGoods = item?.map((id: Item) => id.id).indexOf(id);
        item[indexGoods].amount -= 1
        setItem(item)
        addItemToCart(item)
    }

    const plus = (id: number) => {
        plusItemCart(id)
        const indexGoods = item?.map((id: Item) => id.id).indexOf(id);
        item[indexGoods].amount += 1
        setItem(item)
        addItemToCart(item)
    }

    return <div>
        {item?.map((item) => {
            return (
                <div key={item.id + Math.random()}>
                    {item.name}
                    <Image src={item.photo} alt={item.name} width={150} height={150}/>
                    {item.amount}
                    Cost:{item.cost}
                    {item.amount > 1 ? <RemoveIcon onClick={() => minus(item.id)}/> : ''}
                    <AddIcon onClick={() => plus(item.id)}/>
                    <Button onClick={() => remover(item.id)}>Delete</Button>
                </div>
            )
        })}
        All Cost: {item.reduce((total, item) => total + (item.cost * item.amount), 0)}
    </div>
}
export default CartPage