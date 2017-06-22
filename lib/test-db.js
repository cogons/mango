// const NodeCache = require( "node-cache" );
// global.db = new NodeCache();

// var db = global.db

// //console.log(db.get('posts'))
// obj = { my: "Special", variable: 42 };
// db.set( "myKey", obj, 10000 );
// console.log(db.get( "myKey" ))

var singleton = require('./db');

console.log(singleton); 

 console.log(singleton.someProperty); // 'I am public'
 console.log(singleton.toggleZ()); // false 
 console.log(singleton.toggleZ()); // true (public functions can still reference private variables)
