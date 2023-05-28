const redis = require("redis");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

if (process.env.DOCKER_CONTAINER === 'true') {
  host = 'host.docker.internal';
} else {
  host = 'localhost';
}
console.log(process.env.DOCKER_CONTAINER)
exports.redisClient = redis.createClient({
  socket: {
    host: host,
    port: 6379,
  },
});
