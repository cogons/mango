var cutter = require("../cutter");
var _ = require('underscore')
var db = require('../db')

function Parser(prefix,docs, identifier, token_field,field_weight) {
    this.docs = docs || [],
    this.idnetifier = identifier || ""
    this.token_field = token_field || ""
    this.field_weight = field_weight || undefined
    this.prefix = prefix || ""
}


// Parser.prototype.toJSON = function (txt) {

//     return fs.readFileSync(txt)
//         .toString('utf-8')
//         .split("\n")
//         .map((doc, pos) => {
//             var obj = JSON.parse(doc).result
//             obj.doc_id = pos
//             return obj
//         })
// }

Parser.prototype.tokenize = function () {
    var prefix = this.prefix
    var p = this
    var fields = []
    var weight = {}
    var docs = db.getItem(prefix+"_docs")
    fields.push(p.token_field)
    fields = _.flatten(fields)
    var weight_ = this.field_weight
    var tokenSet = docs.map((doc) => {
        var terms_ = _.flatten(fields.map(function(f){
            var term_for_f = cutter.cut(doc[f])
            term_for_f.forEach((tff)=>{
                if(weight_[0]>1&&tff.length>1) {
                if(!weight[doc.doc_id]) weight[doc.doc_id] = {}
                if(!weight[doc.doc_id][tff]) weight[doc.doc_id][tff] = weight_[0]
                else weight[doc.doc_id][tff] *= weight_[0]}
            })
            weight_.push(weight_.shift())
            return term_for_f
    }))
        return {
            terms: terms_,
            doc_id: doc.doc_id,
        }
    })
    db.setItem(prefix+"_weight",weight)
    db.setItem(prefix+"_tokenSet",tokenSet)
}

Parser.prototype.cal_tf = function () {
    var prefix = this.prefix
    var tokenSet = db.getItem(prefix+'_tokenSet')
    var tf = tokenSet.map((ts) => {
        var tf_ = {}
        var id_ = ts.doc_id
        var factor = 1 / ts.terms.length
        ts.terms.forEach(function (t) {
            if (tf_[t]) tf_[t] += factor
            else {
                tf_[t] = factor
            }
        })
        return {
            doc_id: id_,
            tf: tf_
        }
    })
    db.setItem(prefix+"_tf",tf)
}

Parser.prototype.invertedIndex = function () {
    var prefix = this.prefix
    var tokenSet = db.getItem(prefix+'_tokenSet')
    var index = {}
    var index_arr = []
    tokenSet.forEach(function (doc) {
        doc["terms"].forEach(function (term) {
            if (index[term]) index[term].push(doc.doc_id)
            else {
                index[term] = []
                index[term].push(doc.doc_id)
            }
        })
    })
    for (t in index) {
        index[t] = _.uniq(index[t])
    }

    db.setItem(prefix+"_idx",index)

    // for(i in index){
    //     index_arr.push({term:i,postings:index[i]})
    // }
    // return index_arr
}

Parser.prototype.cal_idf = function () {
    var prefix = this.prefix
    var docs = db.getItem(prefix+"_docs")
    var idx = db.getItem(prefix+"_idx")
    var idf = {}
    var total = docs.length
    for (v in idx) {
        idf[v] = Math.log2(total / idx[v].length)
    }
    db.setItem(prefix+"_idf",idf)
}

Parser.prototype.cal_tfidf = function () {
    var prefix = this.prefix
    var tfidf = {}
    var tf = db.getItem(prefix+"_tf")
    var idf = db.getItem(prefix+"_idf")
    var weight = db.getItem(prefix+"_weight")
    tf.forEach((item) => {

        var obj = {}

        for (i in item.tf) {
            var w = weight[item.doc_id]?
            (weight[item.doc_id][i]?weight[item.doc_id][i]:1):1
            obj[i] = item.tf[i] * idf[i] * w
        }

        tfidf[item.doc_id] = obj
        // return {
        //     doc_id:item.doc_id,
        //     tfidf:
        // }
    })

    db.setItem(prefix+"_tfidf",tfidf)
}


Parser.init = function (prefix,docs, identifier, fields,field_weight) {
    var parser = new Parser(prefix,docs, identifier, fields,field_weight)
    db.setItem(prefix+"_docs",docs)
    parser.tokenize()
    parser.invertedIndex()
    parser.cal_idf()
    parser.cal_tf()
    parser.cal_tfidf()
}

Parser.field_idx = function(prefix,docs,identifier,field,sorter){

    var parser = new Parser(prefix,docs, identifier, field,[1])
    db.setItem(prefix+"_docs",docs)
    var tokenSet = parser.tokenize()
    var idx = parser.invertedIndex()
    for(i in idx){
        idx[i] = idx[i].sort((a,b)=>{
            return docs[b][sorter]-docs[a][sorter]})
    }
    return idx

}


module.exports = Parser