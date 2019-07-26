import React, { Component } from 'react';
import Linkify from 'react-linkify';


export default class Comment extends Component {
  render() {
    return (
      <div className='article-comment'>
        <img src={this.props.data.user.profileImg} height='100px' alt="Users profile img" />
        <div className='article-comment-content'>
          <h3>{this.props.data.username}</h3>
          <p><Linkify>{this.props.data.content}</Linkify></p>
        </div>
      </div>
    )
  }
}

