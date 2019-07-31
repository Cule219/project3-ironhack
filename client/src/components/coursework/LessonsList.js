import React, { Component } from "react";
import { getDay, validURL } from "../../services/courseworkService";

import CompletionStatus from "./CompletionStatus";

// this is for testing purposes only
import CommentBox from "../comments/CommentBox";
import NotesBox from "../notes/NotesBox";

class LessonsList extends Component {
  state = {
    day: {
      cards: []
    }
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    getDay(id)
      .then(response => {
        // console.log("these are the day's lessons from DB: ", response);
        this.setState({ day: response });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate(prevprops) {
    if (this.props.match.params.id !== prevprops.match.params.id) {
      let id = this.props.match.params.id;
      getDay(id)
        .then(response => {
          // console.log("these are the day's lessons from DB: ", response);
          this.setState({ day: response });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    let day = this.state.day;
    return (
      <div className="list-container">
        <p>{day.name}</p>
        <ul className="list-primary">
          {day.cards.length > 0 &&
            day.cards.map(el => (
              <div key={el.id} className="list-item">
                <div className="title-status">
                  <a href={el.attachments[0]}>{el.name}</a>
                  <CompletionStatus {...el} />
                </div>
                {el.desc && (
                  <div
                    className="lesson-description"
                    dangerouslySetInnerHTML={{
                      __html: el.desc
                        .split(/\n|\s/)
                        .map(str =>
                          validURL(str) ? `<a href=${str}>Link</a>` : str
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
        <NotesBox {...this.props}/>
        <CommentBox {...this.props}/>
      </div>
    );
  }
}

export default LessonsList;
