import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/type";

const initialState = {
    isAuthenticated: false,
    token: null,
    loading: true,
    user: null
}

const auth = (state=initialState, action) => {
    const {type, payload} = action;
    switch(type){

        case REGISTER_SUCCESS:
            return {
                ...state,
                token: payload,
                isAuthenticated: true,
                loading: false
            }

        case REGISTER_FAIL:
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