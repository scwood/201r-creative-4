$(document).ready(function () {
  populateDropdowns();
  getCurrentTime();
  setInterval(getCurrentTime, 1000);
  $(".dropdown-menu").on('click', 'li a', function(){
    $(".btn:first-child").text($(this).text());
    $(".btn:first-child").val($(this).text());
  });

  function populateDropdowns() {
    var timezones = getTimezones()
      .then(function (response) {
        var result = '';
        response.forEach(function (timezone) {
          result += '<li>';
          result += '<a href="#" onclick=selectTimezone("' + timezone.abbreviation + '")>';
          result += timezone.name;
          result += '</a>';
          result  += '</li>';
        });
        $('.timezones').html(result);
      });
  }
});

var currentTimer = null;
function selectTimezone(abbreviation) {
  if (currentTimer !== null) {
    clearInterval(currentTimer)
  }
  currentTimer = setInterval(function () {
    getSingleTimezone(abbreviation)
      .then(function (response) {
        $('.date-time-span').html(' <strong>' + response.timezone.time + '</strong>')
        $('.offset-span').html('<strong>' + response.timezone.offset + '</strong>')
      })
  }, 1000)
}

function getTimezones() {
  return $.get('/api/timezones');
}

function getSingleTimezone(abbreviation) {
  return $.get('/api/timezones/' + abbreviation);
}

function getCurrentTime() {
  var date = new Date();
  $('.current-time').html(date);
}
