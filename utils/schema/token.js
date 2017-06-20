var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Schema = new Schema(
    {
        "doc_id": {type:Number},
        "terms": [{type: String}]
    }
)

module.exports = Schema;
