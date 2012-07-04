/**
 * @fileoverview Defines an GlobalNavDistrictFormView class, a Backbone view
 *   that wraps around form for editing global nav items for a district/region
 *   on localemaps.com
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
 * Constructs a GlobalNavDistrictFormView class, a Backbone view
 *   that wraps around a form for editing global nav items for a
 *   district/region on localemaps.com.
 * @extends {localemaps.admin.GlobalNavBaseFormView}
 * @constructor
 */
localemaps.admin.GlobalNavDistrictFormView =
  localemaps.admin.GlobalNavBaseFormView.extend({
  /**
   * Initializes the view.  See http://backbonejs.org/#View-constructor
   * @param {Object} options This can be referred to via this.options from
   *   within the view.
   */
  initialize: function(options) {
    this.template_ = options.template
  },
  /**
   * Displays or hides the element wrapped by the view.
   * @param {boolean|localemaps.model.NavItem} Set to false to hide the view, or
   *    pass in a NavItem instance to display the view, and set the form
   *    elements.
   */
  setVisible: function(navItem) {
    if (navItem === false) {
      this.$el.addClass(HIDDEN);
    } else {
      var navItemType = this.form_.find(NAV_ITEM_TYPE),
          id = navItem.get(ID),
          ordinal = navItem.get('ordinal');
      this.$el.removeClass(HIDDEN);
      this.form_.attr('action', '/nav/update/' + id);
      navItemType.val('0');
      navItemType.attr(DISABLED, DISABLED);
      this.form_.find('#nav-item-name').val(navItem.get('label'));
      this.form_.find('#nav-item-ordinal').val(ordinal);
      this.form_.find('.nav-item-ordinal-old').val(ordinal);
      this.form_.find(NAV_ITEM_ID).val(id);
      this.form_.find('.nav-item-parent-id').val(navItem.get('parent_id'));
      this.$el.find('.alert').addClass(HIDDEN);
    }
  }
});