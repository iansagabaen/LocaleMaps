/**
 * @fileoverview Defines a UsersPage class that manages displaying
 *   the list of all users that can access the localemaps.com admin site
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.admin');

/**
 * Constructs a UsersPage class that manages displaying
 *   the list of all users that can access the localemaps.com admin site.
 *   See /web/admin/Controller/UserController.php - index() for how the
 *   parameters are formatted.
 * @param {Array.<Object>} users List of users
 * @constructor
 */
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