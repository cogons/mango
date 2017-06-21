
var stutter = require("nodejieba");

var _ = require('underscore')
var offline = require('./offline')
var online = require('./online')


function Search(docs, identifier, field) {
    this.docs = docs || [],
    this.idnetifier = identifier || ""
    this.field = field || ""
}

module.exports = Search

Search.prototype.offline = offline

Search.prototype.online = online