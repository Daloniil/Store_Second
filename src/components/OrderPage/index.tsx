import { Box, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";
import Image from "next/image";
import { makeStyles } from '@mui/styles';
import { capitalizeFirstLetter } from "@/utils/firstLetter";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '2rem',
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '1rem 0',
        height: '100%',
        // @ts-ignore
        [theme.breakpoints.down(800)]: {
            flexDirection: 'column',
        },
    },
    cardMedia: {
        flexShrink: 0,
        paddingRight: '1rem',
        // @ts-ignore
        [theme.breakpoints.down(800)]: {
            paddingRight: 0,
            paddingBottom: '1rem',
        },
    },
    cardContent: {
        paddingLeft: '1rem',
        paddingRight: '10px',
        // @ts-ignore
        [theme.breakpoints.down(800)]: {
            textAlign: 'center',
        },
    },
    title: {
        fontWeight: 'bold',
        color: '#3f51b5',
        borderBottom: '3px solid #3f51b5',
        display: 'inline-block',
        paddingBottom: '0.25rem',
        marginBottom: '1rem',
    },
}));

export const OrderPage = ({ items }: any) => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Typography className={classes.title} variant="h4" component="h2" gutterBottom>
                Ваше Замовлення:
            </Typography>
            <Grid container spacing={3}>
                {items?.map((item: any) => {
                    return (
                        <Grid item xs={12} sm={6} key={item.id}>
                            <Card className={classes.card}>
                                <CardMedia className={classes.cardMedia} sx={{padding: {xs: '1rem 0 0 0', md: '1rem 0 0 26px'}}}>
                                    <Image src={item.photo} alt={item.name} width={200} height={200} />
                                </CardMedia>
                                <CardContent className={classes.cardContent}>
                                    <Typography variant="h6">{capitalizeFirstLetter(item.name)}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}
