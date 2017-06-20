var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Schema = new Schema(
    {
        "term": {type: String},
        "postings": [{type:Number}]
    }
)

module.exports = Schema;
