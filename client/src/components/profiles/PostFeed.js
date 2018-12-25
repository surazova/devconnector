// map through the posts that are passed in and then display a post item for each 
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './postItem'

class PostFeed extends Component {
  render() {
    const { posts } = this.props;

    return posts.map(post => < PostItem key = { post._id } post = { post }
      />);
    }
  }

  PostFeed.propTypes = {
    posts: PropTypes.array.isRequired
  }

  export default PostFeed;
