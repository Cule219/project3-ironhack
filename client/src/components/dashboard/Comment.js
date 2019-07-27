import React, { Component } from 'react';
import Linkify from 'react-linkify';


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
      <div className='article-comment'>
        <img src={this.props.data.user.profileImg} height='100px' alt="Users profile img" />
        <div className='article-comment-content'>
          <h3>{this.props.data.username}
          <i 
            onClick={this.onShowClick}
            className={this.state.className}
            style={{cursor: 'pointer'}}
          />
          <i className="fas fa-times"
          style={{cursor: 'pointer', float: 'right', color: 'red'}}
          onClick={this.onClickDelete}
          />
          </h3>
          {showComment &&
          (<p><Linkify>{this.props.data.content}</Linkify></p>)}
        </div>
      </div>
    )
  }
}

