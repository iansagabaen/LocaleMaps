/**
 * @fileoverview Defines a namespace() function.
 * @author Ryan Cruz (cruzryan@gmail.com)
 */


/**
 * Root namespace.
 * @const
 * @type {Object}
 */
var localemaps = {};

/**
 * Creates specified namespaces.
 * @param {...string} var_args Any number of namespaces to create.  Each
 *   namespace is of the form 'a.b.c'.
 */
$.namespace = function(name) {
  var a = arguments, o = null, i, j, d;
  for (i = 0; i < a.length; i++) {
    d = (a[i]).split('.');
    o = localemaps;
    for ( j = (d[0] == 'localemaps') ? 1 : 0; j < d.length; j++) {
      o[d[j]] = o[d[j]] || {};
      o = o[d[j]];
    }
  }
  return o;
};