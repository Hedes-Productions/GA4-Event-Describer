const {redisClient} = require('../clients/redis.client');

exports.radisClientConnect = async (req,res) => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.log(error)
  }
};

exports.storeInCache = async (key, value) => {
  try {
    await redisClient.set(key, value);
    console.log('Stored in cache')
  } catch (error) {
    console.log(error)
  }
  
}

