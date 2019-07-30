import React, { Component } from 'react'

export default class Note extends Component {
  state = {
    content:  '',
    data: this.props.data,
    user: this.props.user, 
    disabled: true
  }

  onChangeHandler = e => {
    this.setState({
      content: e.target.value
    });
  }

  onDoubleClickHandler = e => {
    if( this.props.user.role === 'TA' || this.props.user._id === this.props.data.user)
    this.setState({
      disabled: !this.state.disabled
    })
    if(!this.state.disabled) {
      this.onClickHandler(e);
    }
  }

  onClickHandler = e => {
    this.props.postNoteHandler(this.state.content, this.props.data._id);
  }

  componentDidMount(){
    let value =''
    if(this.props.data) {
      value = this.props.data.content
    }
    this.setState({
      data: this.props.data,
      content: value
    })
  }
  render() {
    return (
      <div>
       <label>{this.props.label}</label>
       <i onClick={this.onDoubleClickHandler} className="fas fa-pencil-alt" style={{
         float: "right"
       }} ></i>
       <br/>
      <textarea id="story" name="story"
      rows="5" cols="50" className="block"
      value = {this.state.content}
      onChange={this.onChangeHandler}
      onDoubleClick={this.onDoubleClickHandler}
      disabled={this.state.disabled}
      />
      </div>
    )
  }
}
