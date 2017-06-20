var parser = require('./parser')
var stutter = require("nodejieba");
var fs = require("fs");
var db = require('./db')
var Search = require('./search')



// var docs = parser.format_docs('songs.txt')

// //console.log(docs)
// var token = parser.tokenize_docs(docs,"lyrics")
// // //console.log(token)
// var index = parser.index_docs(token)
// var weight = parser.calculate_weight(docs,token,index)
// console.log(weight)
// //console.log(index)
// console.log(idf)

db.connect()
var Docs = db.create_model("Song",db.Schema.docs)
var Index = db.create_model("Index",db.Schema.index)
var Tfidf = db.create_model("Token",db.Schema.tfidf)
var search = new Search()
var res3 = search.online.query(Index,Tfidf,"好的事降落")
db.disconnect()

//search.search(Index,"陪你去看流星雨")