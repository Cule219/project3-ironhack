import React, { Component } from 'react';
import axios from 'axios';
import Comment from './Comment';

//need get post delete 

export default class CommentBox extends Component {
  state = {
    comments: []
  }

  getComments = () => {
    axios.get('/api/comments/').then(response => {
      this.setState({
        comments: response.data
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.getComments();
  }

  postComment = event => {
    // event.targ
  }

  render() {
    return (
      <div>
        {this.state.comments.map(x => {
          return <Comment key={x._id} data={x}/>
        })}
      </div>
    )
  }
}

