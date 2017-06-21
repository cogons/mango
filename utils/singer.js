var fs = require("fs");
var _ = require('underscore')

var docs = fs.readFileSync("./456.txt")
    .toString('utf-8')
    .split("\n")
    .map((doc, pos) => {
        return JSON.parse(doc).result.singer

    })

//console.log(docs)
var res = _.filter(docs, function (d) {
    return d == '周杰伦'
})
console.log(res.length)