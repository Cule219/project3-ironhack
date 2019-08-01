import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { setCompletion } from "../../services/courseworkService";

class CompletionStatus extends Component {
  state = { completed: this.props.completionStatus };

  handleCompletion(id, status) {
    setCompletion(id, status).then(lesson => {
      this.setState({ completed: lesson.completionStatus });
      this.props.reloadCourseTree(lesson.idList);
    });
  }

  render() {
    // console.log(this.props);
    return (
      <Form>
        {!this.props.tags.map(tag => tag.name).includes("Events") &&
          !this.props.tags.map(tag => tag.name).includes("Additional info") && (
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
          )}
      </Form>
    );
  }
}

export default CompletionStatus;
