import { v4 as uuidv4 } from 'uuid';
import { REMOVE_ALERT, SET_ALERT } from "./type";

export const setAlert = (msg, alertType) => async dispatch => {
    try {
        const id = uuidv4()
        dispatch({
            type: SET_ALERT,
            payload: {
                id: id, 
                msg: msg,
                alertType: alertType
            }
        })

        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT,
                payload: id
            })
        }, 5000)

        

    } catch(err){
        console.log(err);
        console.log('error with setAlert')
    }
}
