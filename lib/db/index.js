var mongoose = require('mongoose');

var fs = require("fs");

exports.Schema = require('./Schema')

var localstorage = require('node-localstorage')

// var docSchema = require('./schema/doc')
// var tokenSchema = require('./schema/token')
// var indexSchema = require('./schema/index')

// var Songs = mongoose.model("Song", docSchema);
// var Lrc = mongoose.model("Lrc", tokenSchema);
// var Index = mongoose.model("Index", indexSchema);

module.exports = localstorage