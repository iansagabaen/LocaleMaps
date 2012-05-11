$.namespace('localemaps.admin');

localemaps.admin.EditUserPage = function(user, message) {
  this.user_ = new localemaps.model.User();
  this.user_.set(user);
  this.userFormView_ = new localemaps.admin.UserFormView({
    actionUrl: '/users/update/' + user.User.id,
    el: $('#user-form-container'),
    message: message,
    model: this.user_
  });
  this.userFormView_.render();
};