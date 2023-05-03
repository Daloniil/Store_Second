import {useEffect, useState} from "react";
import {Auth} from "@/Interfaces/ProvidersInterface";
import {useAuth} from "@/hooks/useAuth";
import Router from "next/router";
import {ADMIN_UID, NotificationKeys} from "@/services/localKey";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {ItemAdd} from "@/Interfaces/ItemIterface";
import {Button, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {useItems} from "@/hooks/useItems";
import {useNotification} from "@/hooks/useNotification";

const AddPage = () => {
    const {authContext} = useAuth();
    const {itemType, addItem} = useItems();
    const {addNotification} = useNotification();


    const [user, setUser] = useState({} as Auth);
    const [imageToUpload, setImageToUpload] = useState('');
    const [type, setType] = useState('0');


    useEffect(() => {
        setUser(authContext)
    }, [authContext])

    useEffect(() => {
        if (user.user && user.user.uid !== ADMIN_UID.UID) {
            Router.push("/main");
        }
    }, [user])


    const schema = yup.object().shape({
        name: yup.string().required("This Field Cannot Be Empty"),
        description: yup.string().required("This Field Cannot Be Empty"),
        cost: yup.number().required("This Field Cannot Be Empty"),
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<ItemAdd>({resolver: yupResolver(schema)});


    const imageUploaded = (): void => {
        // @ts-ignore
        const file = document.querySelector('input[type=file]').files[0];

        const reader = new FileReader();

        reader.onload = () => {
            if (!reader || !reader.result) return;
            if (file == null) {
                return;
            }
            const ready = new FileReader();
            ready.readAsDataURL(file);
            ready.onload = function () {
                const re = this.result as string;
                const img = new Image();
                img.src = re;
                img.onload = function () {
                    const that = this;
                    const w = '800';
                    const h = '800';
                    const quality = 1; // quality
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const anw = document.createAttribute('width');
                    anw.nodeValue = w;
                    const anh = document.createAttribute('height');
                    anh.nodeValue = h;
                    canvas.setAttributeNode(anw);
                    canvas.setAttributeNode(anh);
                    // @ts-ignore
                    ctx?.drawImage(that, 0, 0, w, h);
                    const base64 = canvas.toDataURL('image/webp', quality);
                    setImageToUpload(base64);
                };
            };
        };
        reader.readAsDataURL(file);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };


    return (
        <div>
            Додати
            <form
                onSubmit={handleSubmit((data) => {
                    data.photo = imageToUpload
                    data.type = itemType[Number(type)].pathName
                    if (data.photo && data.type) {
                        console.log(data)
                        addItem(data)
                        addNotification("Item add SUCCESS", NotificationKeys.SUCCESS);
                        reset()
                    } else {
                        addNotification("Select type and photo", NotificationKeys.ERROR);
                    }
                })}
                style={{margin: "0 auto"}}
            >
                <InputLabel id="demo-simple-select-label">Оберіть тип товару</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Type"
                    onChange={handleChange}
                >
                    {itemType.map((itemT, index) => {
                        return (
                            <MenuItem value={index} key={index}>{itemT.title}</MenuItem>
                        )
                    })}
                </Select>

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
                    error={!!errors.cost}
                    label="cost"
                    {...register("cost", {required: true})}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    helperText={errors.cost?.message}
                />

                <TextField
                    error={!!errors.description}
                    label="description"
                    {...register("description", {required: true})}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    helperText={errors.description?.message}
                />


                <input name="myFile" type="file" onChange={imageUploaded}/>

                <Button variant="outlined" size="medium" type="submit">
                    Add Item
                </Button>

            </form>


        </div>
    )
}

export default AddPage