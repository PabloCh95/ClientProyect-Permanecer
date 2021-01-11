import { ACCESS_TOKEN, REFRESH_TOKEN } from "../Utils/constants";
import { basePath } from './config';
import AsyncStorage from "@react-native-community/async-storage";
import jwtDecode from "jwt-decode";


export async function getAccessTokenApi() {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN).then(response => { return response; });
    if (!accessToken || accessToken === "null") {
        return null;
    }

    return willExpireToken(accessToken) ? null : accessToken;
}

export async function getRefreshTokenApi() {
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN).then(response => { return response; });
    if (!refreshToken || refreshToken === "null") {
        return null;
    }
    return willExpireToken(refreshToken) ? null : refreshToken;
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
        .then(async result => {
            if (!result) {
                //Esto va a ser para desloguear usuario, o sea limpiar el token
                logout();
            } else {//con esto refrescamos el token desde el cliente
                const { accessToken, refreshToken } = result;
                await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
                await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
            }
        });
}

export async function logout() {
    //esto es para remover el token, eliminarlo 
    console.log("entro a logout");
    await AsyncStorage.removeItem(ACCESS_TOKEN);
    await AsyncStorage.removeItem(REFRESH_TOKEN);
    //esto significa, que si no hay token, no hay usuario logueado
}

export function willExpireToken(token) {
    const seconds = 60;
    const metaToken = jwtDecode(token);
    const { exp } = metaToken;
    // const expCaducado = exp + 10000000;
    const now = (Date.now() + seconds) / 1000;

    return now > exp;
}