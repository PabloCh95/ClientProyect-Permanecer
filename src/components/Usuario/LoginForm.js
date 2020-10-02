import React,{useState} from 'react';
import {View,Text,ScrollView, StyleSheet,Image } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import {Icon,Button,Input} from "react-native-elements";
import {validateEmail} from "../../Utils/validation";
import {isEmpty,size} from "lodash";

import {REFRESH_TOKEN,ACCESS_TOKEN} from "../../Utils/constants";
import {loginApi} from "../../Api/user";

export default function Login(props){
    const {toastRef}=props;
    const [mostrar, setMostrar]=useState(false);
    const [formData, setFormData] = useState({
      email:"",
      password:"",
    });

    const onChange= (e,type)=>{
      setFormData({...formData, [type]:e.nativeEvent.text})
    };

    const onSubmit= async e =>{  
      if(isEmpty(formData.email)|| isEmpty(formData.password)){
        toastRef.current.show("Todos los campos son obligatorios");
      }else if(!validateEmail(formData.email)){
        toastRef.current.show("El Email es Invalido")
      }else if(size(formData.password)<6){
        toast.current.show("El password tiene que tener al menos 6 caracteres");
      }else{
        const result=await loginApi(formData);
        if(result.message){
          toast.current.show(result.message);
        }else{
          const {accessToken,refreshToken} = result;
          console.log("accessToken: " + accessToken);
          console.log("refreshToken: " + refreshToken);
          AsyncStorage.setItem(ACCESS_TOKEN,accessToken);
          AsyncStorage.setItem(REFRESH_TOKEN,refreshToken);
         // AsyncStorage.setItem(ACCESS_TOKEN,accessToken);
         // AsyncStorage.setItem(REFRESH_TOKEN,refreshToken);
          toastRef.current.show("Logueado Correctamente");  
        }
      }
    };


    return(
          <View style={styles.formContainer}>
         
            <Input
              placeholder="Correo Electronico"
              containerStyle={styles.inputForm}
              inputContainerStyle={{backgroundColor:"#fff"}}
              onChange={(e)=> onChange(e,"email")}
              rightIcon={
                <Icon
                    type="material-community"
                    name="at"
                    iconStyle={styles.iconRight}
                 />
                }
            />
            <Input
              placeholder="Contraseña"
              containerStyle={styles.inputForm}
              inputContainerStyle={{backgroundColor:"#fff"}}
              password={true}
              secureTextEntry={mostrar ? false : true}
              onChange={(e)=> onChange(e,"password")}
              rightIcon={
                <Icon 
                    type="material-community"
                    name={mostrar ? "eye-off-outline":"eye-outline"}
                    iconStyle={styles.iconRight}
                    onPress={()=>setMostrar(!mostrar)}
                />
              }
            />
        <Button
          title="Iniciar Sesión"
          containerStyle={styles.btnContainerRegister}
          buttonStyle={styles.btnRegister}
          onPress={onSubmit}
        />
      
    </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
      flex: 1,
      alignItems:"center",
      justifyContent:"center",
      marginTop:30,
    },
    inputForm:{
      width:"100%",
      marginTop:20,
      
    },
    btnContainerRegister:{
      marginTop:20,
      width:"55%",
      borderRadius:100,
    },
    btnRegister:{
      backgroundColor: "#4CA0BB",
    },
    /*materialButtonDanger4: {
      height: 48,
      width: 120,
      borderWidth: 0,
      borderColor: "#000000",
      borderTopRightRadius: 100,
      borderRadius: 100,
      overflow: "scroll",
      backgroundColor: "rgba(116,117,253,1)",
      marginTop: 51,
      marginLeft: 140
    },*/
    image: {
      width: 200,
      height: 200,
      
      borderRadius: 100,
      marginTop: -597,
      marginLeft: 88
    },
    iconRight:{
      color:"#c1c1c1",
    },
  });