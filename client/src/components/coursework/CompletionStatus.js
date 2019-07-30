import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { setCompletion } from "../../services/courseworkService";

class CompletionStatus extends Component {
  state = { completed: this.props.completionStatus };

  handleCompletion(id, status) {
    // console.log("in completion handler: ", id, status);
    setCompletion(id, status).then(lesson => {
      this.setState({ completed: lesson.completionStatus });
    });
  }

  render() {
    // console.log(this.props);
    return (
      <Form>
        <Form.Group controlId="statusCheckbox">
          <Form.Check
            className="check"
            type="checkbox"
            label=""
            checked={this.state.completed}
            onChange={() =>
              this.handleCompletion(this.props.id, !this.state.completed)
            }
          />
        </Form.Group>
      </Form>
    );
  }
}

export default CompletionStatus;
