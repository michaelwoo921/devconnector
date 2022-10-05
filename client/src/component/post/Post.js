import React, {useEffect} from 'react'
import {connect} from 'react-redux';

import {Link, useParams} from 'react-router-dom'
import Moment from 'react-moment'
import {addComment, getPost} from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';



const Post = ({post: {post, loading}, getPost}) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id)
  }, [getPost, id])
  return (
    !loading && post &&
    <section className="container">
    <Link to="/posts" className="btn">Back To Posts</Link>
    <PostItem post={post}/>
    <CommentForm postid={post._id}/>


    <div className="comments">
      {post.comments.length>0 && post.comments.map(comment => (
        <CommentItem key={comment._id} postid={post._id} comment={comment} />
      ))}
    </div>
  </section>
  )
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, {getPost})(Post)