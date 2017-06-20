var lunr = require('lunr')

var documents = [{
  "name": "Lun",
  "text": "Like Solr, Lun but much smaller, and not as bright."
}, {
  "name": "React",
  "text": "A JavaScript Lun Lun library for building user interfaces."
}, {
  "name": "Lodash",
  "text": "A modern JavaScript utility library delivering modularity, performance & extras."
}]

var idx = lunr(function () {
  this.ref('name')
  this.field('text')

  documents.forEach(function (doc) {
    this.add(doc)
  }, this)
})

console.log(idx.invertedIndex)

//console.log(idx.search("bright"))