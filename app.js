var express = require('express');
var path = require('path');
var timezones = require('./timezones.json').timezones;
var app = express();

app.use(express.static(path.resolve(path.join(__dirname, 'public'))));

app.get('/api/timezones', function (req, res) {
  res.send(Object.keys(timezones).map(function (abbreviation) {
    return Object.assign({}, { abbreviation: abbreviation }, timezones[abbreviation]);
  }));
});

app.get('/api/timezones/:timezone', function (req, res) {
  if (!(req.params.timezone in timezones)) {
    res.status(404).send({ error: 'Timezone not found' });
    return;
  }
  res.send({ timezone: timezones[req.params.timezone]});
});

app.use(function (error, req, res, next) {
  console.log(error);
  if (res.headersSent) {
    next(error);
    return;
  }
  res.status(500).send({ error: 'Internal server error'});
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening on port ' + port);
});
