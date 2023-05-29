import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import ChatGPTBot from './chatgpt.js';
import typingDecorator from './utils/typingDecorator.js';

dotenv.config({ path: './config.env' });

const { BOT_SECRET_KEY } = process.env;

const chatGPT = new ChatGPTBot();
const bot = new TelegramBot(BOT_SECRET_KEY, { polling: true });

bot.setMyCommands([
  { command: '/start', description: 'Start chatting' },
  { command: '/new_chat', description: 'Start new chat' },
]);

// set typing animation to bot.sendMessage
bot.sendMessage = typingDecorator(bot.sendMessage, bot);

// handling /start
async function start(msg) {
  const response = await chatGPT.chat('hi');
  await bot.sendMessage(msg.chat.id, response);
}

// handling /new_chat
async function newChat(msg) {
  chatGPT.clearConversation();
  const response = await chatGPT.chat('hi');
  await bot.sendMessage(msg.chat.id, response);
}

// run bot
bot.on('message', async (msg) => {
  // matching commands handling
  if (msg.text === '/start') return start(msg);
  if (msg.text === '/new_chat') return newChat(msg);

  const response = chatGPT.chat(msg.text);
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, response);
});


