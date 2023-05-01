import {Auth} from "@/Interfaces/ProvidersInterface"
import {useState} from "react";
import {Box, Button, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Form} from "@/Interfaces/Form";
import * as yup from "yup";
import {useNovaPoshta} from "@/hooks/novaPoshta";
import {cityStyle} from "@/styles/checkoutStyle";
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
    };

    const handleChangeWarehouses = (item: any) => {
        setWarehous(item);
        setOpenStatusWarehouses(false)
        setShowSelectWarehous(true)
    };

    return (
        <div>
            <form onSubmit={handleSubmit((data) => {
                data.arey = city.MainDescription as string
                data.warehous = warehous.Description
                data.item = items
                if (data.arey && data.warehous) {
                    addNotification("Item add SUCCESS", NotificationKeys.SUCCESS);
                    addItemToOrders(data)
                    removeCart()
                    Router.push("/waitorder");
                } else {
                    addNotification("Select Array and Warehous ", NotificationKeys.ERROR);
                }
            })}>
                <TextField
                    error={!!errors.name}
                    label="Name"
                    {...register("name", {required: true})}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    helperText={errors.name?.message}
                />


                <TextField
                    error={!!errors.mail}
                    label="Email"
                    {...register("mail", {required: true})}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    helperText={errors.name?.message}
                />

                <TextField
                    error={!!errors.number}
                    label="Phone number"
                    {...register("number", {required: true})}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    helperText={errors.name?.message}
                />

                <input onChange={(event) => {
                    setCity(event);
                    setShowSelectCity(false);
                    setOpenStatus(true);
                    setWarehousess([])
                    setWarehous({})
                }}/>

                {city && showSelectCity ? <Box>{city.MainDescription ? city.MainDescription : 'EMPTY'}</Box> :
                    <Box sx={{
                        maxHeight: '150px',
                        maxWidth: "450px",
                        overflowY: 'scroll',
                        display: openStatus ? 'block' : 'none'
                    }}>
                        {cityes.length ? cityes.map((item, index) => {
                            return (
                                <Box key={index} sx={cityStyle} onClick={() => handleChange(item)}>{item.Present}</Box>
                            )
                        }) : ''}
                    </Box>}


                {warehous && showSelectWarehous ? <Box onClick={() => {
                    setShowSelectWarehous(false);
                    setOpenStatusWarehouses(true)
                }}>{warehous.Description}</Box> : <Box sx={{
                    maxHeight: '150px',
                    maxWidth: "450px",
                    overflowY: 'scroll',
                    display: openStatusWarehouses ? 'block' : 'none',
                    margin: '150px 0 0 250px'
                }}>
                    {warehouses.length ? warehouses.map((item, index) => {
                        return (
                            <Box key={index} sx={cityStyle}
                                 onClick={() => handleChangeWarehouses(item)}>{item.Description}</Box>
                        )
                    }) : ''}

                </Box>}

                <Button variant="outlined" size="medium" type="submit">
                    Add Item
                </Button>
            </form>
        </div>
    )
}