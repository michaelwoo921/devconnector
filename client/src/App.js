import './App.css';
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import Profiles from './component/profiles/Profiles';
import Profile from './component/profile/Profile';
import Posts from './component/posts/Posts';
import Post from './component/post/Post';
import Dashboard from './component/dashboard/dashboard';
import Alert from './component/layout/Alert';
// import Spinner from './component/layout/Spinner';
import NotFound from './component/layout/NotFound';


function App() {
  return (
      <Router>  
        <Navbar />
        <Alert />
     
        <Routes>     
        <Route path='/' element = { <Landing /> }/>
        <Route path='/dashboard' element = { <Dashboard /> }/>
        <Route path='/register' element = { <Register /> }/>
        <Route path='/login' element = { <Login /> }/>
        <Route path='/profiles' element = { <Profiles /> }/>
        <Route path='/profile' element = { <Profile /> }/>
        <Route path='/posts' element = { <Posts /> }/>
        <Route path='/post' element = { <Post /> }/>
        <Route path='*' element = { <NotFound /> }/>
      </Routes>

      </Router>
  
  );
}

export default App;
