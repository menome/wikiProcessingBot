var Query = require('decypher').Query;

module.exports = {}

/**
 * Returns a query that updates the given file node with an absolute fuckpile of text
 * in an indexed property.
 */
module.exports.importPageQuery = function(uuid, page) {
  var query = new Query();
  query.match("(f:Card {Uuid: {uuid}})", {uuid: uuid})
  query.set("f.page = {page}",{page: page} )
  return query;
}