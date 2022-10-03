import React from 'react'
import {Link} from 'react-router-dom'

const ProfileItem = ({profile}) => {
    const { user,  status, company, skills, location} = profile;
  return (
    <div className="profile bg-light">
    <img
      className="round-img"
      src={user.avatar}
      alt=""
    />
<div>
  <h2>{user.name}</h2>
  <p>{status} {company && (<span> at {company}</span>)}</p>
  <p>{location}</p>
  <Link to={`/profile/${user._id}`} className="btn btn-primary">View Profile</Link>
</div>

<ul>{skills.map((skill, index) => (
    <li key={index} className="text-primary">
    <i className="fas fa-check"></i> {skill}
  </li>
))}

</ul>
</div>
  )
}

export default ProfileItem