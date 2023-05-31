import telegraf from 'telegraf';
import dotenv from 'dotenv';
import ChatGPTBot from './chatgpt.js';
import { setTyping, preventBackgroundMessages } from './utils/decorators.js';

dotenv.config({ path: './config.env' });

const { BOT_SECRET_KEY } = process.env;

const bot = new telegraf.Telegraf(BOT_SECRET_KEY);
const chatGPT = new ChatGPTBot();

export const botMessages = new Map(Object.entries({
  start: `🤖 ChatGPT bot.
Ask me something or send me voice so I can work with it.`,
  work: '✅ Working on it...',
  wait: '⏳ Wait until I finish!',
  error: '⚠️ Unknown error!',
}));

// Set bot commands
bot.telegram.setMyCommands([
  { command: '/start', description: 'Start chatting' },
]);

// Handle /start command
bot.command('start', async (ctx) => {
  try {
    chatGPT.clearConversation();
    await ctx.reply(botMessages.get('start'));
  } catch (err) {
    console.error(err);
  }
});

// Send ChatGPT's message to user
async function sendMsg(ctx, msg) {
  try {
    let response = await chatGPT.chat(msg);
    return response;
  } catch (err) {
    console.error(err);
  }
}

// Send typing animation when sending messages
sendMsg = setTyping(sendMsg);

// Handle incoming messages
bot.on('message', preventBackgroundMessages(async (ctx) => {
  try {
    await ctx.reply(botMessages.get('work'));
    const res = await sendMsg(ctx, ctx.message.text);
    await ctx.reply(res);
  } catch (err) {
    console.error(err);
    ctx.reply(botMessages.get('error'));
  }
}));

// Launch the bot
bot.launch();
