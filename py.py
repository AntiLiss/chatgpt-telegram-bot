import time
import telebot


bot = telebot.TeleBot('6068443446:AAHpX9YT-8QVyb9gIlMO-ckwpEtwH6PUCqA')


# handling only specific command
@bot.message_handler(['edit'])
def edit(message):
    bot.send_message(message.chat.id, f'editing')


# handling all other requests
@bot.message_handler()
def main(message):
    bot.send_chat_action(message.chat.id, 'typing')
    time.sleep(10)
    bot.send_message(message.chat.id, f'{message.text}')


bot.infinity_polling()
