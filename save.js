import telegraf from 'telegraf';
import dotenv from 'dotenv';
import ChatGPTBot from './chatgpt.js';
import { setTyping, preventBackgroundMessages } from './utils/decorators.js';

dotenv.config({ path: './config.env' });

const { BOT_SECRET_KEY } = process.env;

const chatGPT = new ChatGPTBot();
const bot = new telegraf.Telegraf(BOT_SECRET_KEY);

bot.telegram.setMyCommands([
  { command: '/start', description: 'Start chatting' },
  { command: '/start', description: 'Info' },
]);

const MEETING_MESSAGE = `🤖 ChatGPT bot.
Ask me something or send me voice so I can work with it.`;

bot.command('start', async (ctx) => {
  chatGPT.clearConversation();
  await ctx.reply(MEETING_MESSAGE);
});


async function handleText(ctx) {
  sendMsg(ctx);
}

async function sendMsg(ctx) {
  let response = await chatGPT.chat(ctx.message.text);
  ctx.reply(response);
}

sendMsg = preventBackgroundMessages(sendMsg);
sendMsg = setTyping(sendMsg);

bot.on('message', handleText);

bot.launch();
