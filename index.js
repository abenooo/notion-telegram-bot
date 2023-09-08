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

const databaseId = "bf63936480744c8296353404e36047af";

async function checkForNotionUpdates() {
    const filter = {
        property: "Status",
        text: {
          equals: "Completed"
        }
    };

    let response;

    try {
        response = await notion.databases.query({
            database_id: databaseId,
            filter
        });
        
        if (response.results.length > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error(`Error: ${error.body}`);
        return false;
    }
}

