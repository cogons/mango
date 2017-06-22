var Parser = require('./parser')
var Search = require('./search')
var fs = require("fs");
var db = require("./db");

// var docs = fs.readFileSync("./final6.txt")
//     .toString('utf-8')
//     .split("\n")
//     .map((doc, pos) => {
//         var obj = JSON.parse(doc).result
//         obj.doc_id = pos
//         return obj
//     })

// Parser.field_idx("singer","large_docs","doc_id",["singer"],"commit_count")
// Parser.field_idx("composer","large_docs","doc_id",["composer"],"commit_count")
// Parser.field_idx("writer","large_docs","doc_id",["songwritter"],"commit_count")

//console.log(idx_singer)

// var search = new Search()

// var res1 = search.offline.query_in_field("周杰伦","writer","large","commit_count")

// console.log(res1[0])

var a = db.get('large_docs')

console.log(a[12505])

//db.save()

//full_parser.save('./parser.json')

// fs.writeFileSync("./parser/db/14000-2.json", JSON.stringify({
//     docs:full_parser.docs,
//     idx:full_parser.idx,
//     tfidf:full_parser.tfidf,
// }));

// var search = new Search()

// var res1 = search.offline.query("汤旭",full_parser)

// console.log(res1[0])

// console.log(full_parser.weight)

// console.log(full_parser.idx)

// console.log(full_parser.docs)

// console.log(full_parser.tfidf)
