<?php
class SearchFiltersComponent extends Object {
  function getDayFilters() {
    return array(
      array (
        "long_desc" => "Sunday",
        "short_desc" => "Sun",
        "value" => 1,
        "enabled" => true
      ),
      array (
        "long_desc" => "Monday",
        "short_desc" => "Mon",
        "value" => 2,
        "enabled" => true
      ),
      array (
        "long_desc" => "Tuesday",
        "short_desc" => "Tues",
        "value" => 4,
        "enabled" => true
      ),
      array (
        "long_desc" => "Wednesday",
        "short_desc" => "Wed",
        "value" => 8,
        "enabled" => true
      ),
      array (
        "long_desc" => "Thursday",
        "short_desc" => "Thu",
        "value" => 16,
        "enabled" => true
      ),
      array (
        "long_desc" => "Friday",
        "short_desc" => "Fri",
        "value" => 32,
        "enabled" => true
      ),
      array (
        "long_desc" => "Saturday",
        "short_desc" => "Sat",
        "value" => 64,
        "enabled" => true
      )
    );
  }

  function getTimeFilters() {
    return array(
      array (
        "description" => "AM",
        "value" => 1,
        "enabled" => true
      ),
      array (
        "description" => "PM",
        "value" => 2,
        "enabled" => true
      )
    );
  }
}
?>