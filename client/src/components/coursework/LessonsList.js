import React, { Component } from "react";
import { getDay } from "../../services/courseworkService";
import { Form } from "react-bootstrap";
import NotesBox from "../notes/NotesBox";

// this is for testing purposes only
import CommentBox from "../comments/CommentBox";
import Collapsible from "./Collapsible";

class LessonsList extends Component {
  // Should be obsolete, added back because we had conflicts
  // state = {
  //   lessons: []
  // };

  // componentDidMount() {
  //   console.log(this.props.match.params.id);
  //   let id = this.props.match.params.id;
  //   getDay(id)
  //     .then(response => {
  //       console.log("these are the day's lessons from DB: ", response);
  //       this.setState({ lessons: response.cards, name: response.name });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  render() {
    let day = this.props.location.state.day;
    return (
      <div className="list-container">
        <p>{day.name}</p>
        <ul className="list-primary">
          {day.cards.length > 0 &&
            day.cards.map(el => (
              <div key={el.id} className="list-item">
                <div className="title-status">
                  <a href={el.attachments[0]}>{el.name}</a>
                  <Form>
                    <Form.Group controlId="statusCheckbox">
                      <Form.Check className="check" type="checkbox" label="" />
                    </Form.Group>
                  </Form>
                </div>
                {el.desc && (
                  <div
                    className="lesson-description"
                    dangerouslySetInnerHTML={{
                      __html: el.desc
                        .split(/\n|\s/)
                        .map(str =>
                          this.validURL(str) ? `<a href=${str}>Link</a>` : str
                        )
                        .join(" ")
                    }}
                  />
                )}
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
        <NotesBox data={this.props} user={this.props.user} />
        <CommentBox data={this.props} user={this.props.user} />
      </div>
    );
  }
}

export default LessonsList;
