
var cutter = require("../cutter");
var _ = require('underscore')
var db = require('../db')

exports.query = function (query,prefix){
    var idx = db.getItem(prefix+'_idx')
    var docs = db.getItem(prefix+'_docs')
    var tfidf = db.getItem(prefix+"_tfidf")
    var query_token = cutter.cut(query)
    var unsorted_results =[]
    query_token.forEach((qt)=>{
        if(idx[qt]) unsorted_results.push(idx[qt])
    })
    unsorted_results = _.uniq(_.flatten(unsorted_results))
    var results = unsorted_results.sort((ur1,ur2)=>{
        return cal_score(ur2,query_token,prefix)-cal_score(ur1,query_token,prefix)
    })
    return results.map((r)=>{
        return docs[r]
    })
}

exports.cal_score = cal_score

function cal_score(doc_id,query_token,tfidf){
    var score = 0
    query_token.forEach((qt)=>{
        if(tfidf[doc_id])
        score += tfidf[doc_id][qt]?tfidf[doc_id][qt]:0
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
