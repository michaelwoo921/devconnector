import React from 'react';
import {Link} from 'react-router-dom'
import {setAlert} from '../../actions/alert';
import {connect} from 'react-redux'

const Login = ({setAlert}) => {

  const onSubmit = e => {
    e.preventDefault();
    setAlert('login failed', 'danger')
  }

  return (
  <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" action="dashboard.html"  onSubmit= {onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login"
         
         />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
  </section>
  )
}

export default connect(null, {setAlert})(Login)