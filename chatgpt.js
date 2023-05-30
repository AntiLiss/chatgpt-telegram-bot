// main class that realizes connecting to chatgpt api by access token

import { ChatGPTUnofficialProxyAPI } from 'chatgpt';
import dotenv from 'dotenv';

dotenv.config({ path: 'config.env' });

const { ACCESS_TOKEN, CHATGPT_PROXY_URL } = process.env;

// connecting to chatgpt api
const api = new ChatGPTUnofficialProxyAPI({
  accessToken: ACCESS_TOKEN,
  apiReverseProxyUrl: CHATGPT_PROXY_URL,
});

export default class ChatGPTBot {
  chatHistory = null;

  // TODO: implement converstation mode setting
  // async selectMode(mode) {
  //   let res = await api.sendMessage(`You are now ${mode}`);
  //   this.chatHistory = res;
  // }

  async chat(message) {
    // continue the conversation in context if it exists
    if (this.chatHistory) {
      let res = await api.sendMessage(message, {
        conversationId: this.chatHistory.conversationId,
        parentMessageId: this.chatHistory.parentMessageId,
        // onProgress: (partialResponse) => console.log(partialResponse.text),
      });
      this.chatHistory = res;
      return res.text;
    }

    let res = await api.sendMessage(message);
    this.chatHistory = res;
    return res.text;
  }

  clearConversation() {
    this.chatHistory = null;
  }
}
