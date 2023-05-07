import {useEffect, useState} from "react";
import {Auth} from "@/Interfaces/ProvidersInterface";
import {useAuth} from "@/hooks/useAuth";
import Router from "next/router";
import {ADMIN_UID, NotificationKeys} from "@/services/localKey";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {ItemAdd} from "@/Interfaces/ItemIterface";
import {Box, Button, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import {useItems} from "@/hooks/useItems";
import {useNotification} from "@/hooks/useNotification";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


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
        name: yup.string().required("Поле не повинно бути пустим"),
        description: yup.string().required("Поле не повинно бути пустим"),
        cost: yup.number()
            .typeError("Введіть число")
            .required("Поле не повинно бути пустим"),
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
                    const w = '300';
                    const h = '300';
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
            <Typography variant="h6" component="h1" gutterBottom>
                Додати Товар:
            </Typography>
            <form
                onSubmit={handleSubmit((data) => {
                    data.photo = imageToUpload
                    data.type = itemType[Number(type)].pathName
                    if (data.photo && data.type) {
                        addItem(data)
                        addNotification("Товар Успішно Додано", NotificationKeys.SUCCESS);
                        reset()
                    } else {
                        addNotification("Вкажіть Тип Товару Та Додайте Фото", NotificationKeys.ERROR);
                    }
                })}
                style={{margin: "0 auto"}}
            >
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <InputLabel id="demo-simple-select-label">Оберіть тип товару</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Тип товару"
                            onChange={handleChange}
                            fullWidth
                        >
                            {itemType.map((itemT, index) => {
                                return (
                                    <MenuItem value={index} key={index}>{itemT.title}</MenuItem>
                                )
                            })}
                        </Select>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            error={!!errors.name}
                            label="Ім'я"
                            {...register("name", {required: true})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            helperText={errors.name?.message}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            error={!!errors.cost}
                            label="Ціна"
                            {...register("cost", {required: true})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            helperText={errors.cost?.message}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            error={!!errors.description}
                            label="Опис Товару"
                            {...register("description", {required: true})}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            helperText={errors.description?.message}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" sx={{margin:'0 0 0 5px'}}>
                            <Typography variant="body1" component="h1" gutterBottom>
                                Додати Фото:
                            </Typography>
                            <input
                                name="myFile"
                                type="file"
                                id="icon-button-file"
                                onChange={imageUploaded}
                                style={{ display: "none" }}
                            />
                            <label htmlFor="icon-button-file">
                                <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                >
                                    <PhotoCameraIcon fontSize="large" />
                                </IconButton>
                            </label>
                            {imageToUpload && (
                                <Box ml={1} >
                                    <CheckCircleIcon fontSize="large" color="success" />
                                </Box>
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="outlined" size="medium" type="submit" fullWidth>
                           Додоти Товар
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default AddPage