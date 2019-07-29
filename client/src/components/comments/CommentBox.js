import React, { Component } from "react";
import axios from "axios";
import Comment from "./Comment";

//need get post delete

export default class CommentBox extends Component {
  state = {
    comments: []
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

  deleteComment = async e => {
    await axios.delete(`/api/comments/${e}`).then(response => {
      console.log(response);
      this.getComments();
    });
  };

  componentDidMount() {
    this.getComments();
  }

  postComment = event => {
    // event.targ
  };

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
        return (<tr key={x._id}>
          <Comment
            deleteClickHandler={this.deleteComment.bind(this, x._id)}
            data={x}
          />
        </tr>)
      })}
    </tbody>
  </table>
  </div>
</>
    );
  }
}
