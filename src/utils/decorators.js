import { botMessages } from '../config.js';

// Send typing animation
export function setTyping(func) {
  return async function (ctx, ...args) {
    await ctx.sendChatAction('typing');

    const intervalId = setInterval(async () => {
      await ctx.sendChatAction('typing');
    }, 1000);

    await func.call(this, ctx, ...args);
    clearInterval(intervalId);
  };
}

// Prevent the function call until it's not done
export function preventBackgroundMessages(func) {
  let isProcessing = false;

  return async function (ctx, ...args) {
    if (isProcessing) {
      await ctx.reply(botMessages.get('wait'));
      return;
    }
    isProcessing = true;

    // Use promise to avoid blocking the bot when function re-calls
    func.call(this, ctx, ...args)
      .then(() => { isProcessing = false; });
  };
}

