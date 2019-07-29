import React, { Component } from "react";
import axios from "axios";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { islogged } from "../../services/api";
import { withRouter } from "react-router-dom";

//need get post delete

export default class CommentBox extends Component {
  state = {
    comments: [],
    user: null
  };

  getComments = () => {
    axios
      .get("/api/comments/")
      .then(response => {
        this.setState({
          comments: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

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
      list: null
    }).then(response => {
    });
    console.log(this.props.history)
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
<div className="row">
  <div className="col-md-6">
    <h2><i className="fas fa-users"/>Comments:</h2>
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
        />
      </tr>
    </tbody>
  </table>
  </div>
</>
    );
  }
}
