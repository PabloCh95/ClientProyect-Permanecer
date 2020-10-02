import React from "react";
import {createStackNavigator} from "@react-navigation/stack"; //importo la funcion para crear los stack de navigator
import Account from "../screen/user/Account";
import Login from "../screen/user/Login";
import Register from "../screen/user/Register";

const Stack=createStackNavigator();

export default function cuentaStack(){

    return(
        <Stack.Navigator> 
            <Stack.Screen
              name="cuenta"
              component={Account}
              options={{title:"Perfil"}}
            />
            <Stack.Screen
                name="login"
                component={Login}
                options={{title:"Iniciar Sesion"}}
            />
            <Stack.Screen
                name="register"
                component={Register}
                options={{title:"Crear Cuenta"}}
                />       
        </Stack.Navigator>
    );
}