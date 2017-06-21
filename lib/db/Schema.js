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


exports.token = {
    "doc_id": { type: Number },
    "terms": [{ type: String }]
}


exports.index = {
    "term": { type: String },
    "postings": [{ type: Number }]
}

exports.docs = {
    "doc_id": { type: Number },
    "content": { type: Object }
}

exports.tfidf = {
    "doc_id": { type: Number },
    "tfidf": { type: Object }
}

exports.pack = {
    "name": { type: String },
    "content": { type: Object }
}