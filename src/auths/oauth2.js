const { google } = require("googleapis");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

exports.authURLGenerator = async (scopes) => {
  const { default: open } = await import("open");
  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  open(authorizeUrl, { wait: false }).then((cp) => cp.unref());
};

exports.getToken = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
};

exports.setAccessToken = (tokens) => {
  oauth2Client.setCredentials(tokens);
};

exports.handleAccessToken = () => {
  const credentials = oauth2Client.credentials;
  if (credentials) {
    console.log(credentials.refresh_token);
  }
  console.log(credentials.access_token);
};
