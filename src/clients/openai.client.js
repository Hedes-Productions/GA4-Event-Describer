const {Configuration, OpenAIApi} = require("openai");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.openAIClient = new OpenAIApi(configuration);


exports.configurationApi = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });