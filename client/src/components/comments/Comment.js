import React, { Component } from 'react';
import Linkify from 'react-linkify';
import { Link } from 'react-router-dom';
 

export default class Comment extends Component {
  state = {
    showComment: true,
    className: "fas fa-sort-up"
  }
  onShowClick = async (e) => {
    let className=this.state.showComment?"fas fa-sort-down":"fas fa-sort-up"
    await this.setState({
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
          {showComment&&<img src={this.props.data.user.profileImg} height='100px' alt="Users profile img" />}
        </td>
        <td colSpan="2">
          {/* change this so it's to the users profile */}
          <Link to="/"><h3>
            {this.props.data.user.username}
            {/* <i className="fas fa-arrow-circle-right"/> */}
          </h3></Link>
          <i 
            onClick={this.onShowClick}
            className={this.state.className}
            style={{cursor: 'pointer'}}
          />
          {showComment && (<><i className="fas fa-times"
          style={{cursor: 'pointer', float: 'right', color: 'red'}}
          onClick={this.onClickDelete}
          />
          <p><Linkify>{this.props.data.content}</Linkify></p></>)}
        </td>
      </>
    )
  }
}

