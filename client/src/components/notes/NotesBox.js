import React, { Component } from 'react'
import axios from 'axios';
import Note from './Note';
import { islogged } from "../../services/api";

export default class NotesBox extends Component {
  state = {
    user: null,
    userNote: null,
    listNote: null
  }

  getNotes = () => {
    axios.get(`/api/notes/prot/${this.props.data.match.params.id}`).then(response => {
      this.setState({
        listNote: response.data
      });
    })
    axios.get(`/api/notes/${this.props.data.match.params.id}`).then(response => {
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

  componentDidMount(){
    let user = islogged();
    this.setState({
      user: user
    });
    this.getNotes();
  };
  
  componentDidUpdate(prevProps){
    console.log(prevProps.data.location.pathname, this.props.data.location.pathname);
    if(prevProps.data.location.pathname !==this.props.data.location.pathname) {
        this.setState({})
      }
  }

  render() {
    return (
      <>
        <Note user={this.state.user} label={'Your Notes'} data={this.state.userNote} 
        postNoteHandler = { this.updateNote }
        />
        {/* This needs to check for user role to allow modification */}
        <Note user={this.state.user} label={'Lists Notes'} data={this.state.listNote} 
        postNoteHandler = { this.updateNote }
        />
      </>
    )
  }
}
