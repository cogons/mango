var http = require('http');
var fs = require('fs');

var file = fs.createWriteStream("f.mp3");
var request = http.get("http://om5.alicdn.com/577/95473577/2095482141/1773255315_15177147_l.mp3?auth_key=7baf71227119e93c2015946efe48dcc2-1498359600-0-null", function(response) {
  response.pipe(file);
});