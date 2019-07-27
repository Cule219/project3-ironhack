import axios from "axios";

const technologies = [
  "REACT",
  "EXPRESS",
  "JS",
  "CSS",
  "HTML",
  "MONGODB",
  "NODE"
];

const lists = () =>
  axios
    .get(
      `https://api.trello.com/1/boards/JIVynIm1/lists?key=eb627225b1977b30f088094e7b793383&token=596e22c5d280793a5bd98c6883d6e1014fe4cc18b549f4fafbdd3a5947ed07ac`
    )
    .then(response => {
      return response.data.map(list => {
        let name = list.name;
        let week = parseInt(name.split("Week ")[1]) || null;
        let day =
          parseInt(name.split("Day ")[name.split("Day ").length - 1]) || null;
        return { name, week, day, id: list.id };
      });
    })
    .catch(err => console.log(err));

const getCards = () =>
  axios
    .get(
      `https://api.trello.com/1/boards/JIVynIm1/cards?key=eb627225b1977b30f088094e7b793383&token=596e22c5d280793a5bd98c6883d6e1014fe4cc18b549f4fafbdd3a5947ed07ac`
    )
    .then(response => {
      let firstBatch = response.data
        .slice(0, 98)
        .map(card => populateCard(card));
      return Promise.all([...firstBatch]);
    });

function populateCard(card) {
  let name = card.name;
  let labels = card.labels.map(el => ({ name: el.name, color: el.color }));
  let category =
    name.indexOf("|") !== -1 ? name.substr(0, name.indexOf("|")).trim() : null;
  let tech = null;
  if (category) {
    if (technologies.indexOf(category.toUpperCase()) !== -1) {
      tech = category;
    } else {
      labels.push({ name: category, color: "#874bc4" });
    }
  }
  let desc = card.desc;

  return getUrlsFromCard(card.id).then(urls => {
    return {
      name,
      desc,
      labels,
      id: card.id,
      attachments: urls,
      technology: tech
    };
  });
}

function getUrlsFromCard(cardId) {
  return axios
    .get(
      `https://api.trello.com/1/cards/${cardId}/attachments?key=eb627225b1977b30f088094e7b793383&token=596e22c5d280793a5bd98c6883d6e1014fe4cc18b549f4fafbdd3a5947ed07ac`
    )
    .then(resp => resp.data.map(el => el.url));
}

// function getCategoriesFromCards() {
//   getCards().then(cards => {
//     let categories = cards
//       .map(el => el.name)
//       .filter(el => el.indexOf("|") !== -1)
//       .map(el => el.substr(0, el.indexOf("|")).trim());
//     console.log(categories);
//   });
// }

export { lists, getCards };
