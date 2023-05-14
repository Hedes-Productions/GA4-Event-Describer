const { google } = require("googleapis");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

exports.authURLGenerator = async (scopes) => {
  const apis = google.getSupportedAPIs();
  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  return authorizeUrl;
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
    // console.log(credentials.refresh_token);
  }
  // console.log(credentials.access_token);
};

exports.getAnalyticsAllEvents = async() => {
  const analytics = google.analyticsdata({
    version: 'v1beta',
    auth: oauth2Client,
  });

  const response = await analytics.properties.runReport({
    requestBody: {
      "dimensions": [{ "name": "eventName" }],
      // "metrics": [{ "name": "eventCount" }],
      "dateRanges": [{ "startDate": "365daysAgo", "endDate": "today" }]
    },
    "property": `properties/358151583`
  });
  response.data.rows[0].dimensionValues.map((dimensionValue)=>{
    console.log(dimensionValue)
  })
};