import { botMessages } from '../config.js';
import chatGPTApi from '../utils/chatgptApi.js';

export async function handleStart(ctx) {
  try {
    chatGPTApi.clearConversation();
    await ctx.reply(botMessages.get('start'));
  } catch (err) {
    console.error(err);
  }
}

export async function handleInfo(ctx) {

}
