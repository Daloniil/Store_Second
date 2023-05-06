import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {BarProps} from "@/Interfaces/BarInterface";
import Button from "@mui/material/Button";
import {useLogin} from "@/hooks/useLogin";
import {useAuth} from "@/hooks/useAuth";
import {useEffect, useState} from "react";
import {Auth} from "@/Interfaces/ProvidersInterface";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {redirectTo} from "@/utils/redirect";
import {useRouter} from "next/router";
import {capitalizeFirstLetter} from "@/utils/firstLetter";

export const Bar = ({setOpen, title}: BarProps) => {
    const router = useRouter();
    const {item} = router.query;
    const [parsItemTitle, setParsItemTitle] = useState('')


    const {signIn, signOutGoogle} = useLogin();
    const {authContext} = useAuth();

    const [user, setUser] = useState({} as Auth);

    const drawerWidth: number = 240;

    useEffect(() => {
        setUser(authContext)
    }, [authContext])

    useEffect(() => {
        if (item) {
            //@ts-ignore
            setParsItemTitle(JSON.parse(item).name)
        }
    }, [item])

    const AppBar = styled(MuiAppBar)(({theme}) => ({
        zIndex: 1,
        marginLeft: drawerWidth,
        width: `100%`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: "#1c54b2",
    }));

    return (
        <AppBar position="absolute">
            <Toolbar>
                <IconButton
                    edge="start"
                    aria-label="open drawer"
                    onClick={() => setOpen(true)}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{flexGrow: 1, padding: '0 0 0 5px'}}
                >
                    {title ? title : capitalizeFirstLetter(parsItemTitle)}
                </Typography>

                <ShoppingCartIcon onClick={() => redirectTo('/cart')} sx={{margin: '0 5px 0 0'}}/>

                {user.user?.uid ? <Typography>{user.user.displayName}</Typography>
                    : ''}
                {user.user?.uid ? <Button onClick={signOutGoogle} color="inherit"
                                          sx={{textTransform: "none", fontSize: '16px'}}>Вийти</Button> :
                    <Button onClick={signIn} color="inherit"
                            sx={{textTransform: "none", fontSize: '16px'}}>Авторизуватися</Button>}
            </Toolbar>
        </AppBar>
    );
};

