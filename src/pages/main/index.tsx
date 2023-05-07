// import {useEffect, useState} from "react";
// import {ADMIN_UID} from "@/services/localKey";
// import Router from "next/router";
// import {Auth} from "@/Interfaces/ProvidersInterface";
// import {useAuth} from "@/hooks/useAuth";
// import {useCartContext} from "@/hooks/useCartContext";
// import {useCart} from "@/hooks/useCart";
// import {Box} from "@mui/material";
// import Image from "next/image";
// import toy from "../../assets/1.jpg"
// import short_woman from "../../assets/2.jpeg"
// import short_man from "../../assets/3.jpeg"
// import necklaces from "../../assets/4.jpeg"
// import bag from "../../assets/5.jpeg"
// import lamp from "../../assets/6.jpeg"
// import {redirectTo} from "@/utils/redirect";
//
//
// const MainPage = () => {
//     const {authContext} = useAuth();
//     const {cartContext, setItemCart} = useCartContext()
//     const {getCart, cartHook} = useCart()
//
//     const [user, setUser] = useState({} as Auth);
//
//     getCart()
//
//     useEffect(() => {
//         setTimeout(() => {
//             if (cartHook.length !== cartContext.length) {
//                 setItemCart(cartHook)
//             }
//         }, 1500)
//     }, [cartHook])
//
//
//     useEffect(() => {
//         setUser(authContext)
//     }, [authContext])
//
//     useEffect(() => {
//         if (user.user && user.user.uid !== ADMIN_UID.UID) {
//             Router.push("/main");
//         }
//     }, [user])
//
//
//     return (
//         <Box>
//             Наші товари
//             <Box>
//                 Іграшки Ручної Роботи
//                 <Image src={toy} alt={'toy'} width={200} height={200} onClick={()=>redirectTo('/catalog/toy')}/>
//             </Box>
//             <Box>
//                 Жіночі вишиванки Ручної Роботи
//                 <Image src={short_woman} alt={'short_woman'} width={200} height={200} onClick={()=>redirectTo('/catalog/embroidered_woman')}/>
//             </Box>
//             <Box>
//                 Чоловічі вишиванки Ручної Роботи
//                 <Image src={short_man} alt={'short_man'} width={200} height={200} onClick={()=>redirectTo('/catalog/embroidered_man')}/>
//             </Box>
//             <Box>
//                 Намиста Ручної Роботи
//                 <Image src={necklaces} alt={'necklaces'} width={200} height={200} onClick={()=>redirectTo('/catalog/necklaces')}/>
//             </Box>
//             <Box>
//                 Сумки Ручної Роботи
//                 <Image src={bag} alt={'bag'} width={200} height={200} onClick={()=>redirectTo('/catalog/bag')}/>
//             </Box>
//             <Box>
//                 Лампи Ручної Роботи
//                 <Image src={lamp} alt={'lamp'} width={200} height={200} onClick={()=>redirectTo('/catalog/lamp')}/>
//             </Box>
//         </Box>
//     )
// }
//
// export default MainPage


import {useEffect, useState} from 'react';
import {ADMIN_UID} from '@/services/localKey';
import Router from 'next/router';
import {Auth} from '@/Interfaces/ProvidersInterface';
import {useAuth} from '@/hooks/useAuth';
import {useCartContext} from '@/hooks/useCartContext';
import {useCart} from '@/hooks/useCart';
import {Box, Typography, Grid, Card, CardActionArea, CardContent, CardMedia} from '@mui/material';
import Image from 'next/image';
import toy from '../../assets/1.jpg';
import short_woman from '../../assets/2.jpeg';
import short_man from '../../assets/3.jpeg';
import necklaces from '../../assets/4.jpeg';
import bag from '../../assets/5.jpeg';
import lamp from '../../assets/6.jpeg';
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