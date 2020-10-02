import React, { useState} from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import {Input,Icon,Button} from 'react-native-elements';
import Loading from "../Loading";
import {validateEmail} from "../../Utils/validation";
import {isEmpty,size} from "lodash";
import {useNavigation} from "@react-navigation/native"
//me falta la validazion de password e email
import {signUpApi} from "../../Api/user";

import Account from "../../screen/user/Account";


export default function RegisterForm(props) {
  
  const [mostrar, setMostrar]=useState(false);
  const [mostrarRepetir, setMostrarRepetir]= useState(false);
  const [formData , setFormData]= useState({
    name:"",
    lastname:"",
    email:"",
    password:"",
    repeatPassword:"",
  });
  const {toastRef}=props;
  const [loading,setLoading]=useState(false);
  const navigation=useNavigation();

  const onSubmit = async e => {
    if(isEmpty(formData.email)|| isEmpty(formData.password) || isEmpty(formData.repeatPassword)){
      //console.log("Todos los campos son obligatorios");
      toastRef.current.show("Todos los campos son obligatorios");
    }else if(!validateEmail(formData.email)){
       //console.log("El Email no es correcto");
       toastRef.current.show("El Email no es correcto"); 
    }else if(formData.password !== formData.repeatPassword)
    {
      //console.log("Las contraseñas tienen que ser iguales");
      toastRef.current.show("Las contraseñas tienen que ser iguales");
    }else if(size(formData.password)< 6)
    {
      toastRef.current.show("La contraseña tiene que tener al menos 6 caracteres");
      //console.log("La contraseña tiene que ser mayor a 6")
    }else{
      setLoading(true);
      const result = await signUpApi(formData);
      if(!result.ok){
        setLoading(false);
        toastRef.current.show(result.message);
      }else{
        navigation.navigate("login");
        setLoading(false);
      }
      //console.log("ok");
      //console.log(formData);
      //falta probar si crea el usuario o no.
    }
  };
  const onChange = (e,type) => {
    //setFormData({[type]: e.nativeEvent.text})
    setFormData({...formData,[type]: e.nativeEvent.text})
  };

  return (
  
   <View style={styles.formContainer}>
          <Input
            placeholder="Nombre"
            containerStyle={styles.inputForm}
            inputContainerStyle={{backgroundColor:"#fff"}}
            onChange={(e)=> onChange(e,"name")}
            rightIcon={
              <Icon
                  type="material-community"
                  name="account-box"
                  iconStyle={styles.iconRight}
               />
              }
          />
            <Input
            placeholder="Apellido"
            containerStyle={styles.inputForm}
            inputContainerStyle={{backgroundColor:"#fff"}}
            onChange={(e)=> onChange(e,"lastname")}
            rightIcon={
              <Icon
                  type="material-community"
                  name="account-box"
                  iconStyle={styles.iconRight}
               />
              }
          />
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
            onChange={(e)=> onChange(e,"password")}
            password={true}
            secureTextEntry={mostrar ? false:true}
            rightIcon={
              <Icon 
                  type="material-community"
                  name={mostrar ? "eye-off-outline" : "eye-outline" }
                  iconStyle={styles.iconRight}
                  onPress={()=>setMostrar(!mostrar)}
              />
            }
          />
          <Input
            placeholder="Repetir Contraseña"
            containerStyle={styles.inputForm}
            inputContainerStyle={{backgroundColor:"#fff"}}
            onChange={(e)=> onChange(e,"repeatPassword")}
            password={true}
            secureTextEntry={mostrarRepetir ? false:true}
            rightIcon={
              <Icon 
                   type="material-community"
                   name={mostrarRepetir ? "eye-off-outline" : "eye-outline" }
                   iconStyle={styles.iconRight}
                   onPress={()=>setMostrarRepetir(!mostrarRepetir)}
                />
          }
        />
      <Button
        title="Registrarse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
          onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Registrando"/>      
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


