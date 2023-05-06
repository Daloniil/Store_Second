import Router, {useRouter} from "next/router";
import {useAuth} from "@/hooks/useAuth";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '2rem',
    },
    card: {
        margin: '1rem 0',
        boxShadow: theme.shadows[3],
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
}));


const OrderAdminPage = () => {
    const classes = useStyles();


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
            })}
        </div>
    )
}

export default OrderAdminPage