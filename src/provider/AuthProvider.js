// este va a ser el provider, para hacer el refresh del token, crear el usuario etc.
import React, { useState, useEffect, createContext } from 'react';
import { getAccessTokenApi, getRefreshTokenApi, refreshAccessTokenApi, logout } from '../Api/auth';

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState({
    user: null, //cuando el usuario no esta logueado
    isLoading: true,
  });
  console.log(user, children);
  useEffect(() => {
    (async () => await checkUserLogin(setUser))
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
//voy a hacer una funcion para comprobar de manera general si el token y el usuario son validos, esto va a ser para envolver toda la app
async function checkUserLogin(setUser) {
  const accessToken = await getAccessTokenApi();
  console.log('accessToken: ', accessToken);
  if (!accessToken) {
    const refreshToken = getRefreshTokenApi();

    if (!refreshToken) {
      logout();
      setUser({
        user: null,
        isLoading: false,
      });
    } else {
      refreshAccessTokenApi(refreshToken);
    }
  } else {
    setUser({
      isLoading: false,
      user: jwtDecode(accessToken),
    });
  }
}