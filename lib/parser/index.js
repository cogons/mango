var cutter = require("../cutter");
var _ = require('underscore')

function Parser(docs, identifier, token_field,field_weight) {
    this.docs = docs || [],
    this.idnetifier = identifier || ""
    this.token_field = token_field || ""
    this.field_weight = field_weight || undefined
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
    var p = this
    var fields = []
    p.weight = {}
    fields.push(p.token_field)
    fields = _.flatten(fields)
    var weight_ = p.field_weight
    p.tokenSet = p.docs.map((doc) => {
        var terms_ = _.flatten(fields.map(function(f){
            var term_for_f = cutter.cut(doc[f])
            term_for_f.forEach((tff)=>{
                if(weight_[0]>1&&tff.length>1) {
                if(!p.weight[doc.doc_id]) p.weight[doc.doc_id] = {}
                if(!p.weight[doc.doc_id][tff]) p.weight[doc.doc_id][tff] = weight_[0]
                else p.weight[doc.doc_id][tff] *= weight_[0]}
            })
            weight_.push(weight_.shift())
            return term_for_f
    }))
        return {
            terms: terms_,
            doc_id: doc.doc_id,
        }
    })
}

Parser.prototype.cal_tf = function () {
    var p = this
    p.tf = p.tokenSet.map((ts) => {
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
}

Parser.prototype.invertedIndex = function () {

    var p = this
    var index = {}
    var index_arr = []
    p.tokenSet.forEach(function (doc) {
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

    p.idx = index

    // for(i in index){
    //     index_arr.push({term:i,postings:index[i]})
    // }
    // return index_arr
}

Parser.prototype.cal_idf = function () {

    var p = this
    var idf = {}
    p.num_of_docs = p.docs.length
    for (v in p.idx) {
        idf[v] = Math.log2(p.num_of_docs / p.idx[v].length)
    }
    p.idf = idf
}

Parser.prototype.cal_tfidf = function () {
    var p = this
    p.tfidf = {}
    p.tf.forEach((item) => {

        var obj = {}

        for (i in item.tf) {
            var weight = p.weight[item.doc_id]?
            (p.weight[item.doc_id][i]?p.weight[item.doc_id][i]:1):1
            obj[i] = item.tf[i] * p.idf[i] * weight
        }

        p.tfidf[item.doc_id] = obj
        // return {
        //     doc_id:item.doc_id,
        //     tfidf:
        // }
    })
}


Parser.init = function (docs, identifier, field,field_weight) {
    var parser = new Parser(docs, identifier, field,field_weight)
    parser.tokenize()
    parser.invertedIndex()
    parser.cal_idf()
    parser.cal_tf()
    parser.cal_tfidf()
    return parser
}


module.exports = Parser