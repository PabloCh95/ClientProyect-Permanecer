//va a ser un hook desde 0, para comprobar si el usuario esta logueado o no esta logueado, tambien vamos a comprobar el token , si es correcto y si no lo esta
//este va a ser el hook
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

export default () => useContext(AuthContext);