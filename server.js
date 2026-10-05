const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// 1. Your official secure bot token configuration
const token = '8996326854:AAHeSyx924AVhzi0KrLZKkhOYI2DkgQ5iKQ';
const bot = new TelegramBot(token, { polling: true });

// 2. Your 100% verified working permanent live game link on Tiiny Host
const GAME_URL = 'https://tiiny.site';

app.use(express.json());

// Triggers seamlessly when a player types /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: '🎮 Play 1Tap Game',
                        url: GAME_URL // Opens cleanly in default mobile apps/browser
                    }
                ]
            ]
        }
    };
    bot.sendMessage(chatId, '🚀 Welcome to the Official 1Tap Earn Eco-system!\n\nTap the button below to open the mining app, complete social tasks, and secure your rank directly on Telegram:', opts);
});

// Port engine keeping the system running 24/7 on free tiers
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
