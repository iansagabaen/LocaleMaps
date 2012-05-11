$.namespace('localemaps.admin');

var ACTIVE = 'active';

localemaps.admin.EditSelfPage = function(user) {
  var self = this,
      tabs = $('#edit-self-tabs'),
      i;
  tabs.tab('show');
  tabs.find('li:nth-child(1)').addClass(ACTIVE);
  $('.tab-content div:nth-child(1)').addClass(ACTIVE);
  user = user.User;
  this.user_ = new localemaps.model.User();
  this.user_.set(user);
  this.userFormView_ = new localemaps.admin.UserFormView({
    actionUrl: '/users/update/' + user.id,
    el: $('#profile'),
    isEditingSelf: true,
    model: this.user_
  });
  this.userFormView_.render();
  this.userPasswordFormView_ = new localemaps.admin.UserPasswordFormView({
    el: $('#password-container'),
    isEditingSelf: true,
    model: this.user_
  });
  this.userPasswordFormView_.render();
};