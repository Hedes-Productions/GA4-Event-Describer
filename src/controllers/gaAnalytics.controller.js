const { getEventDescription } = require("../services/deppaiService");
const { getAnalyticsAllEvents } = require("../services/oauth2Service");
const { describeEvent } = require("../services/openaiService");



exports.getAllGAEvents = async (req, res, next) => {
  const gaEventList = await getAnalyticsAllEvents();
  res.status(200).json({
    gaEventList: gaEventList
  })
}

exports.getAllGAEventsDescribed = async (req, res, next) => {
  const gaEventList = await getAnalyticsAllEvents();
  console.log(gaEventList[0])
  getEventDescription(gaEventList[0])
  // res.status(200).json({
  //   gaEventList: gaEventList
  // })
}