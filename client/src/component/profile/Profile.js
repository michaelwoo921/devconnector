import React, {useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { getProfileById } from '../../actions/profile'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileGithub from './ProfileGithub'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'

const Profile = ({getProfileById, profile: {profile, loading}}) => {

  const {id} = useParams()

  useEffect(() => {
    getProfileById(id)
  }, [getProfileById, id])

  return ( !loading && profile &&
    <section className="container">
    <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>

    <div className="profile-grid my-1">
      <ProfileTop profile = {profile}/>
      <ProfileAbout profile={profile}/>
     
      <div className="profile-exp bg-white p-2">
        <h2 className="text-primary">Experience</h2>
        {profile.experience.length >0 ? (
          profile.experience.map(experience => <ProfileExperience key={experience._id} experience ={experience} />    )
        ): (
          <h4> No Experience credential</h4>
        )}
           
      </div>
      <div className="profile-edu bg-white p-2">
        <h2 className="text-primary">Education</h2>
        {profile.education.length >0 ? (
          profile.education.map(education => <ProfileEducation key={education._id} education ={education} /> )
        ): (
          <h4> No Education credential</h4>
        )}
        
      </div>
      {profile.githubusername && (
        <ProfileGithub username = {profile.githubusername}/>
      )}
    </div>
  </section>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getProfileById})(Profile)