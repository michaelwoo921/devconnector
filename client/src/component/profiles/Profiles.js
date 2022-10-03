import React, {useEffect} from 'react';

import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({getProfiles, profile: {profiles, loading}}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return ( !loading && profiles.length>0 &&
    <section className="container">
    <h1 className="large text-primary">Developers</h1>
    
    <p className="lead">
      <i className="fab fa-connectdevelop"></i> Browse and connect with developers
    </p>
   
    <div className="profiles">
     {
      profiles.map(profile => ( <ProfileItem key={profile._id} profile={profile} /> ))
     }
     
  

    </div>
  </section>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles)