import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { getCurrentProfile} from '../../actions/profile'
import Experience from './Experience'
import Education from './Education'
import DashboardActions from './DashboardActions'

const Dashboard = ({profile: {profile, loading}, getCurrentProfile}) => {

    useEffect(() => {
      getCurrentProfile()
    }, [getCurrentProfile])

    console.log(loading, profile)
    if(loading || !profile){
      return null
    }

    const { user, education, experience} = profile
  return (
    
    <section className="container">
    <h1 className="large text-primary">
      Dashboard
    </h1>
    <p className="lead"><i className="fas fa-user"></i> Welcome {user.name}</p>
    <DashboardActions />
    <Experience experience ={experience}/>
    <Education education={education}/>

    <div className="my-2">
        <button className="btn btn-danger">
            <i className="fas fa-user-minus"></i>

            Delete My Account
        </button>
      </div>
  </section>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard)