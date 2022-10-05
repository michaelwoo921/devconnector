import {combineReducers} from 'redux'
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

const reducer = combineReducers({
    alert,
    auth,
    profile,
    post
})

export default reducer;