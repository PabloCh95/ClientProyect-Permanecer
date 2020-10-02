import React, {useRef} from 'react';
import {View,Text,ScrollView, StyleSheet, Image} from 'react-native';
import {Divider} from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import LoginForm from '../../components/Usuario/LoginForm'



export default function login()
{
    const toastRef = useRef();

    return(
    <KeyboardAwareScrollView style={styles.container}>
        
            <Image
                source={require('../../../assets/Img/jpg/LogoEjercito.jpg')}
                resizeMode="contain"
                style={styles.logo}
            />
           <View style={styles.viewContainer}>
            <LoginForm toastRef={toastRef}/>
            <CreateAccount/>
            </View>
            <Divider style={styles.divider}/>

            <Toast ref={toastRef} position="center" opacity={0.9}/>
    </KeyboardAwareScrollView>
    );
}
function CreateAccount(){
    const Navigation =useNavigation();
    return(
        <Text style={styles.textRegister}>
            ¿Aun no tienes una cuenta?
            <Text style={styles.btnRegister} onPress={()=>Navigation.navigate("register")}> Registrate </Text>
        </Text>
    );
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:"#DACDB2",
    }, 
    logo:{
        width:"100%",
        height:150,
        marginTop:20,
    },
    viewContainer:{
        marginRight:40,
        marginLeft:40,
    },
    textRegister:{
        marginTop:15,
        marginLeft:10,
        marginRight:10,
    },
    btnRegister:{
        color:"#4CA0BB",
        fontWeight:"bold",
    },
    divider:{
        backgroundColor:"#4CA0BB",
        margin:40,
    },
});