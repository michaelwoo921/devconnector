import React, {Fragment} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'



const Navbar = ({auth: {isAuthenticated, loading}}) => {

  console.log('auth, loading', isAuthenticated, loading)
  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login"
      >Login</Link></li>
    </ul>
  )

  const authLinks = (
    <ul>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/posts">Posts</Link></li>
      <li>
        |
        <Link to="/dashboard" title="Dashboard">
          <i className="fas fa-user"></i>
          <span className="hide-sm">{' '} Dashboard</span>
        </Link>
      </li>
      <li>
        <a href="#!" title="Logout" 
        >
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">{' '} Logout</span>
        </a>
      </li>
  </ul>
  )

  return (
    <nav className="navbar bg-dark">
    <h1>
      <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
    </h1>
      {true && (
          <Fragment>
          { isAuthenticated ? authLinks : guestLinks }
          </Fragment>
        )   
      }
    
   
  </nav>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Navbar)