const { getAnalyticsAllEvents } = require("../services/oauth2Service");
const {
  storeListInCache,
  deleteKeyFromCache,
} = require("../services/redisCacheService");

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
