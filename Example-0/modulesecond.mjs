// MODULE
// 1. commonJS module
// 2. ECMA script module--> es6 module

// 1....................
// function simple(){
//     console.log('simple is complex');
// }
// // export
// module.exports = simple;

// 2.................... file extension change i mjs-->can't use module.export 
// export function simple(){
//     console.log('simple is complex');
// }
export  function simple(){
    console.log('simple is complex');
    return 45;
}
 export  function simple2(){
    console.log("i am simple2");
 }
