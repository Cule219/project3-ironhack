import React, { Component } from "react";
import { getCards, lists /* , dayCards */ } from "../services/trelloService";

class CardsList extends Component {
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
      <div className="columns">
        <div className="column">
          <ul>
            {this.state.cards.map((el, index) => (
              <li key={index}>{el.name}</li>
            ))}
          </ul>
        </div>
        <div className="column">
          <ul>
            {this.state.lists.map((el, index) => (
              <li key={index}>{/* <Day week="1" day="1" /> */ el.name}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default CardsList;
