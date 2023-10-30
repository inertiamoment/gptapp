// index.js
const functions = require("firebase-functions");
const openai = require("openai");
const cors = require('cors');
const corsHandler = cors({ origin: true });

exports.addMessage = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => { // CORSミドルウェアを適用
    try {
      // リクエストからテキストを取得（POSTメソッドを想定）
      if (request.method !== "POST") {
        throw new Error("Only POST requests are accepted");
      }

      const { text } = request.body;

      if (!text) {
        // テキストがリクエストに含まれていない場合はエラーを返す
        throw new Error("Text parameter is missing");
      }

      const key = functions.config().openai.apikey;
      const organization = functions.config().openai.organizationid;
      const configuration = new openai.Configuration({
        organization,
        apiKey: key,
      });
      const ai = new openai.OpenAIApi(configuration);

      // AIにチャットメッセージを送信してレスポンスを待つ
      const completion = await ai.createChatCompletion({
        model: "gpt-3.5-turbo", // ここで使用するモデルを変更することができます
        messages: [
          {
            role: "user",
            content: text,
          },
        ],
      });

      console.log(completion.data.choices[0].message.content);

      // 成功した場合はレスポンスとしてメッセージの内容を送り返す
      response.status(200).send({
        text: completion.data.choices[0].message.content,
      });
    } catch (e) {
      console.error("Error");
      response.status(500).send({ error: "An error." });
    }
  });
});
