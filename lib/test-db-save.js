var Parser = require('./parser')
var stutter = require("nodejieba");
var fs = require("fs");
var db = require('./db')
var search = require('./search')



// var docs = parser.format_docs('songs.txt')

// //console.log(docs)
// var token = parser.tokenize_docs(docs,"lyrics")
// // //console.log(token)
// var index = parser.index_docs(token)
// var weight = parser.calculate_weight(docs,token,index)
// console.log(weight)
// //console.log(index)
// console.log(idf)

// var parser = JSON.parse(fs.readFileSync("./parser/db/500.json"))

// var index = []

// for(i in parser.idx){
//     index.push({
//         term:i,
//     postings:parser.idx[i]})
// }

// var tfidf = []

// for(i in parser.tfidf){
//     tfidf.push({
//      doc_id:i,
//     tfidf:parser.tfidf[i]})
// }

// var docs= []

// for(i in parser.docs){
//     docs.push({
//         doc_id:i,
//         content:parser.docs[i]})
// }

var docs = fs.readFileSync("./final6.txt")
    .toString('utf-8')
    .split("\n")
    .map((doc, pos) => {
        var obj = JSON.parse(doc).result
        obj.doc_id = pos
        return obj
    })


//var full_parser = Parser.init("large",docs,"doc_id",["lyrics","singer","composer",'songwritter','album'],[1,20,3,2,1])

console.log(db.get("large_tokenSet"))