// about import--> 1.this type of import called common js module
// 2. es6 module that also a way of import...
// 1. want to this particular obj import into index.js
// (function(exports, require, module, _filename, _dirname){
sushma ={
    name:"suahma",
    favNum:5,
    developer:true
}
// export
console.log(exports, require, module, _filename, _dirname);
module.exports = sushma;

// })