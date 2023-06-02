import telegraf from 'telegraf';
import * as config from './config.js';
import * as commandController from './controllers/commandController.js';
import * as messageController from './controllers/messageController.js';

const bot = new telegraf.Telegraf(config.BOT_SECRET_KEY);

// Set bot commands
bot.telegram.setMyCommands([
  { command: '/start', description: 'Start chatting' },
]);

// Handle commands
bot.command('start', commandController.handleStart);

// Handle messages
bot.on('message', messageController.handleText);

bot.launch();
