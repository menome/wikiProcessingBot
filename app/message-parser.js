"use strict";
const queryBuilder = require('./queryBuilder');
const RabbitClient = require('@menome/botframework/rabbitmq');
var wikipedia = require("node-wikipedia");
var models = require('./models');
module.exports = function(bot) {
  var outQueue = new RabbitClient(bot.config.get('rabbit_outgoing'));
  outQueue.connect();

  // First ingestion point.
  this.handleMessage = function(message) {
    //bot.logger.info(JSON.stringify(msg))
    return new Promise(function(resolve, reject) {
      return wikipedia.page.data(message.Properties.pageName, { content: false }, function(response) {
        var outmsg = models.wikiPageModel(bot, message, response)
        return resolve(outQueue.publishMessage(outmsg, "harvesterMessage", {
          routingKey: 'syncevents.harvester.updates.wikiprocessingbot', 
          exchange: 'syncevents'
        }))
      });
    });
  }
}