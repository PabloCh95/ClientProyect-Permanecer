import React from "react";
import {StyleSheet, View , Text, ActivityIndicator} from "react-native";
import {Overlay} from "react-native-elements";

export default function Loading(props){
    const {isVisible, text} = props; //va a recibir , si es visible o no, y el texto que tiene que mostrar
    return(
        <Overlay 
        isVisible={isVisible} 
        windowBackgroundColor="rgba(0,0,0,0.5)"
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlayPrimary}
        >
            <View style={styles.view}>
                <ActivityIndicator size="large" color="#4CA0BB"/>
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </Overlay>
    );
}

const styles=StyleSheet.create({
    overlayPrimary:{
        height:100,
        width:200,
        backgroundColor:"#fff",
        borderColor:"#4CA0BB",
        borderWidth:2,
        borderRadius:10,
    },
    view:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        color:"#4CA0BB",
        textTransform:"uppercase",
        marginTop: 10,
    }
})