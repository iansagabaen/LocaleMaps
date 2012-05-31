<?php
Router::parseExtensions();
Router::connect('/', array('controller' => 'www_actions', 'action' => 'index'));
Router::connect('/locales/*', array('controller' => 'www_actions', 'action' => 'get_locale'));
Router::connect('/search', array('controller' => 'www_actions', 'action' => 'search'));
?>