import React, {Fragment} from 'react'
import Moment from 'react-moment'

const Experience = ({experience}) => {
  return (
    <Fragment>
       <h2 className="my-2">Experience Credentials</h2>
    {experience && experience.length >0 && (
          <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {experience.map(exp => (
              <tr key={exp._id}>
              <td>{exp.company}</td>
              <td className="hide-sm">{exp.title}</td>
              <td className="hide-sm">
                <Moment format = "MM/DD/YYYY">{exp.from}</Moment>
                 - {exp.to ? (<Moment format = "MM/DD/YYYY">{exp.to}</Moment>) : ' Now'}
              </td>
              <td>
                <button className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
    )}
    </Fragment>
  )
}

export default Experience