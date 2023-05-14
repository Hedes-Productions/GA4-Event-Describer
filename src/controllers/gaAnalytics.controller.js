const { getAnalyticsAllEvents } = require("../auths/oauth2")



exports.getAllGAEvents = async (req, res, next) => {
  await getAnalyticsAllEvents();
}