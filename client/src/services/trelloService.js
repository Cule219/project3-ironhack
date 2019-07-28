import axios from "axios";

const lists = () =>
  axios
    .get(
      `https://api.trello.com/1/boards/JIVynIm1/lists?key=eb627225b1977b30f088094e7b793383&token=596e22c5d280793a5bd98c6883d6e1014fe4cc18b549f4fafbdd3a5947ed07ac`
    )
    .then(response => {
      console.log(response);
      return response.data.map(list => {
        let name = list.name;
        let week = parseInt(name.split("Week ")[1]) || null;
        let day = parseInt(name[name.length - 1]) || null; //parseInt(name.split("Day ")[name.split("Day ").length - 1]) || null;
        console.log({ name, week, day, id: list.id });
        return { name, week, day, id: list.id };
      });
    })
    .catch(err => console.log(err));

<<<<<<< HEAD
=======
// closed: false
// ​​​
// id: "5cf11e44887a4b72fbd87899"
// ​​​
// idBoard: "5cf11e44887a4b72fbd8787b"
// ​​​
// name: "Week 7 - Day 1"
// ​​​
// pos: 2162687
// ​​​
// softLimit: null
// ​​​
// subscribed: false

const getBoard = () =>
  axios.get("/api/coursework/").then(response => response.data);

const getLessons = () =>
  axios.get("/api/coursework/lessons").then(response => response.data);

const getWeeks = () =>
  axios.get("/api/coursework/weeks").then(response => response.data);

const getWeek = id =>
  axios.get(`/api/coursework/weeks/${id}`).then(response => {
    console.log(response);
    return response.data;
  });

>>>>>>> f8f7266be8853df5601dc7f6919d103c84d0c7a0
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
  let category =
    name.indexOf("|") !== -1 ? name.substr(0, name.indexOf("|")).trim() : null;
  let desc = card.desc;
  let labels = card.labels.map(el => el.name);
  return getUrlsFromCard(card.id).then(urls => {
    return { name, category, desc, labels, id: card.id, attachments: urls };
  });
}

function getUrlsFromCard(cardId) {
  return axios
    .get(
      `https://api.trello.com/1/cards/${cardId}/attachments?key=eb627225b1977b30f088094e7b793383&token=596e22c5d280793a5bd98c6883d6e1014fe4cc18b549f4fafbdd3a5947ed07ac`
    )
    .then(resp => resp.data.map(el => el.url));
}

export { lists, getCards, getLessons, getBoard, getWeeks, getWeek };
