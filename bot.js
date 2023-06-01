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

// text handler
async function handleText(ctx) {
  try {
    await ctx.reply(botMessages.get('work'));
    const res = await chatGPT.chat(ctx.message.text);
    await ctx.reply(res);
  } catch (err) {
    console.error(err);
    ctx.reply(botMessages.get('error'));
  }
}

// Handle incoming messages
bot.on('message', preventBackgroundMessages(setTyping(handleText)));

// Launch the bot
bot.launch();
