import axios from 'axios'
import setAuthToken from '../utils/setAuthToken';
import { 
    REGISTER_FAIL, 
    REGISTER_SUCCESS, 
    USER_LOADED, 
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT 
} from "./type";
import { setAlert } from './alert';

// load user
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    
    try{
      
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    }catch(err){
        console.log(err.response);
        dispatch({
            type: AUTH_ERROR
        })

    }
}

// register user
export const register = ({email, password, name}) => async dispatch => {

    const config = {
        headers: {'Content-Type': 'application/json'}
    }
    const body = JSON.stringify({email, password, name});
    
    try{
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    }catch(err){
       
        const {errors} = err.response.data;
        errors.forEach(error => {
            dispatch(setAlert(error.msg, 'danger'))
        })
        dispatch({
            type: REGISTER_FAIL,
            
        })
    }
}

// login user
export const login = (email, password) => async dispatch => {
    const body = JSON.stringify({email, password})
    const config = {
        headers: { 'Content-Type': 'application/json' }  
    }
    try{
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())

    }catch(err){
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// logout

export const logout = () => async dispatch => {
    try{
        dispatch({
            type: LOGOUT
        })
    }catch(err){
        console.log(err)
    }
   
}




