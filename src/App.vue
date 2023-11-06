<!-- App.vue -->
<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-end items-center pb-6">
    <!-- チャットコンテナ -->
    <div class="w-full max-w-md">
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <!-- メッセージ表示エリア -->
        <div class="chat-container p-3 h-96 overflow-auto">
          <transition-group name="fade" tag="div">
            <!-- メッセージを表示 -->
            <div v-for="(message, index) in messages" :key="index" class="message">
              <div v-if="message.sender === 'user'" class="user-message text-left mb-2">
                <div class="inline-block bg-gray-200 rounded py-1 px-3 text-gray-700">
                  {{ message.text }}
                </div>
              </div>
              <div v-else class="bot-message text-right mb-2">
                <div class="inline-block bg-blue-600 rounded py-1 px-3 text-white">
                  {{ message.text }}
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
      <!-- 入力エリア -->
      <div class="border-t border-gray-200">
        <div class="px-4 py-3">
          <div class="flex">
            <!-- 入力フィールド - 既存のコード -->
            <input
              type="text"
              id="userInput"
              v-model="userInput"
              @keyup.enter="sendUserMessage"
              aria-label="User Input"
              class="flex-grow border border-gray-300 rounded-l-lg p-2"
              placeholder="Say something"
            >
            <!-- 送信ボタン - 新しいコード -->
            <button
              type="button"
              @click="sendUserMessage"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getFunctions,
  httpsCallable,
} from '@firebase/functions';

export default {
  data() {
    return {
      userInput: '',
      messages: [],
    };
  },
  methods: {
    async sendUserMessage() {
      if (!this.userInput.trim()) {
      // メッセージが空または空白の場合は何もしない
        return;
      }

      const functions = getFunctions();
      const addMessage = httpsCallable(functions, 'addMessage');

      // ユーザーのメッセージを追加
      this.messages.push({
        sender: 'user',
        text: this.userInput,
      });

      // サーバーにユーザーのメッセージを送信
      try {
        const result = await addMessage({ text: this.userInput });
        const botResponse = result.data.text; // 'text'はFirebase Functionが返すオブジェクトのキーです

        // ボットの返答を追加
        this.messages.push({
          sender: 'bot',
          text: botResponse,
        });

        this.userInput = '';
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
.chat-container {
  max-height: 15rem;
  /* display: flex; この行を削除します。 */
  /* flex-direction: column; この行を削除します。 */
  gap: 0.5rem; /* このスタイルは、'display: flex;' が削除された後に機能します。 */
  overflow-y: auto; /* 追加: メッセージが多い場合にスクロールを可能にします。 */
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
.fade-enter, .fade-leave-to /* 'fade-leave-to' は 'fade-leave' から変更されました。 */ {
  opacity: 0;
}
</style>
