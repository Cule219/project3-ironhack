import React, { Component } from 'react'

export default class Note extends Component {
  state = { 
    disabled: false
  }

  // onDoubleClickHandler = e => {
  //   if( this.props.user.role === 'TA' || this.props.user._id === this.props.data.user)
  //   this.setState({
  //     disabled: !this.state.disabled
  //   })
  //   if(!this.state.disabled) {  
  //     this.props.postNoteHandler(this.props.data.content, this.props.data._id);
  //   }
  // }

  onDoubleClickHandler = e => {

    if(this.props.data &&(
      (this.props.user.role === 'TA' || this.props.user.role === 'teacher') || 
      this.props.user._id === this.props.data.user))
    this.setState({
      disabled: !this.state.disabled
    })
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


       <div 
       name={this.props.name}
       contentEditable={this.state.disabled}
       onChange={e=>this.props.onChangeHandler(e)}
       onDoubleClick={this.onDoubleClickHandler}
       suppressContentEditableWarning={true}
       style={{width: '100%', height: '10vh'}}
       >{value}</div>


      {/* <textarea id={this.props.name} name={this.props.name}
      rows="5" cols="50"
      value = {value}
      onChange={e=>this.props.onChangeHandler(e)}
      onDoubleClick={this.onDoubleClickHandler}
      disabled={this.state.disabled}
      /> */}
      </div>
    )
  }
}
