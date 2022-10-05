import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';

const CommentItem = ({auth, postid, comment: {_id, user, text, name, avatar, date}, deleteComment}) => {
  return (
    <div className="post bg-white p-1 my-1">
    <div>
      <a href="profile.html">
        <img
          className="round-img"
          src={avatar}
          alt=""
        />
        <h4>{name}</h4>
      </a>
    </div>
    <div>
      <p className="my-1">
      {text}
      </p>
       <p className="post-date">
          Posted on <Moment format="MM/DD/YYYY">{date}</Moment>
      </p>
      {!auth.loading && user === auth.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteComment(postid, _id)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
    </div>
  </div>
  )
}

const mapStateToProps =state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteComment})(CommentItem)