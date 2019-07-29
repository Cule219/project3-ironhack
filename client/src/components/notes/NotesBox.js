import React, { Component } from 'react'
import axios from 'axios';
import Note from './Note';

export default class NotesBox extends Component {
  state = {
    user: null,
    userNote: '',
    listNote: ''
  }
  getNotes = () => {
    this.getUsersNote();
    this.getListNote();
  }

  getUsersNote = () => {
    axios.get(`/api/notes/${this.props.data.match.params.id}`).then(response => {
      console.log(response.data)
      this.setState = {
        userNote: response.data
      }
    })
  }

  getListNote = () => {
    axios.get(`/api/notes/prot/${this.props.data.match.params.id}`).then(response => {
      return response.data
    })
  }
  
  updateNote = e => {
    axios.post(`/api/notes`, e.content).then(
      this.getNotes()
    )
  }

  async componentDidMount(){
    this.getUsersNote();
    let getList = await this.getListNote();
    this.setState({
      listNote: getList
    });
  }

  render() {
    return (
      <>
        <Note data={this.state.userNote} />
        {/* This needs to check for user role to allow modification */}
        <Note data={this.state.listNote} />
      </>
    )
  }
}
