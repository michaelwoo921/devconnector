import {combineReducers} from 'redux'
import alert from './alert';
import auth from './auth'

const reducer = combineReducers({
    alert,
    auth
})

export default reducer;