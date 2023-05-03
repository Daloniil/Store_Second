import {useCartContext} from '@/hooks/useCartContext';
import {Box, Button, Grid, Typography} from '@material-ui/core';
import {useRouter} from 'next/router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {ProductDescription, ProductPrice, ProductTitle, Slide} from '@/styles/itemIdStyle';
import {settings} from '@/utils/sliderSettings';
import { capitalizeFirstLetter } from '@/utils/firstLetter';

const ProductPage = () => {
    const router = useRouter();
    const {addItemCart} = useCartContext();
    const {item, items} = router.query;

    if (!item) {
        if (typeof window !== 'undefined') {
            router.push('/main');
        }
        return null;
    }

    //@ts-ignore
    const parsedItem = JSON.parse(item);
    //@ts-ignore
    const parsedItems = JSON.parse(items);


    const handleAddToCartClick = () => {
        addItemCart(parsedItem)
    };


    const openItem = (item: any) => {
        router.push({
            pathname: `/catalog/item/${Math.random().toString(36).substr(2, 9)}`,
            query: {item: JSON.stringify(item), items: JSON.stringify(parsedItems)},
        });
    };


    return (
        <Box p={3}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Box display="flex" flexDirection="column">
                        <Box mb={1} style={{position: 'relative', paddingBottom: '100%', height: 0}}>
                            <img src={parsedItem.photo} alt={parsedItem.name} style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                            }}/>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                        <Box>
                            <ProductTitle gutterBottom>
                                {capitalizeFirstLetter(parsedItem.name)}
                            </ProductTitle>
                            <ProductDescription color="textSecondary" gutterBottom>
                                {parsedItem.description}
                            </ProductDescription>
                            <ProductPrice //@ts-ignore
                                component="p" color="textPrimary">
                                {parsedItem.cost} UAH
                            </ProductPrice>
                        </Box>
                        <Box>

                            <Button variant="contained" color="primary" onClick={handleAddToCartClick}>
                                Додати у кошик
                            </Button>
                        </Box>
                        <div style={{margin: '25px 0 25px 0', textAlign: 'center'}}>
                            <Typography variant="h6" component="h3" gutterBottom>
                                Рекомендовані товари
                            </Typography>
                            <Slider {...settings}>
                                {parsedItems.map((item: any) => (
                                    <Slide key={item.id} onClick={() => openItem(item)}>
                                        <Box mb={1}
                                             style={{position: 'relative', paddingBottom: '100%', height: 0}}>
                                            <img src={item.photo} alt={item.name} style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                maxWidth: '200px',
                                                maxHeight: '200px'
                                            }}/>
                                        </Box>
                                    </Slide>
                                ))}
                            </Slider>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductPage;