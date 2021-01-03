import React, { useState, useEffect } from 'react';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../Utils/constants";
import useAuth from '../../hooks/useAuth';
import Loading from "../../components/Loading";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";
import AsyncStorage from '@react-native-community/async-storage';
//import {getAccessToken} from "../../Api/auth";

export default function Account() {
    const [login, setLogin] = useState(null);
    const { user } = useAuth();
    console.log("USER", user);
    //const [user,setUser] = useState(null);
    //const token=getAccessToken();
    //pensar como añadir este efecto al backend Mern
    useEffect(() => {
        !user ? setLogin(false) : setLogin(true)
    }, []);


    if (login === null) return <Loading isVisible={true} text="Cargando..." />

    return login ? <UserLogged /> : <UserGuest />
}