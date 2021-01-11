import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native"; //aca imporo un componente de navigation, para aplicar el navigation en los screens
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";// importo componentes de navigation para los botones 
import { createDrawerNavigator } from "@react-navigation/drawer";
//esto que se importa es una funcion , esto lo hacemos para tener los menutabs...
import { Icon } from "react-native-elements"; //importamos los iconos de react-native-elements
//pestañas
//import Inicio from "../components/Inicio";
import inicioStack from "./StackInicio";
//import Login from "../components/Usuario/Login";
import cuentaStack from "./StackCuenta";
//import SignUp from "../components/Usuario/SignUp";
//import Main from "../components/Main";
import buscarStack from "./StackBuscar";

import cursosStack from "./StackCursos";
//import Familiares from "../components/Familiares";
import favoritosStack from "./StackFavoritos";

const Tab = createBottomTabNavigator();//aplico el tab del navigation o sea los botones de opciones.

export default function Navigation() {

    return (
        //dentro de navigation cointainer aplico todos los tabs que quiera crear y que importe de las pestañas
        //cambie los colores de las navegaciones a un tema oscuro (pensar como hacer un navbar y que tenga la opcion de cambiar color)
        <NavigationContainer>
            <Tab.Navigator

                initialRouteName="cursos"
                tabBarOptions={{
                    inactiveTintColor: "#646464",
                    activeTintColor: "#4CA0BB",
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color)
                })}
            >
                <Tab.Screen
                    name="inicio"//le pongo un nombre al screen ,esto tambien apareceria en el menu, pero para que no aparezca asi, utilizamos "options"
                    component={inicioStack}//el componente al que se va a renderizar (el que importamos)
                    options={{ title: "Inicio" }}//es una propiedad que recibe un objeto "title: "Inicio"" >> esto es lo que va a aparecer en el menu
                />
                <Tab.Screen
                    name="cursos"
                    component={cursosStack}
                    options={{ title: "Mis Cursos" }} />
                <Tab.Screen
                    name="favoritos"
                    component={favoritosStack}
                    options={{ title: "TOP Favoritos" }} />
                <Tab.Screen
                    name="buscar"
                    component={buscarStack}
                    options={{ title: "Buscar" }}
                />
                <Tab.Screen
                    name="cuenta"
                    component={cuentaStack}
                    options={{ title: "Cuenta" }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

function screenOptions(route, color) {
    let iconName; //variable que vamos a emplear para definir el nombre del icono, por ahora lo ponemos vacio porque se va a completar de acuerdo a lo que seleccionemos en route

    switch (route.name) //empleamos un switch para que, de acuerdo a la opcion se apliquen los diferentes iconos 
    {
        case "inicio":
            iconName = 'home' //nombre del icono
            break;
        case "cursos":
            iconName = 'graduation'
            break;
        case "favoritos":
            iconName = 'heart'
            break;
        case "buscar":
            iconName = 'magnifier'
            break;
        case "cuenta":
            iconName = 'user'
            break;
        default:
            break;
    }
    return (
        <Icon type="simple-line-icon" name={iconName} size={22} color={color} />
    ); //type me indica de donde lo saque, o sea la fuente , size el tamaño en pixeles, y color, el color que va a tener el icono
}