const { authURLGenerator, getToken, setAccessToken, handleAccessToken } = require("../auths/oauth2");

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
  handleAccessToken();
  res.send("Authentication successful! Please return to the console.")
  next()
};
