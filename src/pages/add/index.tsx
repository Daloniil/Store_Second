import {useEffect, useState} from "react";
import {Auth} from "@/Interfaces/ProvidersInterface";
import {useAuth} from "@/hooks/useAuth";
import Router from "next/router";
import {ADMIN_UID} from "@/services/localKey";

const AddPage = () => {
    const {authContext} = useAuth();

    const [user, setUser] = useState({} as Auth);

    useEffect(() => {
        setUser(authContext)
    }, [authContext])

    useEffect(() => {
        if (user.user && user.user.uid !== ADMIN_UID.UID) {
            Router.push("/main");
        }
    }, [user])

    return (
        <div>
            Add
        </div>
    )
}

export default AddPage