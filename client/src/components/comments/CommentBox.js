import React, { Component } from "react";
import axios from "axios";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { islogged } from "../../services/api";

export default class CommentBox extends Component {
  state = {
    comments: [],
    user: '',
    commentForm: false
  };

  getComments = () => {
    axios
      .get(`/api/comments/${this.props.data.match.params.id}`)
      .then(response => {
        if(response.data){
        this.setState({
          comments: response.data
        });
      }
      })
      .catch(err => {
        console.log(err);
      });
  };

  onShowComments= e => {
    
  }

  deleteComment = e => {
    axios.delete(`/api/comments/${e}`).then(response => {
      this.getComments();
    });
  };

  postComment = e => {
    axios.post(`/api/comments/`,
    {
      content: e, 
      user: this.state.user._id,
      list: this.props.data.match.params.id
    }).then(response => {
      this.getComments();
    });
  };

  async componentDidMount() {
    this.getComments();
    let user = await islogged();
    this.setState({
      user: user
    });
  }

  render() {
    return (
<>
<div className="row justify-content-between">
  <div className="col-md-6">

    <h2><i className="fas fa-users"/>Comments:
    <button className="btn btn-success" style={{float: 'right'}}>
      <a href="#comment-form"><i className="fas fa-plus"/>New </a>
    </button>
    </h2>
  </div>
  
  <div className="col-md-6">

  </div>
  <table className="table table-stripped">
    <thead className="thear-inverse">
    </thead>
    <tbody>
      {this.state.comments.map(x => {
        return (
        <tr key={x._id}>
          <Comment
          deleteClickHandler={this.deleteComment.bind(this, x._id)}
          data={x}
          />
        </tr>)
      })}
      <tr>
        <CommentForm 
        postCommentHandler={this.postComment}
        user={this.state.user} 
        id="comment-form"
        />
      </tr>
    </tbody>
  </table>
  </div>
</>
    );
  }
}
