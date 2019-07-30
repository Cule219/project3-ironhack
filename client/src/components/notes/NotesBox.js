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

  getNotes = async () => {
    await axios.get(`/api/notes/prot/${this.props.data.match.params.id}`).then(response => {
      this.setState({
        listNote: response.data
      });
    })
    await axios.get(`/api/notes/${this.props.data.match.params.id}`).then(response => {
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

  async componentDidMount(){
    let user = await islogged();
    this.setState({
      user: user
    });

    this.getNotes();
  };
  componentDidUpdate(prevProps){
    if(prevProps.data.location.pathname!==this.props.data.location.pathname) {
        this.getNotes()
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
