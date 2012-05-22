/**
 * @fileoverview Defines a ServicesView Backbone view that wraps a table of
 *   worship services.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */
 
$.namespace('localemaps.admin');

/** @define {string} */
var DAY_OF_WEEK = 'day_of_week';
/** @define {string} */
var DATA_LM_ID = 'data-lm-id';
/** @define {string} */
var EDIT_MODE = 'edit-mode';
/** @define {string} */
var HIDDEN = 'hidden';
/** @define {string} */
var LANGUAGE = 'language';
/** @define {string} */
var OPTION_SELECTED = 'option:selected';
/** @define {string} */
var SCHEDULE = 'schedule';
/** @define {Object} */
var SILENT_UPDATE = { silent: true };
/** @define {RegExp} */
var TIME_12_HR_EXPR = /(1[012]|[1-9]):[0-5][0-9](\\s)?(am|pm)/i;
/** @define {RegExp} */
var TIME_24_HR_EXPR = /([01]?[0-9]|2[0-3]):[0-5][0-9]/;
/** @define {string} */
var TR = 'tr';

/**
 * Wrapper around a table of worship services.
 * @constructor
 * @extends {Backbone.View}
 */
localemaps.admin.ServicesView = localemaps.admin.BaseTableListView.extend({
  events: $.extend({
      'change .day-of-week': 'handleDayOfWeekChange_',
      'change .language': 'handleLanguageChange_',
      'click .cws': 'handleCwsClick_',
      'keyup .schedule': 'handleScheduleChange_'
    },
    localemaps.admin.BaseTableListView.EVENTS
  ),
  addRow: function(e) {
    var fragment = $(soy.renderAsFragment(
          localemaps.templates.serviceRowFragment,
          {
            daysOfWeek: this.daysOfWeek_,
            languages: this.languages_,
            service: false
          })),
        service = new localemaps.model.Service(),
        tr = fragment.find(TR),
        dayOfWeekSel = tr.find('.day-of-week-col .day-of-week');
    service.set(
      {
        cws: false,
        day_of_week: {
          description: dayOfWeekSel.find(OPTION_SELECTED).text(),
          value: dayOfWeekSel.val()
        }
      },
      SILENT_UPDATE);
    this.collection.add(service);
    tr.attr(DATA_LM_ID, service.cid);
    tr.addClass(EDIT_MODE);
    tr.addClass(NEW);
    this.$el.find('.services').append(tr);
  },
  initialize: function(options) {
    var self = this;
    this.daysOfWeek_ = options.daysOfWeek;
    this.deleteConfirmBody_ = 'Are you sure you want to delete this service?';
    this.languages_ = options.languages;
    this.localeId_ = options.localeId;
    this.urls_ = {
      createUrl: '/services/create',
      deleteUrl: '/services/delete/',
      updateUrl: '/services/update/'
    };
  },
  render: function() {
    soy.renderElement(
      this.$el.get(0),
      localemaps.templates.services,
      {
        daysOfWeek: this.daysOfWeek_,
        languages: this.languages_,
        localeId: this.localeId_,
        services: this.collection.toJSON()
      });
    this.errorAlert_ = this.$el.find('.alert-error').alert();
    this.successAlert_ = this.$el.find('.alert-success').alert();
    this.initConfirmModal_();
  },
  createFormData_: function(model) {
    var formData = [],
        localeId = this.$el.find('.services').attr('data-lm-locale-id');
    formData.push('localeId=');
    formData.push(localeId);
    formData.push('&day_of_week=');
    formData.push(model.get('day_of_week').value);
    formData.push('&schedule=');
    formData.push(escape(model.get('schedule') || ''));
    if (model.get('cws')) {
      formData.push('&cws=');
      formData.push(model.get('cws'));
    }
    var language = model.get('language');
    if (language && language.code) {
      formData.push('&language=');
      formData.push(language.code);
    }
    return formData.join('');
  },
  handleCwsClick_: function(e) {
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target),
        modelData;
    modelData = {
      cws: target.is(':checked')
    };
    metadata.model.set(modelData, SILENT_UPDATE);
  },
  handleDayOfWeekChange_: function(e) {
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target),
        modelData;
    modelData = {
      day_of_week: {
        description: target.find(OPTION_SELECTED).text(),
        value: target.val()
      }
    };
    metadata.model.set(modelData, SILENT_UPDATE);
  },
  handleLanguageChange_: function(e) {
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target),
        modelData;
    modelData = {
      language: {
        code: target.val(),
        description: target.find(OPTION_SELECTED).text()
      }
    };
    metadata.model.set(modelData, SILENT_UPDATE);
  },
  handleScheduleChange_: function(e) {
    var target = $(e.target),
        metadata = this.getMetadataForRow_(target),
        modelData;
    modelData = {
      schedule: target.val()
    };
    metadata.model.set(modelData, SILENT_UPDATE);
  },
  updateReadOnlyMode_: function(tr, model) {
    var dayOfWeekNode = tr.find('.day-of-week-col ' + READ_ONLY),
        scheduleNode = tr.find('.schedule-col ' + READ_ONLY),
        languageNode = tr.find('.language-col ' + READ_ONLY),
        cwsNode = tr.find('.cws-col ' + READ_ONLY);
    dayOfWeekNode.html(model.get(DAY_OF_WEEK).description);
    scheduleNode.html(model.get(SCHEDULE));
    if (model.get(LANGUAGE)) {
      languageNode.html(model.get(LANGUAGE).description);
    }
    if (model.get('cws')) {
      cwsNode.removeClass(HIDDEN);
    } else {
      cwsNode.addClass(HIDDEN);
    }
  },
  validate_: function(service) {
    var schedule = service.get('schedule');
    if (TIME_12_HR_EXPR.test(schedule) || TIME_24_HR_EXPR.test(schedule)) {
      return true;
    } else {
      var message = (schedule && schedule.length) ? 
        schedule + ' is not a valid schedule.' :
        'You need to enter a schedule.';
      this.displayErrorMessage_(message);
      return false;
    }
  }
});
