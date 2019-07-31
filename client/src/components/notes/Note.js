import React, { Component } from 'react'

export default class Note extends Component {
  state = { 
    disabled: true
  }

  onDoubleClickHandler = e => {
    if( this.props.user.role === 'TA' || this.props.user._id === this.props.data.user)
    this.setState({
      disabled: !this.state.disabled
    })
    console.log(this.props.data.content, this.props.data._id)
    if(!this.state.disabled) {  
      this.props.postNoteHandler(this.props.data.content, this.props.data._id);
    }
  }

  render() {
    let value = this.props.data?this.props.data.content:'';
    return (
      <div>
       <label>{this.props.label}</label>
       <i onClick={this.onDoubleClickHandler} className="fas fa-pencil-alt" 
       style={{float: "right"}} ></i>
       <br/>


       {/* <div 
       name={this.props.name}
       contentEditable="true"
       onChange={this.onChangeHandler}
       >{value}</div> */}


      <textarea id={this.props.name} name={this.props.name}
      rows="5" cols="50"
      value = {value}
      onChange={e=>this.props.onChangeHandler(e)}
      onDoubleClick={this.onDoubleClickHandler}
      disabled={this.state.disabled}
      />
      </div>
    )
  }
}
