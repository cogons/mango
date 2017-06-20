var mongoose = require('mongoose');
var songSchema = require('./schema/song')
var termSchema = require('./schema/term')
var invdexSchema = require('./schema/invdex')
var fs = require("fs");
autoinc = require('mongoose-id-autoinc');
var stutter = require("nodejieba");

mongoose.connect('mongodb://localhost/test');
var Song = mongoose.model("Song", songSchema);
var Lrc = mongoose.model("Lrc", termSchema);
var Invdex = mongoose.model("Invdex", invdexSchema);

// Step 1: save raw data

var path = 'songs.txt'
var songs = parse(path);

function s1(){

songs.forEach((song) => {
  var s = new Song(song)
  s.save();
})
}

// Step 2: generate term collection

function s2(){

Song.find({},(err,doc)=>getTerm(doc,"lyrics",Lrc))
function getTerm(doc,key,Model){
  doc.forEach(function (d) {
    var ss = new Model({
      term: stutter.cutForSearch(d[key].replace(/[^\u4e00-\u9fa5]/gi,"")),
      song_id: d._id
    })
    ss.save(function (err) {
      if (err) // ...
        console.log('meow');
    });
  })
}

}

// Step 3: generate inverted index collection

function s3(){

var terms = songs.map((song)=>{

    return {
        lyrics: stutter.cut(song.lyrics.replace(/\s+/g,"")),
        title: stutter.cut(song.title.replace(/\s+/g,"")),
        id:song.id
    } 

})

function inv_index(collection,type){

    var ii = {}

    collection.forEach(function(c){
        c[type].forEach(function(term){
            if(ii[term]) ii[term].push(c.id)
            else {
                ii[term]=[]
                ii[term].push(c.id)
            }
        })
    })
    return ii
}

var ii = inv_index(terms,"lyrics")

for(v in ii){

    var iii = new Invdex({
      term:v,
      doc_id:ii[v]
    })
    iii.save(function (err) { });

}


}


Invdex.find({'term':'爱'},'doc_id',(err,doc)=>console.log(doc))




// Lrc.find({},(err,doc)=>{
//     doc.forEach((d)=>{
//         d.term.forEach((t)=>{
//           console.log(t)
//       }
//     )}
//     )
// })


function inv_index(collection,type){

    var ii = {}

    collection.forEach(function(c){
        c[type].forEach(function(term){
            if(ii[term]) ii[term].push(c.id)
            else {
                ii[term]=[]
                ii[term].push(c.id)
            }
        })
    })

    return ii
}


// Step 4: calculate tf-idf in term colection


// var terms = songs.map((song)=>{

//     return {
//         lyrics: stutter.cut(song.lyrics.replace(/\s+/g,"")),
//         title: stutter.cut(song.title.replace(/\s+/g,"")),
//         id:song.id
//     } 

// })





function parse(path) {
  return fs.readFileSync(path).toString('utf-8').split("\n").map(function (o, i) {
    var obj = JSON.parse(o).result
    obj.id = i
    return obj
  })
}

function cut(doc) {
  for (var i in doc) {
    console.log(i)
  }
}