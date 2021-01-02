import { ACCESS_TOKEN, REFRESH_TOKEN } from "../Utils/constants";
import { basePath } from './config';
import AsyncStorage from "@react-native-community/async-storage";
import jwtDecode from "jwt-decode";


export function getAccessTokenApi() {
    const accessToken = AsyncStorage.getItem(ACCESS_TOKEN).then(response => { return response; });
    console.log('accessToken en getAccessTokenApi: ', accessToken);
    if (!accessToken || accessToken === "null") {
        console.log(accessToken);
        return null;
    }

    console.log("token", accessToken);


    return willExpireToken(accessToken) ? null : accessToken;
}

export function getRefreshTokenApi() {
    const refreshToken = AsyncStorage.getItem(REFRESH_TOKEN).then(response => { return response; });
    console.log("No se ", refreshToken);
    if (!refreshToken || refreshToken === "null") {
        return null;
    }

    return willExpireToken(refreshoken) ? null : refreshToken;
}

export function refreshAccessTokenApi(refreshToken) {
    const url = `${basePath}/auth/refresh-access-token`;
    const bodyObj = {
        refreshToken: refreshToken,
    };
    const params = {
        method: "POST",
        body: JSON.stringify(bodyObj),
        heathers: {
            "Content-Type": "application/json"
        },
    };

    fetch(url, params)
        .then(response => {
            if (response.status !== 200) {
                return null;
            }

            return response.json();
        })
        .then(result => {
            if (!result) {
                //Esto va a ser para desloguear usuario, o sea limpiar el token
                logout();
            } else {//con esto refrescamos el token desde el cliente
                const { accessToken, refreshToken } = result;
                console.log(result);
                AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
                AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
            }
        });
}

export function logout() {
    //esto es para remover el token, eliminarlo 
    AsyncStorage.removeItem(ACCESS_TOKEN);
    AsyncStorage.removeItem(REFRESH_TOKEN);
    //esto significa, que si no hay token, no hay usuario logueado
}

export function willExpireToken(token) {
    const seconds = 60;
    console.log("antes", token)
    const metaToken = jwtDecode(token);
    console.log("despues")
    const { exp } = metaToken;
    // const expCaducado = exp + 10000000;
    const now = (Date.now() + seconds) / 1000;

    return now > exp;
}