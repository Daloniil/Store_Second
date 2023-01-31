import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React, {useEffect, useState} from "react";
import makeStyles from "@mui/styles/makeStyles";
import {useRouter} from "next/router";
import Router from "next/router";

import {paths} from "@/utils/path";
import { DrawerBarProps } from "@/Interfaces/DrawerBarInterface";


const useStyles = makeStyles(() => ({
    item: {
        backgroundColor: "#d3d3d3",
    },
    itemDark: {
        backgroundColor: "grey",
    },
    icon: {
        margin: "0 0 0 15px",
    },
}));

export const DrawerBar = ({openDrawer, setOpenDrawer}: DrawerBarProps) => {
    const [drawerStatus, setDrawerStatus] = useState(false);

    const router = useRouter();

    const classes = useStyles();

    const redirect = (pathName: string) => {
        Router.push(pathName);
    };

    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }

            setDrawerStatus(open);
            setOpenDrawer(false);
        };

    useEffect(() => {
        if (openDrawer) {
            setDrawerStatus(openDrawer);
        }
    }, [openDrawer]);

    return (
        <Drawer anchor={"left"} open={drawerStatus} onClose={toggleDrawer(false)}>
            <Box
                sx={{width: 250}}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <IconButton onClick={toggleDrawer(false)}>
                    <ChevronLeftIcon/>
                </IconButton>
                <Divider/>
                <List>
                    {paths.map((item, index) => {
                        return (
                            <ListItem
                                key={index}
                                button
                                onClick={() => redirect(item.pathName)}
                                className={
                                    item.pathName === router.asPath
                                        ? classes.item
                                        : ""
                                }
                            >
                                <ListItemText
                                    primary={item.title}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Drawer>
    );
};
