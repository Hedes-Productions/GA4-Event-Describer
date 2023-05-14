const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  authURLGenerator,
  getToken,
  handleAccessToken,
  setAccessToken,
} = require("./auths/oauth2");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;

const oauthLoginRoute = require('./routes/oauth.routes')
app.use('/oauthlogin', oauthLoginRoute)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});