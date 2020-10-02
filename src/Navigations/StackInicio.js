import React from "react";
import {createStackNavigator} from "@react-navigation/stack"; //importamos una funcion de navigation stack

import Inicio from "../components/Inicio"; //importamos el screen "inicio"
const Stack=createStackNavigator(); // guardamos en una constante la funcion que importamos 
export default function inicioStack()
{
    return(
        //si o si tenemos que utilizar la funcion navigator para poder armar el sistema de navegacion (el stack)
        <Stack.Navigator> 
            <Stack.Screen
             name="inicio"
             component={Inicio}
             option={{title:"Inicio"}} //esto muestra el titulo
            />
        </Stack.Navigator>
    );
}