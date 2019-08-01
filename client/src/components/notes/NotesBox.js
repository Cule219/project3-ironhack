import React, { Component } from 'react'
import axios from 'axios';
import Note from './Note';

export default class NotesBox extends Component {
  state = {
    userNote: null,
    listNote: null,
  }

  getNotes = () => {
    axios.get(`/api/notes/prot/${this.props.match.params.id}`).then(response => {
      this.setState({
        listNote: response.data,
      });
    })
    axios.get(`/api/notes/${this.props.match.params.id}`).then(response => {
      this.setState({
        userNote: response.data
      });
    })
  }
  
  updateNote = (content, id) => {
    axios.put(`/api/notes`, {content: content,id: id }).then(response => {
      this.getNotes();
    });
  }

  onChangeHandler = event =>{
    console.log(event)
    let newVal = Object.assign({...this.state[event.target.name], content: event.target.value }) 
    this.setState({
      [event.target.name]: newVal
    });
  } 

  componentDidMount(){
    this.getNotes();
  };

  componentDidUpdate(prevProps){
    (prevProps.location.pathname!==this.props.location.pathname)&&
    this.getNotes();
  }

  render() {
    return (
      <>
        <Note 
          name={'userNote'}
          onChangeHandler = {this.onChangeHandler}
          user={this.props.user}
          label={'Your Notes'} 
          data={this.state.userNote}   
          postNoteHandler = { this.updateNote }
        />
        <Note 
          name={'listNote'}
          onChangeHandler = {this.onChangeHandler}
          user={this.props.user} 
          label={'Lists Notes'} 
          data={this.state.listNote}   
          postNoteHandler = { this.updateNote }
        />
      </>
    )
  }
}
