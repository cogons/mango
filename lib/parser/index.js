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

Parser.prototype.tokenize = function (docs) {
    var p = this
    var fields = []
    p.weight = {}
    fields.push(p.token_field)
    fields = _.flatten(fields)
    var weight_ = p.field_weight
    return docs.map((doc) => {
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

Parser.prototype.cal_tf = function (tokenSet) {
    return tokenSet.map((ts) => {
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

Parser.prototype.invertedIndex = function (tokenSet) {

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

    return index

    // for(i in index){
    //     index_arr.push({term:i,postings:index[i]})
    // }
    // return index_arr
}

Parser.prototype.cal_idf = function (docs,idx) {

    var p = this
    var idf = {}
    var total = docs.length
    for (v in idx) {
        idf[v] = Math.log2(total / idx[v].length)
    }
    return idf
}

Parser.prototype.cal_tfidf = function (tf,idf,weight) {

    var tfidf = {}
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

    return tfidf
}


Parser.init = function (docs, identifier, fields,field_weight) {
    var parser = new Parser(docs, identifier, fields,field_weight)
    var tokenSet = parser.tokenize(docs)
    var idx = parser.invertedIndex(tokenSet)
    var idf = parser.cal_idf(docs,idx)
    var tf = parser.cal_tf(tokenSet)
    var tfidf = parser.cal_tfidf(tf,idf,parser.weight)
    parser.tokenSet = tokenSet
    parser.idx = idx
    parser.idf = idf
    parser.tf = tf
    parser.tfidf = tfidf
    return parser
}

Parser.field_idx = function(docs,identifier,field,sorter){

    var parser = new Parser(docs, identifier, field,[1])
    var tokenSet = parser.tokenize(docs)
    var idx = parser.invertedIndex(tokenSet)
    for(i in idx){
        idx[i] = idx[i].sort((a,b)=>{
            return docs[b][sorter]-docs[a][sorter]})
    }
    return idx

}


module.exports = Parser