/**
 * @fileoverview Defines custom events used throughout localemaps.com
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.event');

localemaps.event = {
  BOUNDS_CHANGED: 'bounds-changed',
  CLICK: 'click',
  CLICK_TRACKING: 'click-tracking',
  DELETE_SERVICE: 'delete-service',
  FILTER_CHANGE: 'filter-change',
  GEOCODE: 'geocode',
  HIDE: 'hide',
  SEARCH_SUCCESS: 'search-success',
  SHOW: 'show',
  SUBMIT: 'submit',
  UPDATE_LOCALE_SUCCESS: 'update-locale-success',
  ZOOM: 'zoom'
};