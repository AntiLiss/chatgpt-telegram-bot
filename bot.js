import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import ChatGPTBot from './chatgpt.js';
import {
  setTypingAnimationDecorator,
  preventBackgroundMessagesDecorator,
} from './utils/decorators.js';

dotenv.config({ path: './config.env' });

const { BOT_SECRET_KEY } = process.env;

const chatGPT = new ChatGPTBot();
const bot = new TelegramBot(BOT_SECRET_KEY, { polling: true });

bot.setMyCommands([
  { command: '/start', description: 'Start chatting' },
]);

// set typing animation to bot.sendMessage
bot.sendMessage = setTypingAnimationDecorator(bot.sendMessage, bot);

// handle /start command
async function start(msg) {
  chatGPT.clearConversation();

  const meetingMsg = `🤖 ChatGPT bot.
Ask me something or send me voice so I can work with it.`;

  await bot.sendMessage(msg.chat.id, meetingMsg);
}

// main handler
async function mainHandler(msg) {
  // handle matching commands
  if (msg.text === '/start') return start(msg);

  const response = chatGPT.chat(msg.text);
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, response);
}

// prevent other messages while processing current message
mainHandler = preventBackgroundMessagesDecorator(mainHandler, bot);

// run bot
bot.on('message', mainHandler);


// TODO: implement voice recognition using Vosk
// bot.on('voice', async (msg) => {
//   bot.sendMessage(msg.chat.id, msg.voice.duration);
// });
