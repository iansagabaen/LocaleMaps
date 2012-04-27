<?php
class HomeController extends AppController {
  public $name = 'Home';

  function index() {
    $this->layout = 'base';
    $this->render('index');
  }
}
?>