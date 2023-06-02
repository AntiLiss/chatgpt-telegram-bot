import { botMessages } from '../config.js';
import chatGPTApi from '../utils/chatgptApi.js';
import { setTyping, preventBackgroundMessages } from '../utils/decorators.js';

// Text handler
export async function handleText(ctx) {
  try {
    await ctx.reply(botMessages.get('work'));

    // const res = await chatGPTApi.chat(ctx.message.text);
    await new Promise((res) => setTimeout(res, 8000));

    await ctx.reply('res');
  } catch (err) {
    console.error(err);
    ctx.reply(botMessages.get('error'));
  }
}

// Modify it so send typing and prevent other messages
handleText = setTyping(handleText);
handleText = preventBackgroundMessages(handleText);

// Voice handler
export async function handleVoice(ctx) {

}

