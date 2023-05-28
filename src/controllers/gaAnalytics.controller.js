// const { getEventDescription } = require("../services/deepaiService");
const { getAnalyticsAllEvents } = require("../services/oauth2Service");
const {
  storeInCache,
  storeListInCache,
  deleteKeyFromCache,
} = require("../services/redisCacheService");
// const { describeEvent } = require("../services/openaiService");

exports.getAllGAEvents = async (req, res, next) => {
  const gaEventList = await getAnalyticsAllEvents();
  res.status(200).json({
    gaEventList: gaEventList,
  });
};

exports.getAllGAEventsAndStore = async (req, res, next) => {
  const gaEventList = await getAnalyticsAllEvents();
  deleteKeyFromCache("gaEventList");
  storeListInCache("gaEventList", gaEventList);
  next();
};

// exports.getAllGAEventsDescribed = async (req, res, next) => {
//   const gaEventList = await getAnalyticsAllEvents();
//   console.log(gaEventList[0])
//   getEventDescription(gaEventList[0])
// }
