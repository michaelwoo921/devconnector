import axios from 'axios'
import { REGISTER_FAIL, REGISTER_SUCCESS } from "./type";
import { setAlert } from './alert';


export const register = ({email, password, name}) => async dispatch => {

    const config = {
        headers: {'Content-Type': 'application/json'}
    }
    const body = JSON.stringify({email, password, name});
    
    console.log(body)
    try{
        

        const res = await axios.post('/api/users', body, config);
        console.log(res.data);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.token
        })
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


