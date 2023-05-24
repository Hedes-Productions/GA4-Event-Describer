const { google } = require("googleapis");
const {storeInCache}  = require("./redisCacheService");
const {oauth2Client} = require('../clients/oauth.client');
const { redisClient } = require("../clients/redis.client");

exports.authURLGenerator = async (scopes) => {
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

exports.storeOAuthAccessToken = async() => {
  const credentials = oauth2Client.credentials;
  if (credentials) {
    storeInCache('oauthRefreshToken',credentials.refresh_token)
  }
  storeInCache('oauthAccessToken',credentials.access_token);
};

exports.validateOAuthAccessToken = async()=>{
  const OAuthRefreshToken = await redisClient.get('oauthRefreshToken');
  if (!OAuthRefreshToken){
    res.status(400).json({error: 'Login again'})
  }
  try {
    oauth2Client.setCredentials({
      refresh_token: OAuthRefreshToken
    });
  } catch (error) {
    res.status(400).json({error: 'Token setting failed'})
  }
  
}

exports.getAnalyticsAllEvents = async () => {
  const analytics = google.analyticsdata({
    version: "v1beta",
    auth: oauth2Client,
  });

  const response = await analytics.properties.runReport({
    requestBody: {
      dateRanges: [
        {
          startDate: "365daysAgo",
          endDate: "today",
        },
      ],
      dimensions: [
        {
          name: "eventName",
        },
      ],
    },
    property: `properties/358151583`,
  });
  const eventList = []
  response.data.rows.map((dimensionValue)=>{
    eventList.push(dimensionValue.dimensionValues[0].value)
  })
  return eventList
};
