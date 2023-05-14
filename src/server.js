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

const scopes = ["https://www.googleapis.com/auth/analytics.readonly"];

app.listen(PORT, () => {
  authURLGenerator(scopes);
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;
  const token = await getToken(code);
  setAccessToken(token);
  handleAccessToken();
  res.end("Authentication successful! Please return to the console.");
});
