var fs = require("fs");
var _ = require('underscore')

var docs = fs.readFileSync("../lib/songs-l.txt")
    .toString('utf-8')
    .split("\n")
    .map((doc, pos) => {
        return JSON.parse(doc).result.singer

    })

//console.log(docs)
var res = _.filter(docs, function (d) {
    return d == '五月天'
})
console.log(res)