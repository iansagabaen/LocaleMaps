/**
 * @fileoverview Defines an GlobalNavTreeView class, a Backbone view
 *   that wraps around a tree view of the global nav for localemaps.com
 * @author Ryan Cruz (cruzryan@gmail.com)
 */

$.namespace('localemaps.admin');

/**
 * Constructs a GlobalNavTreeView instance, a Backbone view
 *   that wraps around a tree view of the global nav for localemaps.com
 * @extends {Backbone.View}
 * @constructor
 */
localemaps.admin.GlobalNavTreeView = Backbone.View.extend({
  /**
   * Initializes the view.  See http://backbonejs.org/#View-constructor
   * @param {Object} options This can be referred to via this.options from
   *   within the view.
   */
  initialize: function(options) {
  },
  /**
   * Renders the view using the model data.  See
   * http://backbonejs.org/#View-render
   */
  render: function() {
    var self = this;
    this.$el.tree({
      autoOpen: false,
      data: this.collection.toJSON(),
      selectable: true
    });
    this.$el.on(
      'tree.open',
      function(e) {
        self.handleOpenTreeNode_(e);
      });
    this.$el.on(
      'tree.click',
      function(e) {
        self.handleClickTreeNode_(e);
      });
  },
  /**
   * Gets the children for a specified nav item and executes a callback.
   * @param {Number} parentId ID of the parent node.
   * @param {Array.<Object>} nodes List of nav items to load as children of
   *   the specified parent node.
   */
  loadChildNodes: function(parentId, nodes) {
    if (parentId) {
      var parent = this.$el.tree('getNodeById', parentId);
      parent.children = [];
      this.$el.tree('loadData', nodes, parent);
    } else {
      this.collection.reset();
      this.collection.add(nodes);
      this.$el.tree('loadData', nodes);
    }
  },
  /**
   * Handles click event on an individual tree node.
   * @param {Object} e Event object, with a 'node' property.
   * @private
   */
  handleClickTreeNode_: function(e) {
    var node = e.node,
        navItem = this.collection.get(node.id);
    this.trigger(node.locale_id ?
                   localemaps.event.NAV_LOCALE_SELECTED :
                   localemaps.event.NAV_DISTRICT_SELECTED,
                 navItem);
  },
  /**
   * Handles expanding a node in the tree view.
   * @param {Object} e Event object, with a 'node' property.
   * @private
   */
  handleOpenTreeNode_: function(e) {
    var node = e.node,
        isEmptyDistrictNode = node.children &&
                              node.children.length &&
                              node.children[0].name === '';
    if (isEmptyDistrictNode) {
      var navItem = this.collection.get(node.id),
          self = this;
      navItem.fetch({
        success: function(collection, response) {
          var children = response && response.data && response.data.children,
              i, child, model;
          // If there are child nodes that come back, add them to the navItem
          // as children, and add each node to the collection, or update it
          // if it exists already.  The load the nodes into the tree.
          if (children && children.length) {
            navItem.set('children', children);
            for (var i = 0; i < children.length; i++) {
              child = children[i];
              model = self.collection.get(child.id);
              if (model) {
                model.set(child);
              } else {
                self.collection.add(child);
              }
            }
            self.loadChildNodes(node.id, children);
          }
        }
      });
    }
  }
});