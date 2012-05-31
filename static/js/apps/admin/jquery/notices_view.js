/**
 * @fileoverview Defines a NoticesView class that manages displaying
 *   a list of notices.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.admin');

/** @define {string} */
var DATA_LM_ID = 'data-lm-id';
/** @define {string} */
var EDIT_MODE = 'edit-mode';
/** @define {string} */
var HIDE = 'hide';
/** @define {string} */
var HIDDEN = 'hidden';
/** @define {string} */
var NEW = 'new';
/** @define {string} */
var READ_ONLY = '.read-only';
/** @define {string} */
var SHOW = 'show';
/** @define {Object} */
var SILENT_UPDATE = { silent: true };
/** @define {string} */
var TR = 'tr';

/**
 * Constructs a NoticesView class that manages displaying a list of notices.
 * @extends {localemaps.admin.BaseTableListView}
 * @constructor
 */
localemaps.admin.NoticesView = localemaps.admin.BaseTableListView.extend({
  events: $.extend({
      'change .description': 'handleDescriptionChange_',
      'change .end-date': 'handleEndChange_',
      'change .start-date': 'handleStartChange_'
    },
    localemaps.admin.BaseTableListView.EVENTS
  ),
  /**
   * Adds a row to the notices table.
   * @param {Object} e Event object
   */
  addRow: function(e) {
    // Create a Notice model with the start date set to today.  Then create
    // a new 'tr' and add it to the table.
    var startDate = new Date(),
        startDateStr = (startDate.getMonth() + 1) + '/' +
                       startDate.getDate() + '/' +
                       startDate.getFullYear(),
        fragment = $(soy.renderAsFragment(
          localemaps.templates.noticeRowFragment,
          {
            notice: false,
            startDate: startDateStr
          })),
        notice = new localemaps.model.Notice(),
        tr = fragment.find(TR);
    notice.set(
      {
        start: startDateStr
      },
      SILENT_UPDATE);
    this.collection.add(notice);
    tr.attr(DATA_LM_ID, notice.cid);
    tr.addClass(EDIT_MODE);
    tr.addClass(NEW);
    this.$el.find('.notices').append(tr);
  },
  /**
   * Initializes the view.  See http://backbonejs.org/#View-constructor
   * @param {Object} options This can be referred to via this.options from
   *   within the view.
   */
  initialize: function(options) {
    var self = this;
    this.deleteConfirmBody_ = 'Are you sure you want to delete this notice?';
    this.inlineEdit_ = options.inlineEdit;
    this.localeId_ = options.localeId;
    this.urls_ = {
      createUrl: '/notices/create',
      deleteUrl: '/notices/delete/',
      updateUrl: '/notices/update/'
    };
  },
  /**
   * Renders the view using the model data.  See http://backbonejs.org/#View-render
   */
  render: function() {
    soy.renderElement(
      this.$el.get(0),
      localemaps.templates.notices,
      {
        localeId: this.localeId_,
        notices: this.collection.toJSON()
      });
    this.errorAlert_ = this.$el.find('.alert-error').alert();
    this.successAlert_ = this.$el.find('.alert-success').alert();
    this.initConfirmModal_();
  },
  /**
   * Creates a querystring useful for form submission out of a given
   * Backbone model.
   * @param {Backbone.Model} model The model to inspect.
   * @protected
   */
  createFormData_: function(model) {
    var formData = [],
        localeId = this.$el.find('.notices').attr('data-lm-locale-id');
    formData.push('localeId=');
    formData.push(localeId);
    formData.push('&start=');
    formData.push(model.get('start'));
    formData.push('&end=');
    formData.push(model.get('end'));
    formData.push('&description=');
    formData.push(model.get('description'));
    return formData.join('');
  },
  /**
   * For a given 'tr', handles change event for the 'description' textarea.
   * @private
   */
  handleDescriptionChange_: function(e) {
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target),
        modelData;
    modelData = {
      description: target.val()
    };
    metadata.model.set(modelData, SILENT_UPDATE);
  },
  /**
   * For a given 'tr', handles change event for the 'end date' input.
   * @param {Object} e Event object
   * @private
   */
  handleEndChange_: function(e) {
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target),
        modelData;
    modelData = {
      end: target.val()
    };
    metadata.model.set(modelData, SILENT_UPDATE);
  },
  /**
   * For a given 'tr', handles change event for the 'start date' input.
   * @param {Object} e Event object
   * @private
   */
  handleStartChange_: function(e) {
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target),
        modelData;
    modelData = {
      start: target.val()
    };
    metadata.model.set(modelData, SILENT_UPDATE);
  },
  /**
   * Updates the DOM elements that are shown for a 'tr' in read-only
   * mode (ie. all elements with class .read-only).
   * @param {Element} tr The 'tr' whose elements will be modified.
   * @param {Backbone.Model} model The model whose data will be used for
   *   the update.
   * @protected
   */
  updateReadOnlyMode_: function(tr, model) {
    var startNode = tr.find('.start-col ' + READ_ONLY),
        endNode = tr.find('.end-col ' + READ_ONLY),
        descriptionNode = tr.find('.description-col ' + READ_ONLY);
    startNode.html(model.get('start'));
    endNode.html(model.get('end'));
    descriptionNode.html(model.get('description'));
  },
  /**
   * This method is called before an async call is done to save a model.
   * @param {Backbone.Model} model
   * @return {boolean} true if the model's data is valid, and false otherwise.
   * @protected
   */
  validate_: function(notice) {
    var description = notice.get('description');
    if (!description || !description.length) {
      var message = 'Please enter description for this notice.';
      this.displayErrorMessage_(message);
      return false;
    }
    return true;
  }
});