var express = require('express');
var path = require('path');
var timezones = require('./timezones.json').timezones;
var moment = require('moment');
var app = express();

app.use(express.static(path.resolve(path.join(__dirname, 'public'))));

app.get('/api/timezones', function (req, res) {
  res.send(Object.keys(timezones).map(function (abbreviation) {
    return Object.assign({}, { abbreviation: abbreviation }, timezones[abbreviation]);
  }));
});

app.get('/api/timezones/:abbreviation', function (req, res) {
  if (!(req.params.abbreviation in timezones)) {
    res.status(404).send({ error: 'Timezone not found' });
    return;
  }
  var timezone = timezones[req.params.abbreviation];
  timezone.time = moment.utc().utcOffset(timezone.offset).format('ddd MMM Do YYYY, h:mm a')
  res.send({ timezone: timezone });
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
