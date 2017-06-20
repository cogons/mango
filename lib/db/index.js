var mongoose = require('mongoose');

var fs = require("fs");

exports.Schema = require('./Schema')


// var docSchema = require('./schema/doc')
// var tokenSchema = require('./schema/token')
// var indexSchema = require('./schema/index')

// var Songs = mongoose.model("Song", docSchema);
// var Lrc = mongoose.model("Lrc", tokenSchema);
// var Index = mongoose.model("Index", indexSchema);

exports.connect = function () {
    mongoose.connect('mongodb://localhost/test');
}

exports.disconnect = function(){
    mongoose.disconnect()
}

exports.create_model = create_model

function create_model(name, def) {

    var Schema = mongoose.Schema;
    var schema = new Schema(def)
    return mongoose.model(name, schema);
}

exports.save = function (docs, Model) {
    docs.forEach((doc) => {
        var s = new Model(doc)
        s.save();
    })
}