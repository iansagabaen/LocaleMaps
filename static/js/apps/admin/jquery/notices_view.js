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

localemaps.admin.NoticesView = localemaps.admin.BaseTableListView.extend({
  events: $.extend({
      'change .description': 'handleDescriptionChange_',
      'change .end-date': 'handleEndChange_',
      'change .start-date': 'handleStartChange_'
    },
    localemaps.admin.BaseTableListView.EVENTS
  ),
  addRow: function(e) {
    var fragment = $(soy.renderAsFragment(
          localemaps.templates.noticeRowFragment,
          {
            notice: false
          })),
        notice = new localemaps.model.Notice(),
        tr = fragment.find(TR);
    notice.set(
      {
        end: new Date(),
        start: new Date()
      },
      SILENT_UPDATE);
    this.collection.add(notice);
    tr.attr(DATA_LM_ID, notice.cid);
    tr.addClass(EDIT_MODE);
    tr.addClass(NEW);
    this.$el.find('.notices').append(tr);
  },
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
  handleDescriptionChange_: function(e) {
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target),
        modelData;
    modelData = {
      description: target.val()
    };
    metadata.model.set(modelData, SILENT_UPDATE);
  },
  handleEndChange_: function(e) {
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target),
        modelData;
    modelData = {
      end: target.val()
    };
    metadata.model.set(modelData, SILENT_UPDATE);
  },
  handleStartChange_: function(e) {
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target),
        modelData;
    modelData = {
      start: target.val()
    };
    metadata.model.set(modelData, SILENT_UPDATE);
  },
  updateReadOnlyMode_: function(tr, model) {
    var startNode = tr.find('.start-col ' + READ_ONLY),
        endNode = tr.find('.end-col ' + READ_ONLY),
        descriptionNode = tr.find('.description-col ' + READ_ONLY);
    startNode.html(model.get('start'));
    endNode.html(model.get('end'));
    descriptionNode.html(model.get('description'));
  },
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