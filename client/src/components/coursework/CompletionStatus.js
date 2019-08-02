import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { setCompletion } from "../../services/courseworkService";

class CompletionStatus extends Component {
  state = { completed: this.props.user&&this.props.user.completedItems.includes(this.props.id) };

  handleCompletion(id, status) {
    setCompletion(id, this.props.user._id, status).then(user => {
      this.props.setUser(user);
      this.setState({ completed: status });
      this.props.reloadCourseTree(this.props.idList);
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
