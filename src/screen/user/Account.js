import React, {useState, useEffect} from 'react';
import {View,Text} from 'react-native';
import useAuth from '../../hooks/useAuth';
import Loading from "../../components/Loading";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";

//import {getAccessToken} from "../../Api/auth";

export default function Account(){
    const [login,setLogin] = useState(null);
    const {user} = useAuth();    
    //const [user,setUser] = useState(null);
  //  const token=getAccessToken();
    //pensar como añadir este efecto al backend Mern
        useEffect(()=>{
            !user ? setLogin(false):setLogin(true)
        }, []);
    
        if (login === null) return <Loading isVisible={true} text="Cargando..."/>

    return login ? <UserLogged /> : <UserGuest />
}