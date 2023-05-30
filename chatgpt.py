import openai
from dotenv import dotenv_values


env_vars = dotenv_values('pyconfig.env')

OPENAI_API_KEY = env_vars['OPENAI_API_KEY']

openai.api_key = OPENAI_API_KEY


class ChatGPTBot:
    def __init__(self):
        self.message_history = []
        self.chat_completion = None

    def chat(self, msg):
        self.message_history.append({"role": "user", "content": msg})

        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=self.message_history
        )
        self.chat_completion = completion

        return completion.choices[0].message.content

    def clearConversation(self):
        openai.ChatCompletion.clear(self.chat_completion)


chat_bot = ChatGPTBot()

print(chat_bot.chat('tell a little joke'))
print(chat_bot.chat('again'))
print(chat_bot.chat('more'))

chat_bot.clearConversation()

print(chat_bot.chat('again'))
