import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Favoritos from "../components/Favoritos";

const Stack = createStackNavigator();

export default function favoritosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favoritos"
        component={Favoritos}
        options={{ title: "Talleres Favoritos" }}
      />
    </Stack.Navigator>
  );
}