var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.resolve(path.join(__dirname, 'public'))));

app.get('/api/timezones', function (req, res) {
  res.send([]);
});

app.get('/api/timezones/:timezone', function (req, res) {
  res.send({});
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening on port ' + port);
});
