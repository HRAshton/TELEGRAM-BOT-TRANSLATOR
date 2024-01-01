# TELEGRAM-BOT-TRANSLATOR

## Description

This is a simple Telegram bot that converts transliteration to text
and translates it into English.

Does not log messages.

## Installation

1. Create a Telegram bot using BotFather.
2. Create a Worker on CloudFlare.
3. Register two secrets in the worker: TLGR_API_TOKEN and SECRET_KEY.
4. Deploy the bot to CloudFlare Workers using Wrangler.
5. Register a webhook for the bot with `key`, `to` and `from` query parameters.

## Usage

Send a message to the bot.
