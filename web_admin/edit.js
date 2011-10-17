//(function() {
var DAY_OF_WEEK = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
};
var LANGUAGE = [
  '',
  'English',
  'Tagalog'
];

function FormProcessor() {
  var locAddForm = $('form[name="loc_add"]');
  locAddForm.click(function(e) {
    // TODO(rcruz): Implement delete service logic.
  });
  locAddForm.submit(function(e) {
    
  });
  $('a.add-event').click(function(e) {
    timesTable = $('table.times');
    timesTable.append(createServiceRow());
  });
};

function createServiceRow() {
  var result = ['<tr>'];
  
  result.push('<td><select class="day-of-week">');
  for (var dayName in DAY_OF_WEEK) {
    result.push('<option value="' + DAY_OF_WEEK[dayName] + '">' +
      dayName + '</option>');
  }
  result.push('</select></td>');

  result.push('<td><input class="schedule" type="text"></td>');
  result.push('<td><input class="cws" type="checkbox"></td>');

  result.push('<td><select class="language">');
  for (var i = 0; i < LANGUAGE.length; i++) {
    var value = LANGUAGE[i];
    result.push('<option value="' + value + '">' + value + '</option>');
  }
  result.push('</select></td>');

  result.push('<td><a href="#" class="delete">X</a></td>');
  result.push('</tr>');
  return $(result.join(''));
};

new FormProcessor();
//})();
