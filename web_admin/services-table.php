<?php
function createServicesTable($result, $editOnly=FALSE) {
?>
  <table class="times">
    <thead>
      <tr>
        <th>Day</th>
        <th>Time</th>
        <th>Type</th>
        <th>Language</th>
        <?php if (!$editOnly) { ?>
        <th class="delete-header">Delete</th>
        <?php
        }
        ?>
      </tr>
    </thead>
    <?php
    $daysOfWeek = array(
      'Sunday' => 1,
      'Monday' => 2,
      'Tuesday' => 4,
      'Wednesday' => 8,
      'Thursday' => 16,
      'Friday' => 32,
      'Saturday' => 64
    );
    $languages = array(
      '' => '',
      'en' => 'English',
      'tl' => 'Tagalog',
      'es' => 'Spanish'
    );

    // Add row for each service
    if (!is_null($result)) {
      while ($row = mysql_fetch_assoc($result)) {
        print '<tr data-lm-locale="' . $row['id'] . '">';
        print '<td><select class="day-of-week">';
        foreach ($daysOfWeek as $key => $value) {
          if ($row['day_of_week'] == $value) {
            print '<option value="' . $value . '" selected>' . $key . '</option>';
          } else {
            print '<option value="' . $value . '">' . $key . '</option>';
          }

        }
        print '</select></td>';

        print '<td>';
        print '<input class="schedule" placeholder="9:00 AM" type="text" value="' . strftime('%I:%M %p', strtotime($row['schedule'])) . '">';
        print '</td>';

        print '<td>';
        $metadata = new DOMDocument();
        $metadata->loadXML($row['metadata']);
        $cws = $metadata->getElementsByTagName('cws')->item(0);
        if (is_null($cws)) {
          print '<label><input class="cws" type="checkbox"> CWS</label>';
        } else {
          print '<label><input class="cws" type="checkbox" checked> CWS</label>';
        }
        print '</td>';

        print '<td><select class="language">';
        $language = $metadata->getElementsByTagName('language')->item(0);
        $language = is_null($language) ? '' : $language->textContent;
        foreach ($languages as $key => $value) {
          if (strcmp($language, $key) == 0) {
            print '<option value="' . $key . '" selected="selected">' . $value . '</option>';
          } else {
            print '<option value="' . $key . '">' . $value . '</option>';
          }
        }
        print '</select></td>';
        if (!$editOnly) {
          print '<td><a class="delete" href="#">X</a></td>';
        }
        print '</tr>';
      }
    }
    ?>
  </table>
  <?php if (!$editOnly) { ?>
  <a class="add-event" href="#">Add</a>
  <?php
  }
  ?>
  <input type="hidden" id="Times" name="Times"/>
<?php
}
?>