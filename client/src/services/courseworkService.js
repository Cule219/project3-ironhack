import axios from "axios";

const getBoard = () =>
  axios.get("/api/coursework/").then(response => response.data);

const getLessons = () =>
  axios.get("/api/coursework/lessons").then(response => response.data);

const getDays = () =>
  axios.get("/api/coursework/days").then(response => response.data);

const getDay = id =>
  axios.get(`/api/coursework/days/${id}`).then(response => response.data);

const getWeeks = () =>
  axios.get("/api/coursework/weeks").then(response => response.data);

const getWeek = num =>
  axios.get(`/api/coursework/weeks/${num}`).then(response => response.data);

const getModules = () =>
  axios.get("/api/coursework/modules").then(response => response.data);

const getTags = () =>
  axios.get("/api/coursework/tags").then(response => response.data);

// const setCompletion = (id, status) => {
//   return axios
//     .post(`/api/coursework/lessons/${id}`, {
//       completionStatus: status
//     })
//     .then(response => response.data);
// };

const setCompletion = (id, userId, status) => {
  return axios
    .post(`/api/users/lessons/${id}/${userId}`, {
      completionStatus: status
    })
    .then(response => response.data);
};

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

const getCards = () =>
  axios
    .get(
      `https://api.trello.com/1/boards/JIVynIm1/cards?key=eb627225b1977b30f088094e7b793383&token=596e22c5d280793a5bd98c6883d6e1014fe4cc18b549f4fafbdd3a5947ed07ac`
    )
    .then(response => {
      let firstBatch = response.data
        .slice(98, 104)
        .map(card => populateCard(card));
      return Promise.all([...firstBatch]);
    });
function getUrlsFromCard(cardId) {
  return axios
    .get(
      `https://api.trello.com/1/cards/${cardId}/attachments?key=eb627225b1977b30f088094e7b793383&token=596e22c5d280793a5bd98c6883d6e1014fe4cc18b549f4fafbdd3a5947ed07ac`
    )
    .then(resp => resp.data.map(el => el.url));
}

function validURL(str) {
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

export {
  validURL,
  getCards,
  getLessons,
  getBoard,
  getDays,
  getDay,
  getWeeks,
  getWeek,
  getModules,
  setCompletion,
  getTags
};
