const TelegramBot = require('node-telegram-bot-api');
const { Client } = require("@notionhq/client");

const telegramBotToken = "6540561484:AAHFml6O3u93dPqDgqqFuSehMfzSY4eDwYQ";
const bot = new TelegramBot(telegramBotToken, {polling: true});

const notionApiKey = "secret_xGjap5jU8qNqqZ1e3xNBmp7AICXwaJ2Nu3tclUpMNSZ";
const notion = new Client({ auth: notionApiKey });

const telegramGroupId = "400133281";

bot.on('message', (msg) => {
    const chatId = msg.chat.id; // This is your chat ID
    console.log(`Group ID is: ${chatId}`);
  });
  

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  // Check for updates in your Notion space
  const isUpdated = await checkForNotionUpdates();

  if (isUpdated) {
    bot.sendMessage(telegramGroupId, "New update in Notion space!");
  }
});

async function checkForNotionUpdates() {
  // Your logic to check for updates in Notion
  // For now, let's return true to simulate an update
  return true;
}
