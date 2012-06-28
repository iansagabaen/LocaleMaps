/**
 * @fileoverview Defines an GlobalNavHomePage class that manages the page in
 *   charge of administering data for the global nav on localemaps.com
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.admin');

/** @define {string} */
var DISABLED = 'disabled';
/** @define {string} */
var HIDDEN = 'hidden';
/** @define {string} */
var ID = 'id';
/** @define {string} */
var NAV_ITEM_ID = '.nav-item-id';
/** @define {string} */
var NAV_ITEM_TYPE = '.nav-item-type';

/**
 * Constructs a GlobalNavPage instance that manages the page in
 *   charge of administering data for the global nav on localemaps.com
 * @param {Array.<Object>} navItems List of nav items.  See
 *   /web/admin/Controller/NavController.php - index()
 * @param {Array.<Object>} locales List of locales.  See
 *   /web/admin/Controller/NavController.php - index()
 * @constructor
 */
localemaps.admin.GlobalNavPage = function(navItems, locales) {
  var self = this;
  this.navItems_ = new localemaps.model.NavItems();
  if (navItems && navItems.length) {
    this.navItems_.add(navItems);
  }
  this.treeView_ = new localemaps.admin.GlobalNavTreeView({
    collection: this.navItems_,
    el: $('#nav-tree')
  });
  this.treeView_.render();
  this.treeView_.bind(
    localemaps.event.NAV_DISTRICT_SELECTED,
    function(navItem) {
      self.localeFormView_.setVisible(false);
      self.districtFormView_.setVisible(navItem);
    });
  this.treeView_.bind(
    localemaps.event.NAV_LOCALE_SELECTED,
    function(navItem) {
      self.districtFormView_.setVisible(false);
      self.localeFormView_.setVisible(navItem);
    });
  this.districtFormView_ = new localemaps.admin.GlobalNavDistrictFormView({
    el: $('.district-container'),
    template: localemaps.templates.districtNavForm
  });
  this.localeFormView_ = new localemaps.admin.GlobalNavLocaleFormView({
    el: $('.locale-container'),
    locales: locales,
    template: localemaps.templates.localeNavForm
  });
  this.districtFormView_.render();
  this.localeFormView_.render();
  this.localeFormView_.bind(
    localemaps.event.NAV_UPDATE_SUCCESS,
    function(data) {
      self.treeView_.loadChildNodes(data.parent_id, data.siblings);
    });
  this.districtFormView_.bind(
    localemaps.event.NAV_UPDATE_SUCCESS,
    function(data) {
      // Add siblings of the updated node to the collection (or update them
      // if they exist), then load the siblings into the tree.
      var navItem, sibling;
      for (var i = 0; i < data.siblings.length; i++) {
        sibling = data.siblings[i];
        navItem = self.navItems_.get(sibling.id);
        if (navItem) {
          navItem.set(sibling);
        } else {
          self.navItems_.add(sibling);
        }
      }
      self.treeView_.loadChildNodes(data.parent_id, data.siblings);
    });
};