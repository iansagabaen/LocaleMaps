<?php
App::uses('BaseNavFilterBehavior', 'Model/Behavior');
class NavDropdownFilterBehavior extends BaseNavFilterBehavior {
  public function afterFind(&$model, $results, $primary) {
    if (is_null($results) ||
        count($results) == 0 ||
        (array_key_exists(0, $results) && !array_key_exists('NavItem', $results[0]))
      ) {
      return $results;
    }
    // Do depth-first search - at each visited node, set the label to be of
    // the format [Parent]/[Child] (ex. "Americas/Northern California").
    // A node is considered a leaf if it has either no children, or has at
    // least one child that is a locale.
    $collapsedResults = array();
    foreach ($results as $result) {
      $this->depthFirstTraversal($result, $collapsedResults);
    }
    return $collapsedResults;
  }

  private function depthFirstTraversal(&$node, &$visitedTree, $parentName = NULL) {
    $navItemObj = $node;
    if (!empty($node['NavItem'])) {
      $navItemObj = $node['NavItem'];
    }
    $nodeName = empty($parentName) ? 
      $navItemObj['name'] : $parentName . "\\" . $navItemObj['name'];
    $children = $node['NavItemChildren'];
    $hasChildren = !empty($children);
    $firstChild = $hasChildren ? $children[0] : NULL;
    $isDistrict = (!$hasChildren) || (!empty($firstChild['locale_id']));
    if ($isDistrict) {
      $data = array(
        'id' => $navItemObj['id'],
        'level' => $navItemObj['level'],
        'name' => $nodeName
      );
      array_push($visitedTree, $data);
    }
    if ($hasChildren && empty($firstChild['locale_id'])) {
      foreach ($children as $child) {
        $this->depthFirstTraversal($child, $visitedTree, $nodeName);
      }
    }
  }
}
?>