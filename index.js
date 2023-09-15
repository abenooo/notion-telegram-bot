require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { Client } = require("@notionhq/client");

const telegramBotToken = process.env.telegramBotToken
const bot = new TelegramBot(telegramBotToken, {polling: true});

const notionApiKey = process.env.notionApiKey;
const notion = new Client({ auth: notionApiKey });

const telegramGroupId = process.env.telegramGroupId;

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

const databaseId = process.env.databaseIddatabaseId;



async function checkForNotionUpdates() {

    const filter = {
      and: [
        {
          property: 'title',
          title: {
            is_not_empty: true
          }
        }
      ]
    }
    
    try {
      const response = await notion.databases.query({
        database_id: databaseId,
        filter: filter 
      });
  
      return response.results.length > 0;
  
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return false;
    }
  
  }





