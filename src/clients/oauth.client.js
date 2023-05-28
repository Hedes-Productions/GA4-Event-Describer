const { google } = require("googleapis");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

exports.oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
