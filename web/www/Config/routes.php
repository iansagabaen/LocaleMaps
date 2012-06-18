<?php
Router::parseExtensions();
Router::connect('/', array('controller' => 'www_actions', 'action' => 'index'));
Router::connect('/locales/*', array('controller' => 'www_actions', 'action' => 'get_locale'));
Router::connect('/nav/*', array('controller' => 'www_actions', 'action' => 'get_nav_items'));
Router::connect('/search', array('controller' => 'www_actions', 'action' => 'search'));
?>