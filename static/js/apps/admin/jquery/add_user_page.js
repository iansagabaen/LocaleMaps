/**
 * @fileoverview Defines an AddUserPage class that manages the UI for
 *   adding a user on the localemaps.com admin site.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.admin');

/**
 * Constructs an AddUserPage instance, manages the UI for
 *   adding a user on the localemaps.com admin site.
 * @constructor
 */
localemaps.admin.AddUserPage = function() {
  /**
   * Wrapper around the #user-form-container element.
   * @type {localemaps.admin.UserFormView}
   * @private
   */
  this.userFormView_ = new localemaps.admin.UserFormView({
    actionUrl: '/users/create',
    el: $('#user-form-container')
  });
  this.userFormView_.render();
};
