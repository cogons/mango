
var fs = require("fs");
var stutter = require("nodejieba");

exports.format_docs = function (raw_docs) {
    return fs.readFileSync(raw_docs).toString('utf-8').split("\n").map(function (doc, pos) {
        var obj = JSON.parse(doc).result
        obj.doc_id = pos
        return obj
    })
}

exports.tokenize_docs = function (format_docs, key) {

    return format_docs.map((doc) => {
        var terms_ = stutter.cutForSearch(doc[key].replace(/[^\u4e00-\u9fa5]/gi, ""))
        return {
            terms: terms_,
            doc_id: doc.doc_id,
        }
    })
}

exports.index_docs = function (tokenized_docs) {

    var index = {}
    var index_arr = []
    tokenized_docs.forEach(function (doc) {
        doc["terms"].forEach(function (term) {
            if (index[term]) index[term].push(doc.doc_id)
            else {
                index[term] = []
                index[term].push(doc.doc_id)
            }
        })
    })
    for(i in index){
        index_arr.push({term:i,postings:index[i]})
    }
    return index_arr

}

exports.calculate_weight = function(format,token,index){

    var idf = calculate_idf(index,format)

    return token.map((t) => {
        var terms_ = t.terms
        return ({
            doc_id: t.doc_id,
            tfidf: calculate_tfidf_of_terms(terms_,idf)
        })
    })

}

function calculate_idf(index_docs,format){
    var idf = {}
    var total = format.length
     console.log(idf)
    index_docs.forEach((id)=>{
        idf[id.term] = Math.log2(total/id.postings.length)
    })
    return idf
}


function calculate_tfidf_of_terms(terms,idf) {
    var dict = {}
    terms.forEach((t) => {
        if (dict[t]) dict[t]+=(1/terms.length*idf[t])
        else {
            dict[t] = 1/terms.length*idf[t]
        }
    })
    return dict
}

// exports.calculate_tfidf = function(tokenize_docs,format_docs,idf){

//     format_docs.tfidf = {}

//     tokenize_docs.map((td)=>{

//         for(i in td.tf){
//             format_docs.tfidf[i] = td.tf[i]*idf[i]
//         }
//     })

    

// }