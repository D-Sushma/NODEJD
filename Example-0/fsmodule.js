//using commonJS syntax

const fs = require('fs');
// (file name jo file read krna chahte hai, give encoding,, callback function)
// fs.readFile('file.txt', 'utf8', (err, data)=>{
// console.log(err, data);
// })
// -------------------
// const a = fs.readFileSync('file.txt')
// console.log(a.toString());


fs.writeFile('file.txt', 'this is a data', ()=>{
    console.log("written to the file");
})

// const b = fs.writeFileSync('file.txt', 'this is a data2')
// console.log(b);
console.log("finished reading file");
