export default function typingDecorator(func, bot) {
  return async function (chatId, res, ...args) {
    bot.sendChatAction(chatId, 'typing');

    const intervalId = setInterval(() => {
      bot.sendChatAction(chatId, 'typing');
    }, 4000);

    await func.call(this, chatId, await res, ...args);

    clearInterval(intervalId);
  };
}
