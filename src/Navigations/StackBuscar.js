import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Buscar from '../components/Buscar'

const Stack = createStackNavigator();

export default function buscarStack()
{
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='buscar'
                component={Buscar}
                options={{title:'Buscar'}}
            />
        </Stack.Navigator>
    );
}