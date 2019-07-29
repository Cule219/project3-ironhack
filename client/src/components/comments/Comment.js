import React, { Component } from 'react';
import Linkify from 'react-linkify';
import { Link } from 'react-router-dom';
 

export default class Comment extends Component {
  state = {
    showComment: true,
    className: "fas fa-sort-up"
  }
  onShowClick = e => {
    let className=this.state.showComment?"fas fa-sort-down":"fas fa-sort-up"
    this.setState({
      showComment: !this.state.showComment,
      className: className
    });
  }
  onClickDelete = () => {
    this.props.deleteClickHandler();
  }
  render() {
    const { showComment } = this.state;

    return (
      <> 
        <td>
        {/* change this so it links to the users profile */}
        {/* <i className="fas fa-arrow-circle-right"/> */}
        <Link to="/"><h3>{this.props.data.user.username} </h3></Link>
        {showComment && 
        <img src={this.props.data.user.profileImg || 
          'https://scontent-vie1-1.xx.fbcdn.net/v/t1.0-9/16196015_10154888128487744_6901111466535510271_n.png?_nc_cat=103&_nc_oc=AQkzn0OPjcr3XQY7UkMt85y2o6HubSMaDYiYQSA_2xvqTwZeUzV7kCvKb0apdC5SmPE&_nc_ht=scontent-vie1-1.xx&oh=16ae35aaabc5b997ec4d338b775d98f7&oe=5DE21BE9'} 
          height='100px' alt="Users profile img" />}
        </td>
        <td colSpan="2">
          <div>
            <i onClick={this.onShowClick} className={this.state.className} style={{cursor: 'pointer'}}/>
            {showComment && <i className="fas fa-times" style={{cursor: 'pointer', float: 'right', color: 'red'}} onClick={this.onClickDelete} />}
          </div>
          {showComment && (<p><Linkify>{this.props.data.content}</Linkify></p>)}
        </td>
      </>
    )
  }
}

