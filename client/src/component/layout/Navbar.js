import React, {useState} from 'react';
import {Link} from 'react-router-dom'



const Navbar = () => {

  const [isAuthenticated, setIsAuthenticaed] = useState(true);

  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login"
        onClick = { () => setIsAuthenticaed(true)}
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
           onClick = { () => setIsAuthenticaed(false)}
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
    {isAuthenticated ? authLinks : guestLinks}
  </nav>
  )
}

export default Navbar