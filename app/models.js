/**
 * Holds all the models that are specific to this harvester.
 * These are generally things like mappings, which convert source data into the refinery message schema
 */

/**
 * Holds all the models that are specific to this harvester.
 * These are generally things like mappings, which convert source data into the refinery message schema
 */

//////////////////////////////////////
// These are transforms for REST responses.
//////////////////////////////////////
module.exports = {
    wikiPageModel
} 

function wikiPageModel(bot, msg,response){
    if (response != null){
        var pageContents = response.text;
        var categories = response.categories;
        var links = response.links;
        var externalLinks = response.externallinks;
        //map the stuff to connections
        var categorylinkConnections = categories.map(x=>msg.Connections.push(categoryTransform(x)));
        var externalLinkConnections = externalLinks.map(x=>msg.Connections.push(externalLinkTranform(x)));
        var linkConnections = links.map(x=>msg.Connections.push(linkTranform(x)));
        // msg.Connections += (JSON.stringify(linkConnections));
        // msg.Connections += (JSON.stringify(externalLinkConnections));
        // msg.Connections += (JSON.stringify(categorylinkConnections));
    }
    msg.Properties.pageContents = pageContents;
    bot.logger.info(JSON.stringify(msg));
    return msg;
}



function categoryTransform(category){
    return {
        "NodeType": "Category",
        "RelType": "CATEGORIZES",
        "ForwardRel": true,
        "ConformedDimensions": {
          "name":category["*"]
        },
        "Properties": {
        }
      

    }
}

function externalLinkTranform(link){
    return {
        "NodeType": "Webpage",
        "RelType": "LINKS_TO",
        "ForwardRel": true,
        "ConformedDimensions": {
          "page":link
        },
        "Properties": {
        }
    }
}

function linkTranform(link){
    return {
        "NodeType": "Page",
        "RelType": "LINKS_TO",
        "ForwardRel": true,
        "ConformedDimensions": {
          "name":link["*"]
        },
        "Properties": {
        }
    }
}