import React, { Component } from "react";
import { getCards, lists /* , dayCards */ } from "../../services/trelloService";
import { Form } from "react-bootstrap";

class LessonsList extends Component {
  constructor(props) {
    super(props);
    this.state = { cards: [], lists: [] };
  }

  componentDidMount() {
    getCards()
      .then(response => {
        this.setState({ cards: response });
        lists().then(response => {
          console.log(response);
          this.setState({ lists: response });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="list-container">
        <ul className="list-primary">
          {this.state.cards.map((el, index) => (
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
