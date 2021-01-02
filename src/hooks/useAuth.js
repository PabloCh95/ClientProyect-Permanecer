import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
// lo que va a hacer este hook es devolver todos los datos que estan dentro del token


export default () => useContext(AuthContext);