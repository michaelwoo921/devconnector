import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {connect} from 'react-redux'
import { addExperience } from '../../actions/profile'

const AddExperience = ({addExperience}) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    description: '',
    from: '',
    to: '',
    current: false
  })
  const [toDateDisabled, togggleDisabled] = useState()

  const {title, company,  location, description, current, from, to}  = setFormData
  const onChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }
  const onSubmit = e => {
    e.preventDefault()
   
    addExperience(formData, navigate)
  }
  return (
    <section className="container">
    <h1 className="large text-primary">
     Add An Experience
    </h1>
    <p className="lead">
      <i className="fas fa-code-branch"></i> Add any developer/programming
      positions that you have had in the past
    </p>
    <small>* = required field</small>
    <form className="form" onSubmit ={onSubmit}>
      <div className="form-group">
        <input type="text" placeholder="* Job Title" name="title" required
        value ={title}
        onChange ={onChange}
        />
      </div>
      <div className="form-group">
        <input type="text" placeholder="* Company" name="company" required
         value ={company}
         onChange ={onChange}
        />
      </div>
      <div className="form-group">
        <input type="text" placeholder="Location" name="location" 
         value ={location}
         onChange ={onChange}
        />
      </div>
      <div className="form-group">
        <h4>From Date</h4>
        <input type="date" name="from"
           value ={from}
           onChange ={onChange}
        />
      </div>
       <div className="form-group">
        <p><input type="checkbox" name="current" value={current}
        checked ={current}
        onChange = {
          () => {
            setFormData({
              ...formData, current: !current
            });
            togggleDisabled(!toDateDisabled)
          }
        }
        
        /> Current Job</p>
      </div>
      <div className="form-group">
        <h4>To Date</h4>
        <input type="date" name="to"
         value ={to}
         onChange ={onChange}
         disabled ={toDateDisabled}
        />
      </div>
      <div className="form-group">
        <textarea
          name="description"
          cols="30"
          rows="5"
          placeholder="Job Description"
          value ={description}
          onChange ={onChange}

        ></textarea>
      </div>
      <input type="submit" className="btn btn-primary my-1" />
      <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
    </form>
  </section>
  )
}

export default connect(null, {addExperience})(AddExperience)