import {ACCESS_TOKEN,REFRESH_TOKEN} from "../Utils/constants";
import AsyncStorage from "@react-native-community/async-storage";
import jwtDecode from "jwt-decode";


export function getAccessTokenApi(){
    const accessToken = AsyncStorage.getItem(ACCESS_TOKEN);

    if(!accessToken || accessToken === "null"){
        return null;
    }
    

    return willExpireToken(accessToken) ? null : accessToken;
}

export function getRefreshTokenApi(){
    const refreshToken = AsyncStorage.getItem(REFRESH_TOKEN);

    if(!refreshToken || refreshToken === "null"){
        return null;
    }

    return willExpireToken(refreshoken) ? null : refreshToken;
}

export function refreshAccessTokenApi(refreshToken){
    const url="http://192.168.0.11:4000/api/auth/refresh-access-token";
    const bodyObj = {
        refreshToken: refreshToken,
    };
    const params = {
        method:"POST",
        body: JSON.stringify(bodyObj),
        heathers : {
            "Content-Type":"application/json"
        },
    };

    fetch(url,params)
    .then(response=>{
        if(response.status !== 200){
            return null;
        }

        return response.json();
    })
    .then(result => {
        if(!result){
            //Esto va a ser para desloguear usuario, o sea limpiar el token
            logout();
        }else{//con esto refrescamos el token desde el cliente
            const {accessToken, refreshToken} = result;
            AsyncStorage.setItem(ACCESS_TOKEN,accessToken);
            AsyncStorage.setItem(REFRESH_TOKEN,refreshToken);
        }
    });
}

export function logout(){
    //esto es para remover el token, eliminarlo 
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    //esto significa, que si no hay token, no hay usuario logueado
}

export function willExpireToken(token){
    const seconds = 60;
    const metaToken = jwtDecode(token);
    const { exp } = metaToken;
   // const expCaducado = exp + 10000000;
    const now = (Date.now()+seconds) / 1000;

        return now > exp;
}