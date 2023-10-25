const functions = require("firebase-functions");
const axios = require("axios");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));

// OpenAIのAPIキーを環境設定から取得
const openaiApiKey = functions.config().openai.key;

exports.chatWithOpenAI = functions.https.onRequest
(async (request, response) => {
  const userMessage = request.body.message;

  try {
    const openaiResponse = await axios.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        { prompt: userMessage, max_tokens: 150 },
        {
          headers: {
            "Authorization": `Bearer ${openaiApiKey}`,
            "Content-Type": "application/json",
          },
        },
    );

    const botReply = openaiResponse.data.choices[0].text.trim();
    response.send({ message: botReply });
  } catch (error) {
    console.error("Error:", error);
    response.status(500).send({ error: "Error fetching reply from OpenAI" });
  }
});

app.post("/chatEndpoint", async (req, res) => {
  // ユーザーからのメッセージを取得
  const userMessage = req.body.message;

  try {
    // OpenAIに問い合わせる
    const openaiResponse = await axios.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        { prompt: userMessage, max_tokens: 150 },
        {
          headers: {
            "Authorization": `Bearer ${openaiApiKey}`,
            "Content-Type": "application/json",
          },
        },
    );

    const botReply = openaiResponse.data.choices[0].text.trim();
    res.send({ message: botReply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Error fetching reply from OpenAI" });
  }
});

// Firebase Functionsをエクスポート
exports.chatEndpoint = functions.https.onRequest(app);
