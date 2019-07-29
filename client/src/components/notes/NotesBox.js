import React, { Component } from 'react'
import axios from 'axios';
import Note from './Note';

export default class NotesBox extends Component {
  state = {
    userNote: '',
    listNote: ''
  }
  
  getNotes = () => {
    axios.get(`/api/notes/${this.props.data.match.params.id}`).then(response => {
      this.setState = {
        userNote: response.data
      }
    })
    axios.get(`/api/notes/prot/${this.props.data.match.params.id}`).then(response => {
      this.setState = {
        listNote: response.data
      }
    })
  }
  
  updateNote = e => {
    axios.post(`/api/notes`, e.content).then(
      this.getNotes()
    )
  }

  componentDidMount(){
    this.getNotes();
  };

  render() {
    return (
      <>
        <Note data={this.state.userNote} />
        {/* This needs to check for user role to allow modification */}
        <Note data={this.state.listNote} />
        {console.log(this.state)}
      </>
    )
  }
}
