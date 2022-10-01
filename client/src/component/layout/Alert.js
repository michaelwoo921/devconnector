import React from 'react'
import {connect} from 'react-redux'

const Alert = ({alerts}) => {

  return ( 
    alerts && alerts.length >0 &&
    <section className="container" style={{marginBottom: -80}}>
        {
            alerts.map(alert => {
                const {id, alertType, msg} = alert;
                return (
                    <div key={id} className= {`alert alert-${alertType}`} >
                        {msg}
                    </div>
                )
            })
        }
    </section>
  )
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)