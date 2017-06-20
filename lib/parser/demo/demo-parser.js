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

var parser = new Parser(docs,"doc_id","lyrics")

parser.tokenize()

parser.invertedIndex()

parser.cal_idf()

parser.cal_tf()

parser.cal_tfidf()

//console.log(parser.tfidf)

/////

var search = new Search()

//console.log(search.offline("流星雨降落",parser))
