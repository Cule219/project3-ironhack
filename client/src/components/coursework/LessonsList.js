import React, { Component } from "react";
import { getDay } from "../../services/courseworkService";
import CompletionStatus from "./CompletionStatus";

// this is for testing purposes only
import CommentBox from "../comments/CommentBox";
import NotesBox from "../notes/NotesBox";

class LessonsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: {
        cards: []
      }
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    getDay(id)
      .then(response => {
        // console.log("these are the day's lessons from DB: ", response);
        this.setState({ day: response });
        this.props.reloadCourseTree(id);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      let id = this.props.match.params.id;
      getDay(id)
        .then(response => {
          console.log(
            "Here in an update! these are the day's lessons from DB: ",
            response
          );
          this.setState({ day: response });
          this.props.reloadCourseTree(id);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    // console.log("here in the render", this.state.day);
    return (
      <div className="list-container">
        <p>{this.state.day.name}</p>
        <ul className="list-primary">
          {this.state.day.cards &&
            this.state.day.cards.length > 0 &&
            this.state.day.cards.map(el => (
              <div key={el.id} className="list-item">
                <div className="title-status">
                  <a href={el.attachments[0]}>{el.name}</a>
                  <CompletionStatus
                    {...el}
                    reloadCourseTree={this.props.reloadCourseTree}
                  />
                </div>
                {el.desc && (
                  <div
                    className="lesson-description"
                    dangerouslySetInnerHTML={{
                      __html: el.desc
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
        <NotesBox {...this.props} />
        <CommentBox {...this.props} />
      </div>
    );
  }
}

export default LessonsList;
