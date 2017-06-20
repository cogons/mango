var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var songSchema = new Schema(
    {
        "album": { type: String },
        "singer": { type: String },
        "commit_count": { type: Number },
        "ourl": { type: String },
        "lyrics": { type: String },
        "title": { type: String },
        "url": { type: String },
        "songwritter": { type: String },
        "tag": { type: String },
        "composer": { type: String },
        "albun-img": { type: String },
        "doc_id": {type:Number}
    }
)

module.exports = songSchema
