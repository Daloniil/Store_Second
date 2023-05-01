import {Box, Modal} from "@mui/material"
import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {modalStyle} from "@/styles/checkoutStyle";
import Button from "@mui/material/Button";
import {useLogin} from "@/hooks/useLogin";
import {useCartContext} from "@/hooks/useCartContext";
import {useCart} from "@/hooks/useCart";
import Image from "next/image";
import {Item} from "@/Interfaces/ItemIterface";
import {CheckoutComponent} from "@/components/Checkout";
import Router from "next/router";

const CheckoutPage = () => {
    const {authContext} = useAuth();
    const {signInCheckout} = useLogin();
    const {cartContext} = useCartContext()
    const {getCartCheckout, addItemToCart} = useCart()


    const [openModal, setOpenModalEdit] = useState(false);
    const [item, setItem] = useState([] as Item[])


    const handleCloseModal = (status: boolean) => {
        setOpenModalEdit(status);
    };

    getCartCheckout()

    useEffect(() => {
        if (cartContext.length) {
            setItem(cartContext)
        } else {
            Router.push("/main");
        }
    }, [])


    useEffect(() => {
        if (!authContext.user?.uid) {
            handleCloseModal(true)
        } else {
            handleCloseModal(false)
        }
    }, [authContext])

    useEffect(() => {
        setItem(cartContext)
        addItemToCart(cartContext)
    }, [cartContext])


    return (
        <div>
            <Modal
                open={openModal}
                sx={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Box sx={modalStyle}>
                    You must be authtentication
                    <Button onClick={signInCheckout}>Authentication</Button>
                </Box>
            </Modal>
            {authContext.user?.uid ? <div> {item?.map((item) => {
                    return (
                        <div key={item.id + Math.random()}>
                            {item.name}
                            <Image src={item.photo} alt={item.name} width={150} height={150}/>
                            {item.amount}
                            Cost:{item.cost * item.amount}
                        </div>
                    )
                })}
                    <CheckoutComponent authContext={authContext} items={item}/>
                </div>
                : ''}
        </div>
    )
}

export default CheckoutPage