import axios from 'axios';
import { 
    GET_PROFILES,
    PROFILE_ERROR,
    GET_PROFILE,
    GET_REPOS
 } from "./type";


 // get all profiles
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

// get profile by userid
export const getProfileById = (userid) => async dispatch => {
    try{
        const res = await axios.get(`/api/profile/user/${userid}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    }catch(err){
        console.log(err)
        dispatch({
            type: PROFILE_ERROR
        })
    }

}

// get current user profile
export const getCurrentProfile = () => async dispatch => {
  
    try{
        const res = await axios.get('/api/profile/me')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: PROFILE_ERROR
        })
    }
}


// get github repos
export const getGithubRepos = username => async dispatch => {
    try{
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: PROFILE_ERROR
        })
    }
}
