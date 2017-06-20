
var cutter = require("../cutter");
var _ = require('underscore')
var db = require('../db')

exports.query2 = function (query, parser) {

    var query_token = cutter.cut(query)
    var unsorted_results = []
    query_token.forEach((qt) => {
        unsorted_results.push(parser.idx[qt])
    })
    unsorted_results = _.uniq(_.flatten(unsorted_results))
    var results = unsorted_results.sort((ur1, ur2) => {
        return cal_score(ur2, query_token, parser) - cal_score(ur1, query_token, parser)
    })
    return results.map((r) => {
        return parser.docs[r]
    })

}

exports.cal_score = cal_score

function cal_score(doc_id, query_token, Model) {
    var score = 0
    //console.log(Model.findOne({ doc_id: doc_id }))
    
    // query_token.forEach((qt) => {
    //     if (parser.tfidf[doc_id][qt])
    //         score += parser.tfidf[doc_id][qt]
    // })
    // return score
}

exports.query = function (Model,Tfidfmodel,query) {

    var query_token = cutter.cut(query)

    Model.find({ term: { $in: query_token } })
        .then((doc) => {
            return _.uniq(_.flatten(_.map(doc, (d) => d.postings)))
        })
        .then((res_unsorted)=>{
            console.log(res_unsorted[0])
            console.log(Tfidfmodel.find({ doc_id: { $in: res_unsorted[0] } }))
            
            //res_unsorted.map((ru)=>cal_score(ru, query_token, Tfidfmodel))
        })
        .then((res)=>{
            console.log(res)
        })

}

