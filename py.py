import telebot
from dotenv import dotenv_values


env_vars = dotenv_values('pyconfig.env')

BOT_SECRET_KEY = env_vars['BOT_SECRET_KEY']

bot = telebot.TeleBot('5871993037:AAGX4cNDoIMAr1Xc0nGnAiriPuUr1HnH0aw')


# handling only specific command
@bot.message_handler(['start'])
def edit(message):
    msg = '''🤖 ChatGPT bot.
Ask me something or send me voice so I can work with it'''
    bot.send_message(message.chat.id, msg)


# handling all other requests
@bot.message_handler()
def main(message):
    bot.send_message(message.chat.id, f'{message.text}')


bot.infinity_polling()
