// este va a ser el provider, para hacer el refresh del token, crear el usuario etc.
import React, { useState, useEffect, createContext } from 'react';
import jwtDecode from "jwt-decode";
import { getAccessTokenApi, getRefreshTokenApi, refreshAccessTokenApi, logout } from '../Api/auth';

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserLogin(setUser);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
//voy a hacer una funcion para comprobar de manera general si el token y el usuario son validos, esto va a ser para envolver toda la app
async function checkUserLogin(setUser) {
  const accessToken = await getAccessTokenApi();
  if (!accessToken) {
    const refreshToken = await getRefreshTokenApi();

    if (!refreshToken) {
      logout();
      setUser({
        user: null,
        isLoading: false,
      });
    } else {
      await refreshAccessTokenApi(refreshToken);
    }
  } else {
    setUser({
      user: jwtDecode(accessToken),
    });
  }
}