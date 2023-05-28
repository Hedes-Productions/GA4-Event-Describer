const { redisClient } = require("../clients/redis.client");

exports.radisClientConnect = async (req, res) => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.log(error);
  }
};

exports.storeInCache = async (key, value) => {
  try {
    await redisClient.set(key, value);
    console.log("Stored in cache");
  } catch (error) {
    console.log(error);
  }
};

exports.storeListInCache = async (key, list) => {
  try {
    list.map(async (item) => {
      await redisClient.rPush(key, item);
    });
    console.log("Stored list in cache");
  } catch (error) {
    console.log(error);
  }
};

exports.getListFromCache = async (key) => {
  try {
    const list = await redisClient.lRange(key, 0, -1);
    return list;
  } catch (error) {
    console.log(error);
  }
};
exports.deleteKeyFromCache = async (key) => {
  try {
    await redisClient.del(key);
    console.log("Deleted key from cache");
  } catch (error) {
    console.log(error);
  }
};
