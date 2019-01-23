/**
 * The Bot Itself
 */
"use strict";
const path = require("path")
const Bot = require('@menome/botframework')
const config = require("../config/config.json")
const configSchema = require("./config-schema")
const messageParser = require("./message-parser");

// Start the actual bot here.
var bot = new Bot({config, configSchema});

// Listen on the Rabbit bus.
var mp = new messageParser(bot);
bot.rabbit.addListener("wikipediaedit_queue", mp.handleMessage, "harvesterMessage");



bot.start();
bot.changeState({state: "idle"});