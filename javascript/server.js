const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url} received.`);

  let filePath = path.join(__dirname, 'public', req.url === '/' ? './index.html' : req.url);
  let contentType = 'text/html';

  if (path.extname(filePath) === '.js') contentType = 'text/javascript';
  if (path.extname(filePath) === '.css') contentType = 'text/css';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});