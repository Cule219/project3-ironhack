import React, { Component } from "react";
import { getWeek } from "../../services/trelloService";
// import { Form } from "react-bootstrap";

class LessonsList extends Component {
  state = {
    lessons: []
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    getWeek(id).then( response => {
      this.setState({ lessons: response.cards });
    });
  }

  render() {
    return (
      <div className="list-container">
        <p>{this.state.lessons.name}</p>
            <ul className="list-primary">
            {this.state.lessons &&
            this.state.lessons.map(element => {
              return (<li key={element._id}>{element.name}</li>)
            })
            }
            </ul>
        {/* <ul className="list-primary">
          {this.state.lessons.length > 0 &&
            this.state.lessons.map((el, index) => (
              <div key={index} className="list-item">
                <div>{el}</div>
                <a href={el.attachments[0]}>{el.name}</a>
                <div className="tags">
                  {el.labels.map(label => (
                    <span style={{ backgroundColor: `${label.color}` }}>
                      {label.name}
                    </span>
                  ))}
                  {el.technology && (
                    <span className="technology">{el.technology}</span>
                  )}
                </div>
                <Form>
                  <Form.Group controlId="statusCheckbox">
                    <Form.Check type="checkbox" label="" />
                  </Form.Group>
                </Form>
              </div>
            ))}
        </ul> */}
      </div>
    );
  }
}

export default LessonsList;
