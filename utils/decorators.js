// adds typing animation to bot.sendMessage
export function setTypingAnimationDecorator(func, bot) {
  return async function (chatId, res, ...args) {
    bot.sendChatAction(chatId, 'typing');

    const intervalId = setInterval(() => {
      bot.sendChatAction(chatId, 'typing');
    }, 4000);

    await func.call(this, chatId, await res, ...args);

    clearInterval(intervalId);
  };
}

// prevents other messages while processing current message (for mainHandler)
export function preventBackgroundMessagesDecorator(func, bot) {
  let isProcessing = false;

  return async function (msg, ...args) {
    if (isProcessing) {
      await bot.sendMessage(msg.chat.id, '🛑 Wait until I finish!');
      return;
    }
    isProcessing = true;
    await func.call(this, msg, ...args);
    isProcessing = false;
  };
}
