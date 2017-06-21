var Parser = require('./parser')
var Search = require('./search')
var fs = require("fs");


var parser = JSON.parse(fs.readFileSync("./parser/db/500.json"))

var search = new Search()

var res1 = search.offline.query("五月天",parser)

console.log(res1[0])

// var res2 = search.offline.query("流星雨降落",parser)

// console.log(res2[0])

// var res3 = search.offline.query("爱你是最好的事",parser)

// console.log(res3[0])