const axios = require('axios');
const { arbDaoTxT } = require('./chatexample');
require('dotenv').config()
// Replace 'your_api_key_here' with your actual OpenAI API key
const apiKey = process.env.API_KEY;
const endpoint = "https://api.openai.com/v1/chat/completions";

const queryChatGPT = async (prompt) => {
    try {
        const response = await axios.post(endpoint, {
            model: "gpt-4", // or another model version like "gpt-3.5-turbo"
            messages: [{
                role: "user",
                content: prompt
            }]
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("Response:", response.data);
    } catch (error) {
        console.error("Error calling ChatGPT:", error);
    }
};

queryChatGPT(arbDaoTxT);
