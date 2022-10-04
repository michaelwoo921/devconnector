import React, {Fragment} from 'react'
import Moment from 'react-moment'

const Education = ({education}) => {
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      {education.length >0 &&                
        <table className="table">
            <thead>
              <tr>
                <th>School</th>
                <th className="hide-sm">Degree</th>
                <th className="hide-sm">Years</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {education.map(edu => (
                  <tr>
                  <td>{edu.school}</td>
                  <td className="hide-sm">{edu.degree}</td>
                  
                  <td className="hide-sm">
                <Moment format = "MM/DD/YYYY">{edu.from}</Moment>
                 - {edu.to ? (<Moment format = "MM/DD/YYYY">{edu.to}</Moment>) : ' Now'}
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
      }

    </Fragment>
  )
}

export default Education