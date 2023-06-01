import telegraf from 'telegraf';
import dotenv from 'dotenv';
import ChatGPTAPI from './chatgpt.js';
import { setTyping, preventBackgroundMessages } from './utils/decorators.js';

dotenv.config({ path: './config.env' });

const { BOT_SECRET_KEY } = process.env;

const bot = new telegraf.Telegraf(BOT_SECRET_KEY);
const chatGPTApi = new ChatGPTAPI();

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
    chatGPTApi.clearConversation();
    await ctx.reply(botMessages.get('start'));
  } catch (err) {
    console.error(err);
  }
});

// Text handler
async function handleText(ctx) {
  try {
    await ctx.reply(botMessages.get('work'));
    const res = await chatGPTApi.chat(ctx.message.text);
    await ctx.reply(res);
  } catch (err) {
    console.error(err);
    ctx.reply(botMessages.get('error'));
  }
}

// Modify it so send typing and prevent other messages
handleText = setTyping(handleText);
handleText = preventBackgroundMessages(handleText);

// Handle incoming messages
bot.on('message', handleText);

bot.launch();
