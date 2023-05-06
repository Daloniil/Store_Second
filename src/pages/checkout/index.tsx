import {Box, Modal, Grid, Typography} from "@mui/material";
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
import {capitalizeFirstLetter} from "@/utils/firstLetter";

const CheckoutPage = () => {
    const {authContext} = useAuth();
    const {signInCheckout} = useLogin();
    const {cartContext} = useCartContext();
    const {getCartCheckout, addItemToCart} = useCart();

    const [openModal, setOpenModalEdit] = useState(false);
    const [item, setItem] = useState([] as Item[]);

    const handleCloseModal = (status: boolean) => {
        setOpenModalEdit(status);
    };

    getCartCheckout();

    useEffect(() => {
        if (cartContext.length) {
            setItem(cartContext);
        } else {
            Router.push("/main");
        }
    }, []);

    useEffect(() => {
        if (!authContext.user?.uid) {
            handleCloseModal(true);
        } else {
            handleCloseModal(false);
        }
    }, [authContext]);

    useEffect(() => {
        setItem(cartContext);
        addItemToCart(cartContext);
    }, [cartContext]);

    return (
        <div>
            <Modal
                open={openModal}
                sx={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Box sx={{
                    ...modalStyle,
                    backgroundColor: "#fff",
                    padding: "16px",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    <Typography variant="h6" sx={{ marginBottom: "16px", textAlign: "center" }}>
                        Ви повинні бути авторизовані
                    </Typography>
                    <Button variant="contained" color="primary" onClick={signInCheckout} sx={{ textTransform: "none" }}>
                        Авторизуватися
                    </Button>
                </Box>

            </Modal>
            {authContext.user?.uid ? (
                <Box> <Typography variant="h6" sx={{fontWeight: "bold", padding: {xs: '0 0 0 5px', md: '0 0 0 26px'}}}>Ваше
                    Замовлення: </Typography>

                    <Grid container spacing={2} justifyContent="space-around">
                        <Grid item xs={12} md={7}>
                            {item?.map((item) => {
                                return (
                                    <Box
                                        key={item.id + Math.random()}
                                        sx={{
                                            backgroundColor: "#fafafa",
                                            border: "1px solid #e0e0e0",
                                            borderRadius: "8px",
                                            padding: "15px 0 15px 15px",
                                            margin: "9px 0 9px 0",
                                            display: "flex",
                                            flexDirection: {xs: "column", md: "row"},
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box sx={{ marginRight: {xs: "0", md: "20px"} }}>
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Image
                                                    src={item.photo}
                                                    alt={item.name}
                                                    width={200}
                                                    height={200}
                                                    style={{ borderRadius: "4px" }}
                                                />
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontSize: "1.2rem",
                                                    fontWeight: "bold",
                                                    color: "#333",
                                                    textAlign: { xs: "center", md: "left" },
                                                    marginTop: { xs: "10px", md: "0" },
                                                    marginRight: { xs: "10px", md: "0" },
                                                    marginLeft: { xs: "10px", md: "-10px" },
                                                }}
                                            >
                                                {capitalizeFirstLetter(item.name)}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: "1rem",
                                                    color: "#555",
                                                    marginLeft: { xs: "10px", md: "-10px" },
                                                }}
                                            >
                                                Кількість: {item.amount}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: "1rem",
                                                    color: "#555",
                                                    marginLeft: { xs: "10px", md: "-10px" },
                                                }}
                                            >
                                                Ціна: {item.cost * item.amount}
                                            </Typography>
                                        </Box>
                                    </Box>

                                );
                            })}
                            <Grid item xs={12}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        marginTop: '16px',
                                        fontWeight: 'bold',
                                        color: '#333',
                                        textAlign: 'left',
                                        padding: '0 0 0 5px'
                                    }}
                                >
                                    Повна Вартість: {item?.reduce((acc, cur) => acc + cur.cost * cur.amount, 0)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{
                            marginLeft: "16px",
                            marginTop: {xs: '10px', md: '-25px'},
                            borderTop: {xs: '1px solid', md: '0px'},
                            borderColor: {xs: 'grey', md: ''}
                        }}>
                            <CheckoutComponent authContext={authContext} items={item}/>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                ""
            )}
        </div>
    );
};

export default CheckoutPage;
