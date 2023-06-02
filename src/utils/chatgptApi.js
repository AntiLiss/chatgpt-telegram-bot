import { ChatGPTUnofficialProxyAPI } from 'chatgpt';
import { ACCESS_TOKEN, CHATGPT_PROXY_URL } from '../config.js';

// Connect to chatgpt api
const api = new ChatGPTUnofficialProxyAPI({
  accessToken: ACCESS_TOKEN,
  apiReverseProxyUrl: CHATGPT_PROXY_URL,
});

// Allows to use ChatGPT API
class ChatGPTAPI {
  chatHistory = null;

  // TODO: Implement converstation mode setting
  // async selectMode(mode) {
  //   let res = await api.sendMessage(`You are now ${mode}`);
  //   this.chatHistory = res;
  // }

  /**
   * Returns answer from chatgpt to the message
   * @param {String} message - Input message
   * @returns {String} ChatGPT answer (text)
   */
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
      return console.error(err);
    }
  }

  clearConversation() {
    this.chatHistory = null;
  }
}

/**
 * Object to use ChatGPT API
 */
const chatGPTApi = new ChatGPTAPI();
export default chatGPTApi;
