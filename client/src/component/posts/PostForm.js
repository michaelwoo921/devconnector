import React, {useState} from 'react'
import {connect} from 'react-redux'
import { addPost} from '../../actions/post'

const PostForm = ({addPost}) => {

    const [text, setText] =useState('')
    const onSubmit = (e) => {
        e.preventDefault();
        addPost({text});
        setText('')
    }
  return (
    <form className="form my-1" onSubmit= {onSubmit}>
    <textarea
      name="text"
      cols="30"
      rows="5"
      placeholder="Create a post"
      required
      value={text}
      onChange= {(e) => setText(e.target.value)}
    ></textarea>
    <input type="submit" className="btn btn-dark my-1" value="Submit" />
  </form>
  )
}

export default connect(null, {addPost})(PostForm)