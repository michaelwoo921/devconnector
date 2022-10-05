import React from 'react'
import {connect} from 'react-redux';

import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {deletePost, addLikes, removeLikes} from '../../actions/post';

const PostItem = ({post, deletePost, addLikes, removeLikes}) => {
  return (
    <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${post.user}`}>
        <img
          className="round-img"
          src={post.avatar}
          alt=""
        />
        <h4>{post.name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">
        {post.text}
      </p>
       <p className="post-date">
          Posted on <Moment format="MM/DD/YYYY">{post.date}</Moment>
      </p>
      <button type="button" className="btn btn-light"
        onClick = {() => addLikes(post._id)}
      >
        <i className="fas fa-thumbs-up"></i>
        <span>{post.likes.length}</span>
      </button>
      <button type="button" className="btn btn-light"
         onClick = {() => removeLikes(post._id)}
      >
        <i className="fas fa-thumbs-down"></i>
      </button>
      <Link to={`/post/${post._id}`} className="btn btn-primary">
        Discussion <span className='comment-count'>{post.comments.length}</span>
      </Link>
      <button      
      type="button"
      className="btn btn-danger"
        onClick = {() => deletePost(post._id)}
    >
      <i className="fas fa-times"></i>
    </button>
    </div>
  </div>
  )
}


export default connect(null, {deletePost, addLikes, removeLikes})(PostItem)