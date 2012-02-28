<?php
App::uses('ExceptionRenderer', 'Error');

class AppExceptionRenderer extends ExceptionRenderer {
  public function missingController($error) {
    /*
    var_dump($error);
    var_dump($this->controller);
    echo "Missing controller!";
    */
    $this->controller->layout = "404";
  }
}
?>