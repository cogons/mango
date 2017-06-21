
var cutter = require("../cutter");
var _ = require('underscore')

exports.query = function (query,parser){

    var query_token = cutter.cut(query)
    var unsorted_results =[]
    query_token.forEach((qt)=>{
        if(parser.idx[qt]) unsorted_results.push(parser.idx[qt])
    })
    unsorted_results = _.uniq(_.flatten(unsorted_results))
    var results = unsorted_results.sort((ur1,ur2)=>{
        return cal_score(ur2,query_token,parser)-cal_score(ur1,query_token,parser)
    })
    return results.map((r)=>{
        return parser.docs[r]
    })
}

exports.cal_score = cal_score

function cal_score(doc_id,query_token,parser){
    var score = 0
    query_token.forEach((qt)=>{
        if(parser.tfidf[doc_id][qt])
        score += parser.tfidf[doc_id][qt]
    })
    return score
}

exports.query_in_field = function(query,field_idx,docs){

    var query_token = cutter.cut(query)

    var results = []

    query_token.forEach((qt)=>{
        if(field_idx[qt]) results.push(field_idx[qt])
    })

    return _.uniq(_.flatten(results)).map((r)=>{
        return docs[r]
    })
}
