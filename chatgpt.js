import { ChatGPTUnofficialProxyAPI } from 'chatgpt';
import dotenv from 'dotenv';

dotenv.config({ path: 'config.env' });

const { ACCESS_TOKEN, CHATGPT_PROXY_URL } = process.env;

// connect to chatgpt api
const api = new ChatGPTUnofficialProxyAPI({
  accessToken: ACCESS_TOKEN,
  apiReverseProxyUrl: CHATGPT_PROXY_URL,
});

// class to use chatgpt api
export default class ChatGPTBot {
  chatHistory = null;

  // TODO: implement converstation mode setting
  // async selectMode(mode) {
  //   let res = await api.sendMessage(`You are now ${mode}`);
  //   this.chatHistory = res;
  // }

  async chat(message) {
    try {
      // continue the conversation if it exists
      if (this.chatHistory) {
        let res = await api.sendMessage(message, {
          conversationId: this.chatHistory.conversationId,
          parentMessageId: this.chatHistory.parentMessageId,
          // onProgress: (partialResponse) => console.log(partialResponse.text),
        });
        this.chatHistory = res;
        return String(res.text);
      }

      let res = await api.sendMessage(message);
      this.chatHistory = res;
      return String(res.text);
    } catch (err) {
      console.error(err);
    }
  }

  clearConversation() {
    this.chatHistory = null;
  }
}

