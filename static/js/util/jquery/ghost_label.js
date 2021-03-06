/**
 * @fileoverview Defines a GhostLabel class, which emulates the 'placeholder'
 *   attribute for 'input' elements in HTML5.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps');

/** @define {string} */
var EMPTY = '';
/** @define {string} Class name for ghost label */
var GHOST_CLASS = 'lm-ghost';

/**
 * Constructs a GhostLabel instance.  The ghost text will appear if the element
 * is empty.  For styling, apply rules to the 'lm-ghost' style.  Default
 * styling is available in /static/css/util/ghost_label.css.
 * @param {Element} elt The element to apply the ghost label to.  This should
 *   be either an 'input' or 'textarea'.
 * @param {string} ghostText The ghost text to apply.
 * @constructor
 */
localemaps.GhostLabel = function(elt, ghostText) {
  /**
   * The element to apply the ghost label to.
   * @type {Element}
   * @private
   */
  this.elt_ = elt;

  /**
   * The ghost text.
   * @type {string}
   * @private
   */
  this.ghostText_ = ghostText;

  // Add focus/blur event handling on the elt.
  var self = this;
  this.elt_.on(
    'blur',
    function(e) {
      e.preventDefault();
      self.handleBlur_();
    });
  this.elt_.on(
    'focus',
    function(e) {
      e.preventDefault();
      self.handleFocus_();
    });
  this.handleBlur_();
};

/**
 * Handles the blur event on elt.
 * @private
 */
localemaps.GhostLabel.prototype.handleBlur_ = function() {
  // If elt is empty, add the ghost class and ghost text.
  if (this.elt_.val() == EMPTY) {
    this.elt_.addClass(GHOST_CLASS);
    this.elt_.val(this.ghostText_);
  }
};

/**
 * Handles the focus event on elt.
 * @private
 */
localemaps.GhostLabel.prototype.handleFocus_ = function() {
  // If the elt has the ghost text and ghost class, set elt to empty, and
  // remove the ghost class.
  if (this.elt_.val() == this.ghostText_ &&
      this.elt_.hasClass(GHOST_CLASS)) {
    this.elt_.removeClass(GHOST_CLASS);
    this.elt_.val(EMPTY);
  }
};