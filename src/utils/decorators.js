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
  // Map to track per-user processing state
  const processingUsers = new Map();

  return async function (ctx, ...args) {
    const userId = ctx.from.id;
    if (processingUsers.has(userId)) {
      await ctx.reply(botMessages.get('wait'));
      return;
    }
    processingUsers.set(userId, true);
    await func.call(this, ctx, ...args);
    processingUsers.delete(userId);
  };
}
