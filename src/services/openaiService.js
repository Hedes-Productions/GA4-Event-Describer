// const {openAIClient, configurationApi} = require('../clients/openai.client')


// exports.describeEvent = async (req,res,eventName) => {
//     console.log(configurationApi)
//     if (!configurationApi.apiKey) {
//       res.status(500).json({
//         error: {
//           message:
//             "OpenAI API key not configured, please follow instructions in README.md",
//         },
//       });
//       return;
//     }
  
//     try {
//       const completion = await openAIClient.createCompletion({
//         model: "text-davinci-003",
//         prompt:
//           "Describe what this google analytics event is used for" + eventName,
//         temperature: 0,
//         max_tokens: 100,
//         top_p: 1.0,
//         frequency_penalty: 0.2,
//         presence_penalty: 0.0,
//         stop: ["\n"],
//       });
//       console.log(completion.data);
//       // res.status(200).json({ result: completion.data.choices[0].text });
//     } catch (error) {
//       if (error.response) {
//         console.error(error.response.status, error.response.data);
//         res.status(error.response.status).json(error.response.data);
//       } else {
//         console.error(`Error with OpenAI API request: ${error.message}`);
//         res.status(500).json({
//           error: {
//             message: "An error occurred during your request.",
//           },
//         });
//       }
//     }
//   };
  