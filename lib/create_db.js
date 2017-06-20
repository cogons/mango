var Parser = require('./parser')
var Search = require('./search')
var fs = require("fs");

var docs = fs.readFileSync("./songs-s.txt")
    .toString('utf-8')
    .split("\n")
    .map((doc, pos) => {
        var obj = JSON.parse(doc).result
        obj.doc_id = pos
        return obj
    })


var full_parser = Parser.init(docs,"doc_id",["lyrics","singer","composer",'songwritter','album'],[1,5,3,2,1])

//full_parser.save('./parser.json')

// fs.writeFileSync("./parser/db/14000-2.json", JSON.stringify({
//     docs:full_parser.docs,
//     idx:full_parser.idx,
//     tfidf:full_parser.tfidf,
// }));

//console.log(full_parser.weight)

console.log(full_parser.idx)

console.log(full_parser.docs)

console.log(full_parser.tfidf)
