import React, {useEffect} from 'react'
import {connect} from 'react-redux';

import {getPosts} from '../../actions/post';

import PostForm from './PostForm';
import PostItem from './PostItem'

const Posts = ({getPosts, post: {posts, loading}}) => {

  useEffect(() => {
    getPosts()
  }, [getPosts])

  return ( !loading && 
    <section className="container">
    <h1 className="large text-primary">
      Posts
    </h1>
    <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
        <PostForm />
    </div>


    <div className="posts">
      {posts.map(post => (
             <PostItem key={post._id} post={post}/>
      ))}

    </div>
  </section>
  )
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, {getPosts})(Posts)