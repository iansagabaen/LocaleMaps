//(function() {
var DAY_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
var LANGUAGE = [
  '',
  'English',
  'Tagalog'
];

function FormProcessor() {
  var locAddForm = $('form[name="loc_add"]');
  locAddForm.submit(function(e) {
    // Parse times table and set hidden input field as JSON: an array of
    // objects with the following properties:
    // day - int [0,6]
    // time - string
    // cws - boolean
    // language - string
    // TODO(rcruz): Add validation.
    var rows = $('table.times tr').has('td'),
        numRows = rows.length,
        row,
        day,
        time,
        isCws,
        language,
        times = [];
    for (var i = 0; i < numRows; i++) {
      row = $(rows[i]);
      day = row.find('select.day-of-week').val();
      time = row.find('input.schedule').val();
      isCws = row.find('input.cws').is(':checked');
      language = row.find('select.language').val();
      times.push({
        "day": day,
        "time": time,
        "cws": isCws,
        "language": language
      });
    }
    locAddForm.find('#Times').val(JSON.stringify(times));
  });

  // When clicking 'Add', add a row to the Times table.
  var timesTable = $('table.times');
  $('a.add-event').click(function(e) {
    e.preventDefault();
    timesTable = $('table.times');
    timesTable.html(timesTable.html() + createServiceRow());
  });
  timesTable.click(function(e) {
    var target = $(e.target);
    if (target.hasClass('delete')) {
      e.preventDefault();
      var tr = target.closest('tr');
      tr.remove();
    }
  });
};

function createServiceRow() {
  var result = ['<tr>'];
  result.push('<td><select class="day-of-week">');
  for (var i = 0; i < DAY_OF_WEEK.length; i++) {
    result.push('<option value="' + i + '">' +
      DAY_OF_WEEK[i] + '</option>');
  }
  result.push('</select></td>');

  result.push('<td><input class="schedule" placeholder="9:00 AM" type="text"></td>');
  result.push('<td><label><input class="cws" type="checkbox"> CWS</label></td>');

  result.push('<td><select class="language">');
  for (var i = 0; i < LANGUAGE.length; i++) {
    var value = LANGUAGE[i];
    result.push('<option value="' + value + '">' + value + '</option>');
  }
  result.push('</select></td>');
  result.push('<td><a class="delete" href="#">X</a></td>');

  result.push('</tr>');
  return result.join('');
};

function getAncestorByTagName(descendant, tagName) {
  var parent = $(descendant).parent();
  if (parent) {
    if (parent[0].tagName.toLowerCase() == tagName) {
      return $(parent);
    }
    return getAncestorByTagName(parent, tagName);
  }
  return null;
};

new FormProcessor();
//})();