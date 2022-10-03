import axios from 'axios';
import { 
    GET_PROFILES,
    PROFILE_ERROR
 } from "./type";


export const getProfiles = () => async dispatch => {
    try{
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })

    }catch(err){
        console.log(err)
        dispatch({
            type: PROFILE_ERROR
        })
    }

}