const redis = require('redis');
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

exports.redisClient = redis.createClient({
});