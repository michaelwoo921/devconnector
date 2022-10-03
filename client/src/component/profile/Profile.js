import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import { getProfileById } from '../../actions/profile'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAout'
import ProfileGithub from './ProfileGithub'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'

const Profile = ({getProfileById, profile: {profile, loading}}) => {

  const {id} = useParams()

  useEffect(() => {
    getProfileById(id)
  }, [getProfileById, id])

  console.log(loading, profile)

  return ( !loading && profile &&
    <section className="container">
    <a href="profiles.html" className="btn btn-light">Back To Profiles</a>

    <div className="profile-grid my-1">
      <ProfileTop profile = {profile}/>
      <ProfileAbout profile={profile}/>
     
      <div className="profile-exp bg-white p-2">
        <h2 className="text-primary">Experience</h2>
        <ProfileExperience />      
      </div>
      <div className="profile-edu bg-white p-2">
        <h2 className="text-primary">Education</h2>
        <ProfileEducation />
      </div>
     <ProfileGithub />

    </div>
  </section>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getProfileById})(Profile)