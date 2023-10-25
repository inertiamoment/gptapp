<!--App.vue-->
<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-md w-full p-6 bg-white rounded-xl shadow-xl">
      <h1 class="text-2xl font-bold mb-5 text-gray-900">OpenAI Chatbot</h1>
      <div
        class="chat-container border
      border-gray-300 rounded-lg p-3 mb-3 h-64 overflow-y-auto">
        <transition-group name="fire" tag="div">
          <div v-for="(message, index) in messages" :key="index" class="message">
            <div v-if="message.sender === 'user'" class="user-message text-left">
              <div
                class="inline-block bg-gray-200 rounded py-1 px-3
     text-gray-700">
                {{ message.text }}
              </div>
            </div>
            <div v-else class="bot-message text-right">
              <div class="inline-block bg-blue-600 rounded py-1 px-3 text-white">
                {{ message.text }}
              </div>
            </div>
          </div>
        </transition-group>
      </div>
      <div class="flex">
        <input
          type="text"
          v-model="userInput"
          @keyup.enter="sendToOpenAI"
          aria-label="User Input"
          class="flex-grow border border-gray-300 rounded-l-lg p-2"
          placeholder="Say something"
        />
        <button
          type="button"
          @click="sendToOpenAI"
          class="bg-blue-600 text-white py-2 px-6 rounded-r-lg">
          送信
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// main.jsやVueのエントリーファイルで、axiosのデフォルト設定を追加
import axios from 'axios';

axios.defaults.baseURL = 'https://us-central1-openaichat-f4818.cloudfunctions.net'; // サーバーのベースURLを設定

// リクエストヘッダーに必要なヘッダーを追加
export default {
  data() {
    return {
      userInput: '',
      messages: [],
    };
  },
  methods: {
  // ...
    async sendToOpenAI() {
      if (!this.userInput) return;

      this.messages.push({ sender: 'user', text: this.userInput });

      try {
      // Firebase Cloud Functionのエンドポイントにリクエストを送信
        const response = await axios.post(
          'https://us-central1-openaichat-f4818.cloudfunctions.net/chatEndpoint',
          { message: this.userInput },
        );

        // 応答からメッセージを取得
        const reply = response.data.message;
        this.messages.push({ sender: 'bot', text: reply });
        this.userInput = '';
      } catch (error) {
        console.error('Error:', error);

        // エラーの詳細をログに出力
        if (error.response) {
        // サーバーからのレスポンスがある場合、ステータスコードを確認
          console.error('Response status code:', error.response.status);
          console.error('Response data:', error.response.data);
        } else if (error.request) {
        // リクエストは送信されたが、レスポンスは受信されなかった
          console.error('Request data:', error.request);
        } else {
        // その他のエラー
          console.error('Error message:', error.message);
        }

        this.messages.push({ sender: 'bot', text: 'Error getting reply.' });
      }
    },
  },

};
</script>

<style>
.chat-container {
  max-height: 15rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.message:last-child {
  margin-bottom: 0;
}

.user-message {
  align-self: flex-start;
}

.bot-message {
  align-self: flex-end;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
