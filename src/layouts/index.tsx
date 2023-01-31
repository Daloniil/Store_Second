import {Box, Container, CssBaseline, Paper, Toolbar} from "@mui/material";

import {useRouter} from "next/router";
import React from "react";

import {useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {paths} from "@/utils/path";
import {Bar} from "@/components/Bar";
import {LayoutProps} from "@/Interfaces/LayoutInterface";
import {DrawerBar} from "@/components/Drawer";

const Layout = ({children}: LayoutProps) => {
    const router = useRouter();


    const [open, setOpen] = useState(false);
    const items = paths.find((path) => path.pathName === router.asPath);

    const theme = createTheme({
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        overflow: "hidden",
                    },
                },
            },
        },
    });


    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: "flex"}}>
                <CssBaseline/>
                <Bar
                    title={items?.title ?? ""}
                    setOpen={setOpen}
                />
                <DrawerBar openDrawer={open} setOpenDrawer={setOpen}/>

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Toolbar/>
                    <Container maxWidth="xl" sx={{mt: 4, mb: 4, width: "100vw"}}>
                        <Paper sx={{p: 2, display: "flex", flexDirection: "column"}}>
                            {children}
                        </Paper>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Layout;
