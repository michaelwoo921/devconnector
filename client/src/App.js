import './App.css';
import React, {useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store';
import { loadUser } from './actions/auth';

import PrivateRoute from './component/routing/PrivateRoute';
import GuestRoute from './component/routing/GuestRoute';

import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import Profiles from './component/profiles/Profiles';
import Profile from './component/profile/Profile';
import Posts from './component/posts/Posts';
import Post from './component/post/Post';
import Dashboard from './component/dashboard/Dashboard';
import Alert from './component/layout/Alert';
import AddEducation from './component/profile-form/AddEducation';
import AddExperience from './component/profile-form/AddExperience';
import ProfileForm from './component/profile-form/ProfileForm';
// import Spinner from './component/layout/Spinner';
import NotFound from './component/layout/NotFound';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>  
        <Navbar />
        <Alert />
     
        <Routes>     
        <Route path='/' element = { <GuestRoute><Landing /></GuestRoute> }/>
        <Route path='/dashboard' element = { <PrivateRoute><Dashboard /></PrivateRoute> }/>
        <Route path='/register' element = { <GuestRoute><Register /></GuestRoute> }/>
        <Route path='/login' element = { <GuestRoute><Login /></GuestRoute> }/>
        <Route path='/profiles' element = { <Profiles /> }/>
        <Route path='/profile/:id' element = { <Profile /> }/>
        <Route path='/add-education' element = { <PrivateRoute><AddEducation /></PrivateRoute> }/>
        <Route path='/add-experience' element = { <PrivateRoute><AddExperience /></PrivateRoute> }/>
        <Route path='/create-profile' element = { <PrivateRoute><ProfileForm /></PrivateRoute> }/>
        <Route path='/edit-profile' element = { <PrivateRoute><ProfileForm /></PrivateRoute> }/>
        <Route path='/posts' element = { <PrivateRoute><Posts /></PrivateRoute> }/>
        <Route path='/post/:id' element = { <PrivateRoute><Post /></PrivateRoute> }/>
        <Route path='*' element = { <NotFound /> }/>
      </Routes>

      </Router>
      </Provider>
   

  
  );
}


export default App;
