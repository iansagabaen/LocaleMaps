<?php
App::uses("Sanitize", "Utility");

class WwwActionsController extends AppController {
  public $components = array('RequestHandler');
  public $helpers = array('Html');
  public $name = 'WwwActions';
  public $uses = array();

  private static function formatTimestamp($timestamp) {
    $formatted = strtotime($timestamp);
    $formatted = ($formatted > 0) ?
      strftime('%d-%b-%Y %l:%M %p', $formatted) :
      NULL;
    return $formatted;
  }

  function get_locale($id) {
    $this->loadModel('Locale');
    $this->loadModel('Event');
    $this->loadModel('Notice');
    $this->Event->Behaviors->attach('EventsFilter', array());
    $this->Notice->Behaviors->attach('NoticesFilter', array());
    $locale = $this->Locale->find(
      'first',
      array(
        'conditions' => array(
          'Locale.localeid' => $id
        )
      ));
    $locale = $locale['Locale'];
    $addressFull = array();
    if (!empty($locale['address1'])) {
      array_push($addressFull, $locale['address1']);
    }
    if (!empty($locale['city'])) {
      array_push($addressFull, $locale['city']);
    }
    if (!empty($locale['state'])) {
      array_push($addressFull, $locale['state']);
    }
    if (!empty($locale['zip'])) {
      array_push($addressFull, $locale['zip']);
    }
    $services = $this->Event->find(
      'all',
      array(
        'conditions' => array(
          'locale_id' => $id,
          'type' => $this->Event->eventType['SERVICE']
        )
      ));
    $todayTimestamp = intval(intval($this->request->query['t']) / 1000);
    $today = date('Y-m-d', $todayTimestamp);
    $notices = $this->Notice->find(
      'all',
      array(
        'conditions' => array(
          'end >' => $today,
          'locale_id' => $id,
          'start <=' => $today
        ),
        'fields' => array(
          'description'
        )
      ));
    $timestamp = self::formatTimestamp($locale['timestamp']);
    $this->set(array(
      'address' => $locale['address1'],
      'address2' => $locale['address2'],
      'addressFull' => implode(" ", $addressFull),
      'city' => $locale['city'],
      'email' => $locale['emailcontact'],
      'id' => $locale['localeid'],
      'isComplete' => true,
      'latitude' => $locale['latitude'],
      'longitude' => $locale['longitude'],
      'name' => $locale['name'],
      'state' => $locale['state'],
      'tel' => $locale['contact'],
      'timestamp' => $timestamp,
      'zip' => $locale['zip'],
      'notices' => (!empty($notices)) ? $notices : NULL,
      'services' => (!empty($services)) ? $services : NULL
    ));
    $this->viewClass = 'Json';
    $this->set(
      '_serialize',
      array(
        'address',
        'address2',
        'addressFull',
        'city',
        'email',
        'id',
        'isComplete',
        'latitude',
        'longitude',
        'name',
        'state',
        'tel',
        'timestamp',
        'zip',
        'notices',
        'services'));
  }
  
  function get_nav_items($parentId) {
    $this->loadModel('NavItem');
    $this->NavItem->unbindModel(array('hasMany' => array('NavItemChildren')));
    $this->NavItem->unbindModel(array('belongsTo' => array('NavItemParent')));
    $criteria = array(
      'conditions' => array(
        'parent_id' => $parentId
      ),
      'fields' => array(
        'id',
        'name',
        'ordinal'
      ),
      'order' => array('ordinal asc')
    );
    $navItems = $this->NavItem->find('all', $criteria);
    $this->set(
      array(
        'nav' => $navItems
      ));
    $this->viewClass = 'Json';
    $this->set(
      '_serialize',
      array(
        'nav'
      ));
  }

  function index() {
    $this->loadModel('Locale');
    $this->loadModel('NavItem');
    $this->NavItem->unbindModel(array('hasMany' => array('NavItemChildren')));
    $this->NavItem->unbindModel(array('belongsTo' => array('NavItemParent')));
    $criteria = array(
      'fields' => array(
        'Locale.localeid as id',
        'Locale.latitude as gla',
        'Locale.longitude as gln'));
    $locales = $this->Locale->find('all', $criteria);
    $criteria = array(
      'conditions' => array(
        'level = ' => 0
      ),
      'fields' => array(
        'id',
        'name',
        'ordinal'
      ),
      'order' => array('ordinal asc')
    );
    $globalNav = $this->NavItem->find('all', $criteria);

    $this->layout = 'www';
    $this->set(array(
      'locales' => json_encode($locales),
      'globalNav' => json_encode($globalNav),
      'title_for_layout' => 'Locale Maps: Find a congregation near you!'));
    $this->render('home');
  }

  function search() {
    // Get the locales according to the query.  Add filters if they exist.
    // For each locale, get its list of services, and add it to the locale
    // object.
    // TODO(rcruz): Optimize this query.
    $results = array();
    $this->loadModel('Locale');
    $this->loadModel('Event');
    $urlParams = $this->params['url'];
    $rawQuery = $urlParams['q'];
    $query = Sanitize::escape($rawQuery);
    $filters = array();
    if (array_key_exists('d', $urlParams)) {
      $dayFiltersValue = $urlParams['d'];
      if (is_numeric($dayFiltersValue)) {
        $dayFiltersValue = (int)$dayFiltersValue;
        $filters['day'] = $dayFiltersValue;
      }
    }
    if (array_key_exists('t', $urlParams)) {
      $timeFiltersValue = $urlParams['t'];
      if (is_numeric($timeFiltersValue)) {
        $timeFiltersValue = (int)$timeFiltersValue;
        $filters['time'] = $timeFiltersValue;
      }
    }
    $hasFilters = !(empty($filters));
    $this->Event->Behaviors->attach('EventsFilter', $filters);
    $table = $this->Locale->useTable;
    $filteredLocales = array();
    $locales = $this->Locale->query("select localeid as id, name, address1 as address, address2, city, state, zip, latitude, longitude, emailcontact as email, contact as tel, timestamp from $table where match (name, country, full_state, city, address1, zip) against ('$query')");
    foreach ($locales as $locale) {
      $locale = $locale['locale'];
      $locale['timestamp'] = self::formatTimestamp($locale['timestamp']);
      $services = $this->Event->find(
        'all',
        array(
          'conditions' => array(
            'locale_id' => $locale['id'],
            'type' => $this->Event->eventType['SERVICE']
          )
        ));

      // Include the locale in the results if no filters are applied, or if
      // there are filters, we have at least one service passing the filters.
      $includeLocale = !($hasFilters) || ($hasFilters && !(empty($services)));
      if ($includeLocale) {
        $locale['latitude'] = floatval($locale['latitude']);
        $locale['longitude'] = floatval($locale['longitude']);
        if (!empty($services)) {
          $locale['services'] = $services;
        }
        $addressFull = array();
        if (!empty($locale['address'])) {
          array_push($addressFull, $locale['address']);
        }
        if (!empty($locale['city'])) {
          array_push($addressFull, $locale['city']);
        }
        if (!empty($locale['state'])) {
          array_push($addressFull, $locale['state']);
        }
        if (!empty($locale['zip'])) {
          array_push($addressFull, $locale['zip']);
        }
        $locale['addressFull'] = implode(' ', $addressFull);
        array_push($results, $locale);
      }
    }

    // Set the state of the filters based on the query passed in.
    $searchFilters = $this->Components->load('SearchFilters');
    $dayFilters = $searchFilters->getDayFilters();
    if (array_key_exists('d', $this->params['url'])) {
      $dayFiltersValue = $this->params['url']['d'];
      if (is_numeric($dayFiltersValue)) {
        $dayFiltersValue = (int)$dayFiltersValue;
        foreach ($dayFilters as &$filter) {
          $filter['enabled'] = (bool)($filter['value'] & $dayFiltersValue);
        }
      }
    }
    $timeFilters = $searchFilters->getTimeFilters();
    if (array_key_exists('t', $this->params['url'])) {
      $timeFiltersValue = $this->params['url']['t'];
      if (is_numeric($timeFiltersValue)) {
        $timeFiltersValue = (int)$timeFiltersValue;
        foreach ($timeFilters as &$filter) {
          $filter['enabled'] = (bool)($filter['value'] & $timeFiltersValue);
        }
      }
    }

    // Return the results.
    $this->set(array(
      'query' => Sanitize::html($rawQuery),
      'filters' => array(
        'day_of_week' => $dayFilters,
        'time' => $timeFilters
      ),
      'timestamp' => time(),
      'results' => $results
    ));
    $this->viewClass = 'Json';
    $this->set(
      '_serialize',
      array(
        'query',
        'filters',
        'timestamp',
        'results'));
  }
}
?>