
var cutter = require("../cutter");
var _ = require('underscore')
var db = require('../db')

exports.query = function (query,prefix){
    var idx = db.get(prefix+'_idx')
    var docs = db.get(prefix+'_docs')
    var tfidf = db.get(prefix+"_tfidf")
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

exports.query_in_field = function(query,field,prefix,sorter){

    var query_token = cutter.cut(query)

    var docs = db.get("large_docs")

    var field_idx = db.get(prefix+"_idx")

    var results = []

    query_token.forEach((qt)=>{
        if(field_idx[qt]) results.push(field_idx[qt])
    })

    return _.uniq(_.flatten(results)).sort((a,b)=>{
            return docs[b][sorter]-docs[a][sorter]}).map((r)=>{
        return docs[r]
    })
}
