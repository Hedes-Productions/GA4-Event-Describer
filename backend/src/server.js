const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { radisClientConnect } = require("./services/redisCacheService");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;

const oauthLoginRoute = require('./routes/oauth.routes')
app.use('/oauthlogin', oauthLoginRoute)
radisClientConnect()

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});