exports.doc = {

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
    "doc_id": { type: Number }

}

exports.index = {
    "term": { type: String },
    "postings": [{ type: Number }]
}

exports.token = {
    "doc_id": { type: Number },
    "terms": [{ type: String }]
}
