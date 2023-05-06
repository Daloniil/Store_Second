import {useAuth} from "@/hooks/useAuth";
import {useEffect} from "react";
import {ADMIN_UID} from "@/services/localKey";
import Router, {useRouter} from "next/router";
import {useOrders} from "@/hooks/orders";
import {Box, Card, CardActionArea, Typography, CardContent} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '10px 0 0 0',
    },
    card: {
        margin: '1rem 0',
        boxShadow: theme.shadows[3],
        cursor: 'pointer'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    title: {
        fontWeight: 'bold',
        color: '#3f51b5',
        borderBottom: '3px solid #3f51b5',
        display: 'inline-block',
    },
}));

const OrdersPage = () => {
    const classes = useStyles();

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
            <Typography className={classes.title} variant="h4" component="h2" gutterBottom>
                {authContext.user.uid === ADMIN_UID.UID ? 'Замовлення Покупців:' : 'Ваші Замовлення:'}
            </Typography>

            <Box className={classes.container}>
                {ordersHook ?
                    authContext.user.uid === ADMIN_UID.UID ? ordersHook.map((doc: any) => {
                        const item = doc.data().orders[0]
                        return (
                            <Card className={classes.card} key={Math.random()}>
                                <CardActionArea
                                    onClick={() => {
                                        router.push({
                                            pathname: `/orders/admin/${Math.random().toString(36).substr(2, 9)}`,
                                            query: {items: JSON.stringify(doc.data())},
                                        });
                                    }}
                                >
                                    <CardContent className={classes.cardContent}>
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        <Typography variant="subtitle1">Ім'я: {item.name}</Typography>
                                        <Typography variant="subtitle1">Номер Телефона: +38{item.number}</Typography>
                                        <Typography variant="subtitle1">Email: {item.mail}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    }) : ordersHook.orders ? ordersHook.orders.map((item: any) => {
                        return (
                            <Card className={classes.card} key={Math.random()}>
                                <CardActionArea
                                    onClick={() => {
                                        router.push({
                                            pathname: `/orders/${Math.random().toString(36).substr(2, 9)}`,
                                            query: {items: JSON.stringify(item.item)},
                                        });
                                    }}
                                >
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="subtitle1">Id Замовлення: №{Math.random().toString(36).substr(2, 9)}</Typography>
                                        <Typography variant="subtitle1">Номер Телефона: +38{item.number}</Typography>
                                        <Typography variant="subtitle1">Email: {item.mail}</Typography>
                                        <Typography variant="subtitle1">Місто: {item.arey}</Typography>
                                        <Typography variant="subtitle1">Поштове Відділення: {item.warehous}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    }) : '' : 'No Orders'}
            </Box>
        </div>
    )
}

export default OrdersPage