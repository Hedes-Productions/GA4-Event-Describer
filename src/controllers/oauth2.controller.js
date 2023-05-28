const { oauth2Client } = require("../clients/oauth.client");
const { redisClient } = require("../clients/redis.client");
const {
  authURLGenerator,
  getToken,
  setAccessToken,
  storeOAuthAccessToken,
} = require("../services/oauth2Service");

exports.oauthLogin = async (req, res, next) => {
  const scopes = ["https://www.googleapis.com/auth/analytics.readonly"];
  const authorizeUrl = await authURLGenerator(scopes);
  res.redirect(authorizeUrl);
  next();
};

exports.oauthCallback = async (req, res, next) => {
  const code = req.query.code;
  const token = await getToken(code);
  setAccessToken(token);
  storeOAuthAccessToken();
  res.send("Authentication successful! Please return to the console.");
  next();
};

exports.validateOAuthLogin = async (req, res, next) => {
  const OAuthRefreshToken = await redisClient.get("oauthRefreshToken");
  if (!OAuthRefreshToken) {
    return res.redirect("http://localhost:3000/oauthLogin");
  }
  try {
    oauth2Client.setCredentials({
      refresh_token: OAuthRefreshToken,
    });
    next();
  } catch (error) {
    res.status(400).json({ error: "Token setting failed: " + error });
  }
};
