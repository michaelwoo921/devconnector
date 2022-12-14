import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom'
const PrivateRoute = ({children, auth: {isAuthenticated, loading}}) => {
    if(!loading && !isAuthenticated){
        return <Navigate to="/login" />
    }
    return children
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);