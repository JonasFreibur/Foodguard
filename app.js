const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});

var httpsServer = https.createServer(options, app);
httpsServer.listen(8000);