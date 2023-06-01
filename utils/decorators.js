import { botMessages } from '../bot.js';

// send typing animation
export function setTyping(func) {
  return async function (ctx, ...args) {
    await ctx.sendChatAction('typing');

    const intervalId = setInterval(async () => {
      await ctx.sendChatAction('typing');
    }, 1000);

    const res = await func.call(this, ctx, ...args);
    clearInterval(intervalId);
    return res;
  };
}

// prevent the function call until it's not done
export function preventBackgroundMessages(func) {
  let isProcessing = false;

  return async function (ctx, ...args) {
    if (isProcessing) {
      await ctx.reply(botMessages.get('wait'));
      return;
    }
    isProcessing = true;
    func.call(this, ctx, ...args)
      .then(() => { isProcessing = false; });
  };
}

