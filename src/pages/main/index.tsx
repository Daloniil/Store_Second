import {useEffect, useState} from 'react';
import {ADMIN_UID} from '@/services/localKey';
import Router from 'next/router';
import {Auth} from '@/Interfaces/ProvidersInterface';
import {useAuth} from '@/hooks/useAuth';
import {useCartContext} from '@/hooks/useCartContext';
import {useCart} from '@/hooks/useCart';
import {Box, Typography, Grid, Card, CardActionArea, CardContent, CardMedia} from '@mui/material';
import toy from '../../assets/toy.jpg';
import short_woman from '../../assets/short_woman.jpeg';
import short_man from '../../assets/short_man.jpeg';
import necklaces from '../../assets/necklaces.jpeg';
import bag from '../../assets/bag.jpeg';
import lamp from '../../assets/lamp.jpeg';
import {redirectTo} from '@/utils/redirect';
const MainPage = () => {
    const {authContext} = useAuth();
    const {cartContext, setItemCart} = useCartContext();
    const {getCart, cartHook} = useCart();

    const [user, setUser] = useState({} as Auth);

    getCart();

    useEffect(() => {
        setTimeout(() => {
            if (cartHook.length !== cartContext.length) {
                setItemCart(cartHook);
            }
        }, 1500);
    }, [cartHook]);

    useEffect(() => {
        setUser(authContext);
    }, [authContext]);

    useEffect(() => {
        if (user.user && user.user.uid !== ADMIN_UID.UID) {
            Router.push('/main');
        }
    }, [user]);

    const products = [
        {name: 'Іграшки', image: toy, url: '/catalog/toy'},
        {name: 'Жіночі Вишиванки', image: short_woman, url: '/catalog/embroidered_woman'},
        {name: 'Чоловічі Вишиванки', image: short_man, url: '/catalog/embroidered_man'},
        {name: 'Намиста', image: necklaces, url: '/catalog/necklaces'},
        {name: 'Сумки', image: bag, url: '/catalog/bag'},
        {name: 'Лампи', image: lamp, url: '/catalog/lamp'},
    ];

    return (
        <Box sx={{flexGrow: 1}}>
            <Typography variant="h4" align="center" sx={{my: 2}}>
                Наші товари
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {products.map((product, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                            <CardActionArea onClick={() => redirectTo(product.url)} sx={{flexGrow: 1}}>
                                <CardMedia component="img" height="350" image={product.image.src} alt={product.name}
                                           sx={{objectFit: 'contain', margin: '20px 0 0 0', borderRadius: '4px'}}/>
                                <CardContent sx={{flexGrow: 1}}>
                                    <Typography gutterBottom variant="h6" align="center" noWrap>
                                        {product.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>


        </Box>
    )
}

export default MainPage