$.namespace('localemaps.admin');

localemaps.admin.UsersPage = function(users) {
  var self = this;
  this.users_ = new localemaps.model.Users();
  if (users && users.length) {
    for (i = 0; i < users.length; i++) {
      this.users_.add(users[i]);
    }
  }
  soy.renderElement(
    $('#users-container').get(0),
    localemaps.templates.users,
    {
      users: this.users_.toJSON()
    });
};