import React, { Component } from 'react';
import CommentBox from '../components/dashboard/CommentBox'

export default class Dashboard extends Component {
  state = {
    size: '100%'
  }
  render() {
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <div style={{height: '40vh', width: '50%', backgroundColor: '#FF0'}}><CommentBox /></div>
        <div style={{height: '40vh', width: '50%', backgroundColor: '#F00'}}></div>
        <div style={{height: '40vh', width: '50%', backgroundColor: '#CC0'}}></div>
        <div style={{height: '40vh', width: '50%', backgroundColor: '#2C2'}}></div>
      </div>
    )
  }
}
