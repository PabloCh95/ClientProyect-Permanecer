import React from "react";
import { createStackNavigator }from "@react-navigation/stack";
import Cursos from "../components/Cursos/Cursos";

const Stack = createStackNavigator();

export default function mainStacks(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                    name="cursos"
                    component={Cursos}
                    options={{title:"Mis Cursos"}}
            />

        </Stack.Navigator>
    );
}