<?php
App::import("Sanitize");

class WwwActionsController extends AppController {
  var $helpers = array("Html");
  var $name = "WwwActions";
  var $uses = array();

  function get_locale($id) {
    $this->layout = "ajax";
    $this->loadModel("Locale");
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
    $this->set(array(
      "address" => $locale["address1"],
      "address2" => $locale["address2"],
      "addressFull" => implode(" ", $addressFull),
      "city" => $locale["city"],
      "email" => $locale["emailcontact"],
      "id" => $locale["localeid"],
      "latitude" => $locale["latitude"],
      "longitude" => $locale["longitude"],
      "name" => $locale["name"],
      "services" => $locale["times"],
      "state" => $locale["state"],
      "tel" => $locale["contact"],
      "timestamp" => $locale["timestamp"],
      "zip" => $locale["zip"]));
    $this->render("locale");
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
    $locales = $this->Locale->query("select localeid as id, name, address1, address2, city, state, zip, latitude, longitude, emailcontact as email, contact as tel, timestamp from $table where match (name, address1, city, zip) against ('$query')");
    foreach ($locales as $locale) {
      $locale = $locale['locale'];
      $services = $this->Event->find(
        'all',
        array(
          'conditions' => array(
            'locale_id' => $locale['id'],
            'type' => 1)  // TODO(rcruz): Convert to enum.
        ));
      if (!is_null($services)) {
        $locale['services'] = $services;
      }
      array_push($results, $locale);
    }

    // Return the results.
    $this->set(array("results" => $results));
    $this->render("search_results");
  }

}
?>