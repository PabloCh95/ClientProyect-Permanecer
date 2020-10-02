import React from "react";
import {StyleSheet,ScrollView,View,Text, Image} from 'react-native';
import {Button} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";

//Esta screen va a ser para los usuarios no logueados
export default function UserGuest(){
    const Navigation = useNavigation();
    return(
        <ScrollView centerContent={true} style={styles.viewBody}>
            <Image
                source={require("../../../assets/Img/jpg/LogoEjercito.jpg")}
                resizeMode="contain"
                style={styles.image}
                />
                <Text style={styles.title}>Consulta tu perfil</Text>
                <Text style={styles.description}>
                    Las cuentas son utilizadas por los maestros, o 
                    todo aquel que quiera hacer un curso, o alguna capacitacion.
                </Text>
                <View style={styles.viewButton}>
                        <Button
                            title="Ver tu Perfil"
                            buttonStyle={styles.buttonStyle}
                            containerStyle={styles.buttonContainerStyle}
                            onPress={()=>Navigation.navigate("login")}
                        />
                </View>
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    viewBody:{
        backgroundColor:"#DACDB2",
    },
    image:{
        height:300,
        width:"100%",
        marginBottom:40,
    },
    title:{
        fontWeight:"bold",
        fontSize:19,
        marginBottom:10,
        textAlign:"center",
    },
    description:{
        textAlign:"center",
        marginBottom:20,
    },
    viewButton:{
        flex:1,
        alignItems:"center",
    },
    buttonStyle:{
        backgroundColor:"#4CA0BB",
        borderRadius:20,
    },
    buttonContainerStyle:{
        width:"70%",
    },
    
})