import React from 'react'

const Alert = () => {
    const alerts = [
        {id:1, msg: 'Invalid credentials', alertType: 'danger'},
        {id:2, msg: 'Successfully logged in', alertType: 'success'}
    ]

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

export default Alert