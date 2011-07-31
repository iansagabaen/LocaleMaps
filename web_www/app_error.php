<?php
class AppError extends ErrorHandler {
  public function error404($params) {
    parent::error404($params);
    $this->controller->layout = "www";
  }
}
?>