const { authURLGenerator, getToken, setAccessToken, storeOAuthAccessToken, validateOAuthAccessToken } = require("../services/oauth2Service");

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
  res.send("Authentication successful! Please return to the console.")
  next()
};

exports.validateOAuthLogin = async(req,res,next)=>{
  await validateOAuthAccessToken()
  next()
}