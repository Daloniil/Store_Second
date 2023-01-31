import {useNotification} from "@/hooks/useNotification";
import {NotificationKeys} from "@/services/localKey";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";


export const Notification = () => {
    const {notification, statusNotification, removeNotification} =
        useNotification();

    return (
        <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            open={!!notification}
            onClose={removeNotification}
            sx={{width: "300px", margin: "0 auto 0 auto"}}
        >
            <Alert
                elevation={6}
                variant="filled"
                severity={
                    statusNotification === NotificationKeys.SUCCESS
                        ? NotificationKeys.SUCCESS
                        : NotificationKeys.ERROR
                }
            >
                {notification ?? ""}
            </Alert>
        </Snackbar>
    );
};
