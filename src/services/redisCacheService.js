const {redisClient} = require('../clients/redis.client');

exports.radisClientConnect = async () => {
  redisClient.on("error", (err) => res.send(400).json({ error: err }));
  await redisClient.connect();
};

exports.storeInCache = async (key, value) => {
  await redisClient.set(key, value);
}

