import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

export const {
  BOT_SECRET_KEY,
  ACCESS_TOKEN,
  CHATGPT_PROXY_URL,
} = process.env;

export const botMessages = new Map(Object.entries({
  start: `🤖 ChatGPT bot.
  Ask me something or send me voice so I can work with it.`,
  work: '✅ Working on it...',
  wait: '⏳ Wait until I finish!',
  error: '⚠️ Unknown error!',
}));
