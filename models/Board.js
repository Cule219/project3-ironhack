const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

//rather than having lists here we should q db later on
const boardSchema = Schema({
  name: String,
  id: String,
  desc: String,
  descData: String,
  closed: Boolean,
  url: String,
  shortUrl: String,
  labelNames: {
      green: String,
      yellow: String,
      orange: String,
      red: String,
      purple: String,
      blue: String,
      sky: String,
      lime: String,
      pink: String,
      black: String
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = mongoose.model('Board', boardSchema);

// {

//   "id": "5cf11e44887a4b72fbd8787b",
//   "name": "ftwd-june-berlin",
//   "desc": "",
//   "descData": null,
//   "closed": false,
//   "idOrganization": null,
//   "pinned": false,
//   "url": "https://trello.com/b/JIVynIm1/ftwd-june-berlin",
//   "shortUrl": "https://trello.com/b/JIVynIm1",
//   "prefs": {
//       "permissionLevel": "public",
//       "hideVotes": false,
//       "voting": "disabled",
//       "comments": "members",
//       "invitations": "members",
//       "selfJoin": false,
//       "cardCovers": true,
//       "isTemplate": false,
//       "cardAging": "regular",
//       "calendarFeedEnabled": false,
//       "background": "blue",
//       "backgroundImage": null,
//       "backgroundImageScaled": null,
//       "backgroundTile": false,
//       "backgroundBrightness": "dark",
//       "backgroundColor": "#0079BF",
//       "backgroundBottomColor": "#0079BF",
//       "backgroundTopColor": "#0079BF",
//       "canBePublic": true,
//       "canBeEnterprise": true,
//       "canBeOrg": true,
//       "canBePrivate": true,
//       "canInvite": true
//   },
//   "labelNames": {
//       "green": "Lesson",
//       "yellow": "Exercise",
//       "orange": "Recap",
//       "red": "Kata",
//       "purple": "Extra Content",
//       "blue": "Additional info",
//       "sky": "Career Services",
//       "lime": "Enhancement",
//       "pink": "Events",
//       "black": "Review"
//   }

// }