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
    $this->layout = "ajax";
    $this->loadModel("Locale");
    $rawQuery = $this->params["url"]["q"];
    $query = Sanitize::escape($rawQuery);
    $table = $this->Locale->useTable;
    $results = $this->Locale->query("select localeid as id, name, address1, address2, city, state, zip, latitude, longitude from $table where match (name, address1, city, zip) against ('$query')");
    $this->set(array(
      "query" => Sanitize::html($rawQuery),
      "results" => $results));
    $this->render("search_results");
  }

}
?>