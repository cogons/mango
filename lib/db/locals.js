var mongoose = require('mongoose');

var fs = require("fs");

// var docSchema = require('./schema/doc')
// var tokenSchema = require('./schema/token')
// var indexSchema = require('./schema/index')

// var Songs = mongoose.model("Song", docSchema);
// var Lrc = mongoose.model("Lrc", tokenSchema);
// var Index = mongoose.model("Index", indexSchema);

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').JSONStorage;
  localStorage = new LocalStorage(__dirname+'/scratch');
}

console.log(localStorage)

module.exports = localStorage