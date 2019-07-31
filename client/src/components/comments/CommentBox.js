import React, { Component } from "react";
import axios from "axios";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

export default class CommentBox extends Component {
  state = {
    comments: [],
    commentForm: false,
    commentButton: 'New',
    classButton: "fas fa-plus"
  };

  getComments = () => {
    axios
      .get(`/api/comments/${this.props.match.params.id}`)
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

  onShowComments = e => {
    let button = this.state.commentForm? 'New':'Hide';
    let buttonClass  = this.state.commentForm? "fas fa-plus": "fas fa-minus"
    this.setState({
      commentForm: !this.state.commentForm,
      commentButton: button,
      classButton: buttonClass
    })
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
      user: this.props.user._id,
      list: this.props.match.params.id
    }).then(response => {
      this.getComments();
      this.onShowComments();
    });
  };

  componentDidMount() {
    this.getComments();
  }

  render() {

    return (
<>
<div className="row justify-content-between">
  <div className="col-md-6">

    <h2><i className="fas fa-users"/>Comments:
    <button onClick={this.onShowComments} className="btn btn-success" style={{float: 'right'}}>
     <i className={this.state.classButton}/>{this.state.commentButton}
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
          user={this.props.user}
          />
        </tr>)
      })}
      {this.state.commentForm&&<tr>
        <CommentForm 
        postCommentHandler={this.postComment}
        user={this.props.user} 
        id="comment-form"
        />
      </tr>}
    </tbody>
  </table>
  </div>
</>
    );
  }
}
