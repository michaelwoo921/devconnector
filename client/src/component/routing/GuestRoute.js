import React from 'react'
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom'


const GuestRoute = ({children, auth: {isAuthenticated, loading}}) => {
    if(!loading && isAuthenticated){
        return <Navigate to='/dashboard' />
    }

    return children
}

const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps)(GuestRoute)