var express = require('express');
var bodyParser = require('body-parser');
var api = require('./modules/api');
var app = express();

app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/../public'));

app.use(api);

var server = app.listen(process.env.PORT, () => {
  console.log('listening on port %d', server.address().port);
})
