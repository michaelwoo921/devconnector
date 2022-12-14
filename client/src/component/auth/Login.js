import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {setAlert} from '../../actions/alert';
import { login } from '../../actions/auth';
import {connect} from 'react-redux'

const Login = ({setAlert, login}) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault();
    login(email, password)
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
            value={email}
            onChange ={ onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange ={ onChange}
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

export default connect(null, {setAlert, login})(Login)