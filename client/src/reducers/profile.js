import { 
    GET_PROFILES,
    PROFILE_ERROR
 } from "../actions/type"
const initialState ={
    profiles: [],
    profile: null,
    loading: true,
}

const profile = (state=initialState, action) => {
    const {type, payload} = action;
    switch(type){
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                profiles: [],
                profile: null,
                loading: false

            }
        default:
            return state;
    }

}

export default profile;