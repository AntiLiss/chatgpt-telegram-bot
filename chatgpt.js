import { ChatGPTUnofficialProxyAPI } from 'chatgpt';
import dotenv from 'dotenv';

dotenv.config({ path: 'config.env' });

const { ACCESS_TOKEN, CHATGPT_PROXY_URL } = process.env;

// Connect to chatgpt api
const api = new ChatGPTUnofficialProxyAPI({
  accessToken: ACCESS_TOKEN,
  apiReverseProxyUrl: CHATGPT_PROXY_URL,
});

// Class to use chatgpt api
export default class ChatGPTAPI {
  chatHistory = null;

  // TODO: Implement converstation mode setting
  // async selectMode(mode) {
  //   let res = await api.sendMessage(`You are now ${mode}`);
  //   this.chatHistory = res;
  // }

  async chat(message) {
    try {
      // Continue the conversation if it exists
      if (this.chatHistory) {
        const res = await api.sendMessage(message, {
          conversationId: this.chatHistory.conversationId,
          parentMessageId: this.chatHistory.parentMessageId,
          // onProgress: (partialResponse) => console.log(partialResponse.text),
        });
        this.chatHistory = res;
        return String(res.text);
      }

      const res = await api.sendMessage(message);
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

