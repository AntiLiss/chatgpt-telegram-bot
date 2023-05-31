// send typing animation
export function setTyping(func) {
  return async function (ctx, ...args) {
    await ctx.sendChatAction('typing');

    const intervalId = setInterval(async () => {
      await ctx.sendChatAction('typing');
    }, 2000);

    await func.call(this, ctx, ...args);
    clearInterval(intervalId);
  };
}

// prevent the function call until it's not done
export function preventBackgroundMessages(func) {
  let isProcessing = false;

  return async function (ctx, msg, ...args) {
    if (isProcessing) {
      await ctx.reply('🛑 Wait until I finish!');
      return;
    }
    isProcessing = true;
    await func.call(this, ctx, msg, ...args);
    isProcessing = false;
  };
}
