import React, { Component } from "react";
import { getDay, getCards } from "../../services/courseworkService";
import { Form } from "react-bootstrap";

// this is for testing purposes only
import CommentBox from "../comments/CommentBox";

class LessonsList extends Component {
  state = {
    lessons: [],
    templessons: []
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    getDay(id)
      .then(response => {
        // console.log("these are the day's lessons from DB: ", response);
        this.setState({ lessons: response.cards, name: response.name });
      })
      .catch(err => {
        console.log(err);
      });
    getCards().then(response => {
      this.setState({ templessons: response });
    });

  }

  render() {
    return (
      <div className="list-container">
        <p>{this.state.name}</p>
        <ul className="list-primary">
          {this.state.lessons.length > 0 &&
            this.state.lessons.map(el => (
              <div key={el.id} className="list-item">
                <div className="title-status">
                  <a href={el.url}>{el.name}</a>
                  {/* // need to fix later, should be el.attachments[0] */}
                  <Form>
                    <Form.Group controlId="statusCheckbox">
                      <Form.Check className="check" type="checkbox" label="" />
                    </Form.Group>
                  </Form>
                </div>
                <div className="tags">
                  {el.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{ backgroundColor: `${tag.color}` }}
                    >
                      {tag.name}
                    </span>
                  ))}
                  {el.tech.map((e, i) => (
                    <span key={i} className="technology">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </ul>
        {/* this is for testing purposes only */}
        <CommentBox data={this.props} user={this.props.user}/>
      </div>
    );
  }
}

export default LessonsList;
