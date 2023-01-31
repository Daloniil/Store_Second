import React from "react";
import type {AppProps} from "next/app";
import Layout from "@/layouts";
import {AuthProvider} from "@/providers/AuthProvider";
import {NotificationProvider} from "@/providers/NotificationProvider";
import {Notification} from "@/components/Notification";

const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <NotificationProvider>
            <AuthProvider>
                <Layout>
                    <Component {...pageProps} />
                    <Notification/>
                </Layout>
            </AuthProvider>
        </NotificationProvider>

    );
};

export default MyApp;
