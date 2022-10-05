import {
    GET_POSTS, 
    POST_ERROR,
    ADD_POST, 
    GET_POST, 
    UPDATE_LIKES, 
    DELETE_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './type';
import { setAlert } from './alert';
import axios from 'axios';

// GET posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({ 
        type: GET_POSTS, 
        payload: res.data 
    });
  } catch (err) {
   
    dispatch({
      type: POST_ERROR,
      payload: { 
        msg: err.response.statusText, 
        status: err.response.status 
    },
    });
  }
};

export const addLikes = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postid}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id: postid,
        likes: res.data,
      },
    });
  } catch (err) {
  
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeLikes = (postid) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postid}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id: postid,
        likes: res.data,
      },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { 
        msg: err.response.statusText, 
        status: err.response.status 
    },
    });
  }
};

export const deletePost = (postid) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postid}`);

    dispatch({
      type: DELETE_POST,
      payload: postid,
    });

    dispatch(setAlert('Post removed', 'success'));
  } catch (err) {

    dispatch({
      type: POST_ERROR,
      payload: { 
        msg: err.response.statusText, 
        status: err.response.status 
    },
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`/api/posts/`, formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
 
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({ type: GET_POST, payload: res.data });
  } catch (err) {
   console.log(err)
    dispatch({
      type: POST_ERROR,
    });
  }
};

export const addComment = (postid, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `/api/posts/comment/${postid}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment added', 'success'));
  } catch (err) {
    console.log('***', err.response);
    dispatch({
      type: POST_ERROR,
      payload: { 
        msg: err.response.statusText, 
        status: err.response.status 
    },
    });
  }
};

export const deleteComment = (postid, commentid) => async (dispatch) => {

  try {
    await axios.delete(`/api/posts/comment/${postid}/${commentid}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentid,
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    
    dispatch({
      type: POST_ERROR,
      payload: { 
        msg: err.response.statusText, 
        status: err.response.status 
    },
    });
  }
};
