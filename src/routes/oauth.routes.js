const {
  getAllGAEvents,
  getAllGAEventsDescribed,
  getAllGAEventsAndStore,
} = require("../controllers/gaAnalytics.controller");
const {
  checkNotion,
  createAPageNotion,
  addATableNotion,
} = require("../controllers/notion.controller");
const {
  oauthLogin,
  oauthCallback,
  validateOAuthLogin,
} = require("../controllers/oauth2.controller");

const oauthLoginRoute = require("express").Router();

oauthLoginRoute.get("/", oauthLogin);
oauthLoginRoute.get("/oauth2callback", oauthCallback);
oauthLoginRoute.get("/getallgaevents", validateOAuthLogin, getAllGAEvents);
oauthLoginRoute.get("/notion", validateOAuthLogin, checkNotion);
oauthLoginRoute.get("/createPage", validateOAuthLogin, createAPageNotion);
oauthLoginRoute.get(
  "/createATable",
  validateOAuthLogin,
  getAllGAEventsAndStore,
  addATableNotion
);
// oauthLoginRoute.get('/getalleventsdescribed', validateOAuthLogin, getAllGAEventsDescribed)

module.exports = oauthLoginRoute;
