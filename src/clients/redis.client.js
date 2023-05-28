const redis = require("redis");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

exports.redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "host.docker.internal",
    port: 6379,
  },
});
