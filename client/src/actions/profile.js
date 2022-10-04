import axios from 'axios';
import { 
    GET_PROFILES,
    PROFILE_ERROR,
    GET_PROFILE,
    GET_REPOS,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    CLEAR_PROFILE
 } from "./type";
 import {setAlert} from './alert'


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

// Get current or update Profile
export const createProfile =
  (formData, navigate, edit=false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post('/api/profile', formData, config);
      dispatch({ type: GET_PROFILE, payload: res.data });
      dispatch(setAlert(edit? 'Profile updated': 'Profile Created', 'success'))
      if(!edit){
        navigate('/dashboard')
      }

    } catch (err) {


      dispatch({
        type: PROFILE_ERROR
      });

 
    }
  };


// addExperience
export const addExperience = (formData, navigate) => async dispatch => {
    try{
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        navigate('/dashboard')
        dispatch(setAlert('Experience credential added', 'success'))

    }catch(err){
        console.log('Profile updated')
        dispatch(setAlert('failed to add Experience credential', 'danger'))
    }
}


// addEducation
export const addEducation = (formData, navigate) => async dispatch => {
    try{
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        navigate('/dashboard')

    }catch(err){
        console.log('Profile updated')
    }
}

// delete experience
export const deleteExperience = (id) => async dispatch => {
    try{
       
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

    }catch(err){
        console.log('Profile deleted')
    }
}

//delete education
export const deleteEducation = (id) => async dispatch => {
    try{
       
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

    }catch(err){
        console.log('Profile deleted')
    }
}

 // Delete account and profile
 export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This cannot be undone!')) {
      try {
        await axios.delete(`/api/profile`);
        dispatch({
          type: CLEAR_PROFILE,
        });
        dispatch({ type: ACCOUNT_DELETED });
        dispatch(setAlert('Your account has been permanently deleted'));
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
        });
      }
    }
  };