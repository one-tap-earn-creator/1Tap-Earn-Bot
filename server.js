const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// 1. Your official secure bot token configuration
const token = '8996326854:AAHeSyx924AVhzi0KrLZKkhOYI2DkgQ5iKQ';
const bot = new TelegramBot(token, { polling: true });

// 2. Direct 100% Verified Game Link (Bypassing Tiiny Host completely)
const GAME_URL = 'https://github.io';

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
                        url: GAME_URL // Directly opens your real 'T' coin game
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
