import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR
} from "../actions/type";

const initialState = {
    isAuthenticated: false,
    token: localStorage.getItem('token'),
    loading: true,
    user: null
}

const auth = (state=initialState, action) => {
    const {type, payload} = action;
    switch(type){

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload

            }

        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }

        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                token: null,
                user: null
            }

        default:
            return state;
    }
}

export default auth;