import React, { Component } from 'react'

export default class Note extends Component {
  state = {
    content: this.props.data.content
  }

  onChangeHandler = e => {
    this.setState({
      content: e.target.value
    })
  }

  onClickHandler = e => {
    this.props.postNoteHandler(this.state.content);
  }
 // <label>Make your own notes:</label><br/>
  render() {
    return (
      <>
        {console.log(this.props)}
        <textarea id="story" name="story"
        rows="5" cols="33" className="block"
        value = {this.state.content}
        onChange={this.onChangeHandler}
        />
      </>
    )
  }
}
