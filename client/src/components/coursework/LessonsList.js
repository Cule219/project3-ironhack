import React, { Component } from "react";
import { getWeek } from "../../services/trelloService";
import { Form } from "react-bootstrap";

class LessonsList extends Component {
  constructor(props) {
    super(props);
    this.state = { lessons: [] };
  }

  componentDidMount() {
    // console.log(this.props);
    let id = this.props.match.params.id;

    getWeek(id).then(response => {
      console.log(response); 
      this.setState({ lessons: response });
    });
    
  }

  render() {
    return (
      <div className="list-container">
        <ul className="list-primary">
          {this.state.lessons.length > 0 &&
            this.state.lessons.map((el, index) => (
              <div key={index} className="list-item">
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
        </ul>
      </div>
    );
  }
}

export default LessonsList;
