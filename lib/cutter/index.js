var stutter = require("nodejieba");

exports.cut = function(str){
    // var res = []
    // if(str.length<40) res = str.split(/[^\u4e00-\u9fa5]+/)
    // else 
    var res = stutter.cutForSearch(str.replace(/[^\u4e00-\u9fa5]/gi, ""))
    return res
}

