var Parser = require('./parser')
var Search = require('./search')
var fs = require("fs");

var docs = fs.readFileSync("./songs.txt")
    .toString('utf-8')
    .split("\n")
    .map((doc, pos) => {
        var obj = JSON.parse(doc).result
        obj.doc_id = pos
        return obj
    })


var idx_singer = Parser.field_idx(docs,"doc_id",["singer"],"commit_count")


//console.log(idx_singer)

var search = new Search()

var res1 = search.offline.query_in_field("周杰伦 梁汉文",idx_singer,docs)

console.log(res1[0])

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
