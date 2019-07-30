import React, { Component } from 'react'

export default class Note extends Component {
  state = {
    content: ''
  }

  onChangeHandler = e => {
    this.setState({
      content: e.target.value
    });
  }

  onDoubleClickHandler = e => {
    e.target.setAttribute("disabled", "false")
    console.log('bla')
  }

  onClickHandler = e => {
    this.props.postNoteHandler(this.state.content);
  }
  render() {
    return (
      <div>
       <label>{this.props.label}</label><br/>
        <textarea id="story" name="story"
        rows="5" cols="33" className="block"
        value = {this.state.content}
        onChange={this.onChangeHandler}
        // onDoubleClick={this.onDoubleClickHandler}
        disabled
        />
      </div>
    )
  }
}
