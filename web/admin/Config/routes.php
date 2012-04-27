<?php
Router::parseExtensions();
Router::connect('/', array('controller' => 'home', 'action' => 'index'));
Router::connect('/locales', array('controller' => 'locale', 'action' => 'index'));
Router::connect('/locales/edit/*', array('controller' => 'locale', 'action' => 'edit'));
Router::connect('/locales/add', array('controller' => 'locale', 'action' => 'add'));
Router::connect('/locales/create', array('controller' => 'locale', 'action' => 'create', '[method]' => 'POST'));
Router::connect('/locales/delete/*', array('controller' => 'locale', 'action' => 'delete', '[method]' => 'DELETE'));
Router::connect('/locales/update/*', array('controller' => 'locale', 'action' => 'update', '[method]' => 'POST'));
Router::connect('/services/create/*', array('controller' => 'event', 'action' => 'create', '[method]' => 'POST'));
Router::connect('/services/delete/*', array('controller' => 'event', 'action' => 'delete', '[method]' => 'DELETE'));
Router::connect('/services/update/*', array('controller' => 'event', 'action' => 'update', '[method]' => 'POST'));
?>