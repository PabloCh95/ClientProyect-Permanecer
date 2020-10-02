import React,{useRef} from "react";
import {StyleSheet,View,Text, Image} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import RegisterForm from "../../components/Usuario/RegisterForm";

export default function Register()
{   const toastRef = useRef(); // esto vamos a utilizar para que toast tenga una referencia
    //para llamarlo desde otro componente y se pueda utilizar 

    return(
        <KeyboardAwareScrollView style={styles.container}>
            <Image
            source={require("../../../assets/Img/jpg/LogoEjercito.jpg")}
            resizeMode="contain"
            style={styles.image}
            />
            <View style={styles.viewForm}>
                <RegisterForm toastRef={toastRef}/>
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </KeyboardAwareScrollView>
    );
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:"#DACDB2",
    },
    image:{
        width: "100%",
        height: 150,
        marginTop: 20,
        borderRadius: 100,
    },
    viewForm:{
        marginRight:40,
        marginLeft: 40,
        //backgroundColor:"#F8E5B7"
    }
})