var fs = require("fs");
var _ = require('underscore')


var data = []

var file = "./dict.txt"

fs.readFileSync("../lib/songs-l.txt")
    .toString('utf-8')
    .split("\n")
    .forEach((doc, pos) => {
        data.push(JSON.parse(doc).result.singer.split(/[^\u4e00-\u9fa5]+/))
        data.push(JSON.parse(doc).result.composer.split(/[^\u4e00-\u9fa5]+/))
        data.push(JSON.parse(doc).result.songwritter.split(/[^\u4e00-\u9fa5]+/))
    })

var txt = ""

console.log(_.uniq(_.flatten(data)))

_.uniq(_.flatten(data)).forEach((o)=>{
    if(o.length>1) txt+=(o+"\n")
})

fs.writeFileSync("./dict.txt", txt);