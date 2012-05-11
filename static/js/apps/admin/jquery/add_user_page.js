$.namespace('localemaps.admin');

localemaps.admin.AddUserPage = function() {
  this.userFormView_ = new localemaps.admin.UserFormView({
    actionUrl: '/users/create',
    el: $('#user-form-container')
  });
  this.userFormView_.render();
};
