<?php
App::import("Sanitize");

class WwwActionsController extends AppController {
  var $helpers = array("Html");
  var $name = "WwwActions";
  var $uses = array();

  private static $jsonAction = "json";
  private static $jsonHeader = "Content-Type: application/json";
  
  private static function formatTimestamp($timestamp) {
    $formatted = strtotime($timestamp);
    $formatted = ($formatted > 0) ?
      strftime('%d-%b-%Y %l:%M %p', $formatted) :
      NULL;
    return $formatted;
  }

  function get_locale($id) {
    $this->layout = "ajax";
    $this->loadModel("Locale");
    $this->loadModel("Event");
    $locale = $this->Locale->find(
      "first",
      array(
        "conditions" => array(
          "Locale.localeid = " => $id
        )
      ));
    $locale = $locale["Locale"];
    $addressFull = array();
    if (!empty($locale["address1"])) {
      array_push($addressFull, $locale["address1"]);
    }
    if (!empty($locale["city"])) {
      array_push($addressFull, $locale["city"]);
    }
    if (!empty($locale["state"])) {
      array_push($addressFull, $locale["state"]);
    }
    if (!empty($locale["zip"])) {
      array_push($addressFull, $locale["zip"]);
    }
    $services = $this->Event->find(
      'all',
      array(
        'conditions' => array(
          'locale_id' => $id,
          'type' => $this->Event->eventType['SERVICE']
        )
      ));
    $timestamp = self::formatTimestamp($locale["timestamp"]);
    $this->set(array(
      "results" => array(
        "address" => $locale["address1"],
        "address2" => $locale["address2"],
        "addressFull" => implode(" ", $addressFull),
        "city" => $locale["city"],
        "email" => $locale["emailcontact"],
        "id" => $locale["localeid"],
        "isComplete" => true,
        "latitude" => $locale["latitude"],
        "longitude" => $locale["longitude"],
        "name" => $locale["name"],
        "state" => $locale["state"],
        "tel" => $locale["contact"],
        "timestamp" => $timestamp,
        "zip" => $locale["zip"],
        "services" => (!empty($services)) ? $services : NULL
      )
    ));
    $this->header(self::$jsonHeader);
    $this->render(self::$jsonAction);
  }

  function index() {
    $this->loadModel("Locale");
    $criteria = array(
      "fields" => array(
        "Locale.localeid as id",
        "Locale.latitude as gla",
        "Locale.longitude as gln"));
    $locales = $this->Locale->find("all", $criteria);

    $this->layout = "www";
    $this->set(array(
      "locales" => json_encode($locales),
      "title_for_layout" => "Locale Maps: Find a congregation near you!"));
    $this->render("home");
  }

  function search() {
    // Get the locales according to the query.  For each locale, get its
    // list of services, and add it to the locale object.
    // TODO(rcruz): Optimize this query.
    $this->layout = "ajax";
    $results = array();
    $this->loadModel("Locale");
    $this->loadModel("Event");
    $rawQuery = $this->params["url"]["q"];
    $query = Sanitize::escape($rawQuery);
    $table = $this->Locale->useTable;
    $locales = $this->Locale->query("select localeid as id, name, address1 as address, address2, city, state, zip, latitude, longitude, emailcontact as email, contact as tel, timestamp from $table where match (name, country, full_state, city, address1, zip) against ('$query')");
    foreach ($locales as $locale) {
      $locale = $locale['locale'];
      $locale['timestamp'] = self::formatTimestamp($locale["timestamp"]);
      $services = $this->Event->find(
        'all',
        array(
          'conditions' => array(
            'locale_id' => $locale['id'],
            'type' => $this->Event->eventType['SERVICE']
          )
        ));
      $locale['latitude'] = floatval($locale['latitude']);
      $locale['longitude'] = floatval($locale['longitude']);
      if (!empty($services)) {
        $locale['services'] = $services;
      }
      $addressFull = array();
      if (!empty($locale["address"])) {
        array_push($addressFull, $locale["address"]);
      }
      if (!empty($locale["city"])) {
        array_push($addressFull, $locale["city"]);
      }
      if (!empty($locale["state"])) {
        array_push($addressFull, $locale["state"]);
      }
      if (!empty($locale["zip"])) {
        array_push($addressFull, $locale["zip"]);
      }
      $locale["addressFull"] = implode(" ", $addressFull);
      array_push($results, $locale);
    }

    // Return the results.
    $this->set(array(
      "results" => array(
        "query" => Sanitize::html($rawQuery),
        "timestamp" => time(),
        "results" => $results
      )
    ));
    $this->header(self::$jsonHeader);
    $this->render(self::$jsonAction);
  }
}
?>