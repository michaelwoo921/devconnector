import { 
    GET_PROFILES,
    PROFILE_ERROR,
    GET_PROFILE,
    GET_REPOS,
    UPDATE_PROFILE,
    CLEAR_PROFILE
 } from "../actions/type"
const initialState ={
    profiles: [],
    profile: null,
    loading: true,
    repos: []
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
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }

        case PROFILE_ERROR:
            return {
                ...state,
                profiles: [],
                repos: [],
                profile: null,
                loading: false
            }
        case GET_REPOS: 
            return {
                ...state,
                repos: payload,
                loading: false,
            }

        case CLEAR_PROFILE:
            return {
                profiles: [],
                profile: null,
                loading: false,
                repos: []
            }

        default:
            return state;
    }

}

export default profile;