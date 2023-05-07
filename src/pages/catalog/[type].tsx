import {useItems} from "@/hooks/useItems";
import {useEffect, useState} from "react";
import {Item} from "@/Interfaces/ItemIterface";
import Image from "next/image";
import {ADMIN_UID} from "@/services/localKey";
import {useRouter} from "next/router";
import {Auth} from "@/Interfaces/ProvidersInterface";
import {useAuth} from "@/hooks/useAuth";
import {
    Box,
    Button,
    CardContent,
    CircularProgress,
} from "@mui/material";
import {useCartContext} from "@/hooks/useCartContext";
import {ButtonsContainer, CardsWrapper, CardWrapper, ItemName, Price} from "@/styles/itemTypeStyle";
import {capitalizeFirstLetter} from "@/utils/firstLetter";

const TypePage = () => {
    const {authContext} = useAuth();
    const {itemHook, getItem, deleteItem} = useItems();
    const {addItemCart} = useCartContext();
    const [user, setUser] = useState({} as Auth);
    const router = useRouter();

    useEffect(() => {
        getItem(String(router.query.type));
    }, [router]);

    useEffect(() => {
        setUser(authContext);
    }, [authContext]);

    const remover = (id: number, type: string) => {
        deleteItem(id, String(type));
        const indexGoods = itemHook?.map((id: Item) => id.id).indexOf(id);
        itemHook?.splice(indexGoods, 1);
    };

    const openItem = (item: any) => {
        router.push({
            pathname: `/catalog/item/${Math.random().toString(36).substr(2, 9)}`,
            query: {item: JSON.stringify(item), items: JSON.stringify(itemHook)},
        });
    };

    const clickDelete = (e: any, id: number) => {
        e.stopPropagation();
        remover(id, String(router.query.type));
    };

    const clickAddCart = (e: any, item: any) => {
        e.stopPropagation();
        addItemCart(item);
    };

    return (
        <Box>
            {itemHook.length ? (
                <CardsWrapper>
                    {itemHook?.map((item) => (
                        <CardWrapper key={item.id} onClick={() => openItem(item)}>
                            <Image src={item.photo} alt={item.name} width={350} height={400}
                                   style={{borderRadius: '4px'}}/>
                            <CardContent>
                                <ItemName sx={{maxWidth: '250px'}}>{capitalizeFirstLetter(item.name)}</ItemName>
                                <Price>{item.cost} UAH</Price>
                                <ButtonsContainer>
                                    <Button onClick={(e) => clickAddCart(e, item)} variant="contained">Додади до
                                        кошику</Button>
                                    {user.user && user.user.uid !== ADMIN_UID.UID ? (
                                        ""
                                    ) : (
                                        <Button onClick={(e) => clickDelete(e, item.id)}>Видалита</Button>
                                    )}
                                </ButtonsContainer>
                            </CardContent>
                        </CardWrapper>
                    ))}
                </CardsWrapper>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="30vh">
                    <CircularProgress sx={{minWidth: "150px", minHeight: '150px', margin: '0 auto'}}/>
                </Box>
            )}
        </Box>
    );
};

export default TypePage;
