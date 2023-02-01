// How to run node js in localhost
const http = require('http');

const server = http.createServer((req, res) => {

  res.end('Hello Node js');

});

const PORT = 8000;
server.listen(5000); 

console.log(`Node js running at ${PORT}`);