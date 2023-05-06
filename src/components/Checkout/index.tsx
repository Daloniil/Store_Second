import {Auth} from "@/Interfaces/ProvidersInterface"
import {useState} from "react";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Form} from "@/Interfaces/Form";
import * as yup from "yup";
import {useNovaPoshta} from "@/hooks/novaPoshta";
import {NotificationKeys} from "@/services/localKey";
import {useNotification} from "@/hooks/useNotification";
import {useOrders} from "@/hooks/orders";
import Router from "next/router";
import {useCartContext} from "@/hooks/useCartContext";
import {Item} from "@/Interfaces/ItemIterface";


const schema = yup.object().shape({
    name: yup.string().required("This Field Cannot Be Empty"),
    mail: yup
        .string()
        .email("Invalid email")
        .required("This Field Cannot Be Empty"),
    number: yup
        .string()
        .matches(/^0[0-9]{9}$/, "Invalid phone number")
        .required("This Field Cannot Be Empty"),
});


type CheckoutComponent = {
    authContext: Auth
    items: Item[]
}
export const CheckoutComponent = ({authContext, items}: CheckoutComponent) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Form>({
        resolver: yupResolver(schema), defaultValues: {
            name: authContext.user.displayName,
            mail: authContext.user.email,
            number: authContext.user.phoneNumber
        }
    });

    console.log(authContext)

    const {getCities, getWarehouses} = useNovaPoshta()
    const {addNotification} = useNotification();
    const {addItemToOrders} = useOrders()
    const {removeCart} = useCartContext()


    const [cityes, setCityes] = useState([] as Array<any>)
    const [city, setCityState] = useState({} as any)

    const [warehouses, setWarehousess] = useState([] as Array<any>)
    const [warehous, setWarehous] = useState({} as any)

    const [openStatus, setOpenStatus] = useState(false)
    const [openStatusWarehouses, setOpenStatusWarehouses] = useState(false)

    const [showSelectCity, setShowSelectCity] = useState(false)
    const [showSelectWarehous, setShowSelectWarehous] = useState(false)

    const [cityInputValue, setCityInputValue] = useState("");

    const setCity = async (event: any) => {
        const resCityes = await getCities(event.target.value)
        await setCityes(resCityes.data[0] ? resCityes.data[0].Addresses : [])
        if (resCityes.data[0] && resCityes.data[0].Addresses.length) {
            setOpenStatus(true)
        } else {
            setOpenStatus(false)
        }
    }

    const setWarehouses = async (city: any) => {
        if (city) {
            const resWarehouses = await getWarehouses(city)
            await setWarehousess(resWarehouses.data[0] ? resWarehouses.data : [])

            if (resWarehouses.data[0]) {
                setShowSelectWarehous(false)
                setOpenStatusWarehouses(true)
            } else {
                setOpenStatusWarehouses(false)
            }

        }
    }


    const handleChange = (item: any) => {
        setCityState(item);
        setWarehouses(item.MainDescription)
        setOpenStatus(false)
        setShowSelectCity(true)
        setCityInputValue(item.MainDescription);
    };

    const handleChangeWarehouses = (item: any) => {
        setWarehous(item);
        setOpenStatusWarehouses(false)
        setShowSelectWarehous(true)
    };

    return (
        <Box>
            <form
                onSubmit={handleSubmit((data) => {
                    data.arey = city.MainDescription as string;
                    data.warehous = warehous.Description;
                    data.item = items;
                    if (data.arey && data.warehous) {
                        addNotification("Item add SUCCESS", NotificationKeys.SUCCESS);
                        addItemToOrders(data);
                        removeCart();
                        Router.push("/waitorder");
                    } else {
                        addNotification(
                            "Select Array and Warehous ",
                            NotificationKeys.ERROR
                        );
                    }
                })}
            >
                <Typography variant="h6" sx={{fontWeight: "bold", margin: {xs: '0 0 0 -10px', md: '0 0 0 0'}}}>Інформація
                    Для Замовлення:</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            error={!!errors.name}
                            label="Ім'я"
                            {...register("name", {required: true})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            error={!!errors.mail}
                            label="Пошта"
                            {...register("mail", {required: true})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            helperText={errors.mail?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            error={!!errors.number}
                            label="Номер Телефона"
                            {...register("number", {required: true})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            helperText={errors.number?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Місто"
                            value={cityInputValue ? cityInputValue : null}
                            onChange={(event) => {
                                setCity(event);
                                setShowSelectCity(false);
                                setOpenStatus(true);
                                setWarehousess([]);
                                setWarehous({});
                                setCityInputValue('');

                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        {city && showSelectCity ? (
                            <Typography variant="subtitle1">
                                {city.MainDescription ? `Місто: ${city.MainDescription}` : ""}
                            </Typography>
                        ) : (
                            <Box
                                sx={{
                                    maxHeight: "150px",
                                    maxWidth: "450px",
                                    overflowY: "scroll",
                                    display: openStatus ? "block" : "none",
                                }}
                            >
                                <Grid container spacing={2}>
                                    {cityes.length
                                        ? cityes.map((item, index) => {
                                            return (
                                                <Grid item xs={12} key={index}>
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="primary"
                                                        onClick={() => handleChange(item)}
                                                        sx={{cursor: "pointer"}}
                                                    >
                                                        {item.Present}
                                                    </Typography>
                                                </Grid>
                                            );
                                        })
                                        : ""}
                                </Grid>
                            </Box>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        {warehous && showSelectWarehous ? (
                            <Typography
                                variant="subtitle1"
                                onClick={() => {
                                    setShowSelectWarehous(false);
                                    setOpenStatusWarehouses(true);
                                }}
                                sx={{cursor: "pointer"}}
                            >
                                {warehous.Description}
                            </Typography>
                        ) : (
                            <Box>
                                {warehouses.length ? 'Оберіть відділення:' : ''}
                                <Box
                                    sx={{
                                        maxHeight: "150px",
                                        maxWidth: "450px",
                                        overflowY: "scroll",
                                        display: openStatusWarehouses ? "block" : "none",
                                        margin: '5px 0 0 0'
                                    }}
                                >
                                    <Grid container spacing={2}>
                                        {warehouses.length
                                            ? warehouses.map((item, index) => {
                                                return (
                                                    <Grid item xs={12} key={index}>
                                                        <Typography
                                                            variant="subtitle1"
                                                            color="primary"
                                                            onClick={() => handleChangeWarehouses(item)}
                                                            sx={{cursor: "pointer"}}
                                                        >
                                                            {item.Description}
                                                        </Typography>
                                                    </Grid>
                                                );
                                            })
                                            : ""}
                                    </Grid>
                                </Box>
                            </Box>
                        )}
                    </Grid>
                    <Grid container item xs={12} justifyContent="flex-end">
                        <Button variant="contained" color="primary" size="medium" type="submit">
                            Замовити Товар
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}




