const {
  getAllGAEvents,
  getAllGAEventsAndStore,
} = require("../controllers/gaAnalytics.controller");
const { addATableNotion } = require("../controllers/notion.controller");
const {
  oauthLogin,
  oauthCallback,
  validateOAuthLogin,
} = require("../controllers/oauth2.controller");

const oauthLoginRoute = require("express").Router();

oauthLoginRoute.get("/", oauthLogin);
oauthLoginRoute.get("/oauth2callback", oauthCallback);
oauthLoginRoute.get("/getallgaevents", validateOAuthLogin, getAllGAEvents);
oauthLoginRoute.get(
  "/createATable",
  validateOAuthLogin,
  getAllGAEventsAndStore,
  addATableNotion
);

module.exports = oauthLoginRoute;
