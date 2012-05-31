/**
 * @fileoverview Defines an EditUserPage class that manages the UI for
 *   editing a user's profile on the localemaps.com admin site.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.admin');

/**
 * Constructs an EditUserPage instance that manages the UI for
 *   editing a user's profile on the localemaps.com admin site.
 *   To see how the parameters are rendered, see
 *   /web/admin/Controller/UserController.php - edit()
 * @param {Object} user User data
 * @constructor
 */
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