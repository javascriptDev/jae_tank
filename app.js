var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  res.write('asdasdad')
  res.end();
}).listen(process.env.PORT || 1337, null);
