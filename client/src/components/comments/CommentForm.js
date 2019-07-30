import React, { Component } from 'react'


export default class CommentForm extends Component {
  state = {
    comment: ''
  }
  onChangeHandler = e => {
    this.setState({
      comment: e.target.value
    })
  }
  onKeyComment = async e => {
    if (e.key === 'Enter') {
      this.props.postCommentHandler(this.state.comment);
    }
  }
  
  render() {
    return (
      <>
        <td>
        {this.props.user && <h3>{this.props.user.username}</h3>}
        {this.props.user && <img src={this.props.user.profileImg || 
          'https://scontent-vie1-1.xx.fbcdn.net/v/t1.0-9/16196015_10154888128487744_6901111466535510271_n.png?_nc_cat=103&_nc_oc=AQkzn0OPjcr3XQY7UkMt85y2o6HubSMaDYiYQSA_2xvqTwZeUzV7kCvKb0apdC5SmPE&_nc_ht=scontent-vie1-1.xx&oh=16ae35aaabc5b997ec4d338b775d98f7&oe=5DE21BE9'} 
          height='100px' alt="Users profile img" />}
        </td>
        <td colSpan="2">
          <br/>
          <textarea id="story" name="story"
          rows="5" cols="33" value={this.state.comment} onKeyDown={this.onKeyComment} onChange={this.onChangeHandler}/>
        </td>
      </>
    )
  }
}
