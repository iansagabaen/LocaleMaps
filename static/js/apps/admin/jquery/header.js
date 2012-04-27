$.namespace('localemaps.admin');

localemaps.admin.Header = function() {
  $('.dropdown-toggle').dropdown();
};

$(document).ready(function() {
  new localemaps.admin.Header();
});