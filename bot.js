import telegraf, { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import ChatGPTBot from './chatgpt.js';
import { setTyping, preventBackgroundMessages } from './utils/decorators.js';

dotenv.config({ path: './config.env' });

const { BOT_SECRET_KEY } = process.env;

const bot = new telegraf.Telegraf(BOT_SECRET_KEY);
const chatGPT = new ChatGPTBot();

const MEETING_MESSAGE = `🤖 ChatGPT bot.
Ask me something or send me voice so I can work with it.`;

bot.telegram.setMyCommands([
  { command: '/start', description: 'Start chatting' },
]);

bot.command('start', async (ctx) => {
  try {
    chatGPT.clearConversation();
    await ctx.reply(MEETING_MESSAGE);
  } catch (err) {
    console.error(err);
  }
});

// send ChatGPT's message to user
async function sendMsg(ctx, msg) {
  try {
    let response = await chatGPT.chat(msg);
    await ctx.reply(response);
  } catch (err) {
    console.error(err);
  }
}

// sendMsg = preventBackgroundMessages(sendMsg);
sendMsg = setTyping(sendMsg);

bot.on('message', async (ctx) => {
  try {
    // await ctx.reply('✅ Working on it...');
    sendMsg(ctx, ctx.message.text);
  } catch (err) {
    console.error(err);
    await ctx.reply('⚠️ Some error...');
  }
});

bot.launch();
