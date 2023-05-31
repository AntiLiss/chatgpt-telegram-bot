// // // adds typing animation to bot.sendMessage
// export function setTypingAnimationDecorator(func, bot) {
//   return async function (chatId, res, ...args) {
//     await bot.sendChatAction(chatId, 'typing');

//     const intervalId = setInterval(async () => {
//       await bot.sendChatAction(chatId, 'typing');
//     }, 4000);

//     await func.call(this, chatId, await res, ...args);

//     clearInterval(intervalId);
//   };
// }

// // prevents other messages while processing current message (for mainHandler)
// export function preventBackgroundMessagesDecorator(func, bot) {
//   let isProcessing = false;

//   return async function (msg, ...args) {
//     if (isProcessing) {
//       await bot.sendMessage(msg.chat.id, '🛑 Wait until I finish!');
//       return;
//     }
//     isProcessing = true;
//     await func.call(this, msg, ...args);
//     isProcessing = false;
//   };
// }


// The same but for telegraf
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

export function preventBackgroundMessages(func) {
  let isProcessing = false;

  return async function (ctx, ...args) {
    if (isProcessing) {
      await ctx.reply('🛑 Wait until I finish!');
      return;
    }
    isProcessing = true;
    const res = await func.call(this, ctx, ...args);
    isProcessing = false;
    return res;
  };
}
