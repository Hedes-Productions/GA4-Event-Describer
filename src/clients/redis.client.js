const {createClient} = require("redis");

exports.redisClient = createClient();