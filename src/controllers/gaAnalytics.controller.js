const { getAnalyticsAllEvents } = require("../services/oauth2Service")



exports.getAllGAEvents = async (req, res, next) => {
  const gaEventList = await getAnalyticsAllEvents();
  res.status(200).json({
    gaEventList: gaEventList
  })
}