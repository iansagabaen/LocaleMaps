$.namespace('localemaps.admin');

localemaps.admin.GuestHomePage = function() {
  var alertNode = $('.alert');
  if (alertNode.length) {
    alertNode.alert();
    alertNode.find('.close').on('click', function() {
      alertNode.alert('close');
    });
  }
};