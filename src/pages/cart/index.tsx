import {useCartContext} from "@/hooks/useCartContext";
import {useCart} from "@/hooks/useCart";
import {useEffect} from "react";
import {useState} from "react";
import {Item} from "@/Interfaces/ItemIterface";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import {
    Button,
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    IconButton,
    useTheme,
    useMediaQuery
} from "@mui/material";
import {NotificationKeys} from "@/services/localKey";
import {useNotification} from "@/hooks/useNotification";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {redirectTo} from "@/utils/redirect";
import {capitalizeFirstLetter} from "@/utils/firstLetter";

const CartPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const {addNotification} = useNotification();

    const {cartContext, removeItemCart, minusItemCart, plusItemCart} = useCartContext();

    const {addItemToCart} = useCart();

    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        addItemToCart(cartContext);
        setItems(cartContext);
    }, []);

    const removeFromCart = (id: number) => {
        removeItemCart(id);
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
        addItemToCart(updatedItems);
        addNotification('Успішно видалено', NotificationKeys.SUCCESS);
    };
    const updateItemAmount = (id: number, type: 'increase' | 'decrease') => {
        if (type === 'increase') {
            plusItemCart(id);
        } else {
            minusItemCart(id);
        }
        const updatedItems = items.map((item) =>
            item.id === id ? {...item, amount: type === 'increase' ? item.amount + 1 : item.amount - 1} : item
        );
        setItems(updatedItems);
        addItemToCart(updatedItems);
    };

    const totalPrice = items.reduce((total, item) => total + item.cost * item.amount, 0);

    const isCartEmpty = () => {
        return items.length === 0;
    };

    const renderCartItem = (item: Item) => {
        const {id, name, cost, amount, photo} = item;
        return (
            <Card key={id + Math.random()} sx={{width: {xs: '90%', sm: '60%'}, marginBottom: '16px'}}>
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', sm: 'row'},
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            width: {xs: '100%', sm: '40%'},
                            paddingBottom: {xs: '100%', sm: '40%'},
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src={photo}
                            alt={name}
                            style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                        />
                    </Box>
                    <Box sx={{marginLeft: {xs: 0, sm: '16px'}, width: {xs: '100%', sm: '60%'}}}>
                        <Typography variant={isMobile ? 'body1' : 'h6'} sx={{
                            marginBottom: '8px',
                            fontWeight: 'bold',
                            fontSize: isMobile ? '14px' : '20px'
                        }}>
                            {capitalizeFirstLetter(name)}
                        </Typography>
                        <Box sx={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                            <Typography variant={isMobile ? 'subtitle2' : 'subtitle1'} sx={{marginRight: '8px'}}>
                                Ціна:
                            </Typography>
                            <Typography variant={isMobile ? 'subtitle2' : 'subtitle1'} sx={{fontWeight: 'bold'}}>
                                {cost} UAH
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography variant={isMobile ? 'subtitle2' : 'subtitle1'} sx={{marginRight: '8px'}}>
                                Кількість:
                            </Typography>
                            <Typography variant={isMobile ? 'subtitle2' : 'subtitle1'} sx={{fontWeight: 'bold'}}>
                                {amount}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions>
                    <IconButton onClick={() => updateItemAmount(item.id, 'increase')}>
                        <AddIcon/>
                    </IconButton>
                    {item.amount > 1 && (
                        <IconButton onClick={() => updateItemAmount(item.id, 'decrease')}>
                            <RemoveIcon/>
                        </IconButton>
                    )}
                    <Button onClick={() => removeFromCart(id)}>Видалити</Button>
                </CardActions>
            </Card>
        );
    };

    const renderCart = () => {
        return (
            <>
                {isCartEmpty() ? (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        minHeight="200px"
                        sx={{marginTop: '20px'}}
                    >
                        <SentimentDissatisfiedIcon fontSize="large" color="error"/>
                        <Typography variant="h5" color="error" fontWeight="bold">
                            Ваша Корзина Порожня
                        </Typography>
                    </Box>) : (
                    <>
                        {items.map(renderCartItem)}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: {xs: 'column', sm: 'row'},
                                justifyContent: 'space-between',
                                width: {xs: '90%', sm: '60%'},
                            }}
                        >
                            <Typography
                                variant={isMobile ? 'subtitle1' : 'h6'}
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'primary.main',
                                    marginBottom: {xs: '8px', sm: 0},
                                    marginRight: {xs: 0, sm: '16px'},
                                }}
                            >
                                Повна Вартість: {totalPrice} UAH
                            </Typography>
                            <Button
                                onClick={() => redirectTo('/checkout')}
                                sx={{
                                    marginTop: {xs: '8px', sm: 0},
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                }}
                            >
                                Оформити Замовлення
                            </Button>
                        </Box>
                    </>)}
            </>
        );
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {renderCart()}
        </Box>
    );
};

export default CartPage;