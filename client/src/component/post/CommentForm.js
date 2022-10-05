import React, {Fragment, useState} from 'react'
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({postid, addComment}) => {
    const [text, setText] = useState('')
    
  return (
    <Fragment>   
    <div className="post-form">
    <div className="bg-primary p">
      <h3>Leave A Comment: </h3>
    </div>
    <form className="form my-1"
        onSubmit={(e) => {
            e.preventDefault();
              addComment(postid, { text });
            setText('');
          }}
    >
      <textarea
        name="text"
        cols="30"
        rows="5"
        placeholder="Comment on this post"
        required
          value={text}
          onChange ={e => setText(e.target.value)}

      ></textarea>
      <input type="submit" className="btn btn-dark my-1" value="Submit" />
    </form>
  </div>
    </Fragment>
   
  )
}

export default connect(null, {addComment})(CommentForm)