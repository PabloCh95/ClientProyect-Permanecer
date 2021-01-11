import React, { useState, useEffect } from "react";
import { View, Text } from 'react-native';
import { Button, Image } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../Api/auth";
//esta va a ser la vista para los usuarios logueados
export default function UserLogged() {
    const navigation = useNavigation();
    const { user } = useAuth();

    useEffect(() => {
        !user ? console.log("entro al effect:", user) : console.log(user);

    }, [])
    const onPressLogout = () => {
        logout();
        console.log("entro a onPressLogout");
        navigation.navigate("cuenta");
    }

    return (
        <View>
            <Text></Text>
            <Button title="Cerrar Sesión" onPress={onPressLogout} />
        </View>
    );
}