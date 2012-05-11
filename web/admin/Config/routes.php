<?php
Router::parseExtensions();
Router::connect('/', array('controller' => 'home', 'action' => 'index'));
Router::connect('/login', array('controller' => 'home', 'action' => 'login'));
Router::connect('/logout', array('controller' => 'home', 'action' => 'logout'));
Router::connect('/locales', array('controller' => 'locale', 'action' => 'index'));
Router::connect('/locales/add', array('controller' => 'locale', 'action' => 'add'));
Router::connect('/locales/create', array('controller' => 'locale', 'action' => 'create', '[method]' => 'POST'));
Router::connect('/locales/delete/*', array('controller' => 'locale', 'action' => 'delete', '[method]' => 'DELETE'));
Router::connect('/locales/edit/*', array('controller' => 'locale', 'action' => 'edit'));
Router::connect('/locales/update/*', array('controller' => 'locale', 'action' => 'update', '[method]' => 'POST'));
Router::connect('/services/create/*', array('controller' => 'event', 'action' => 'create', '[method]' => 'POST'));
Router::connect('/services/delete/*', array('controller' => 'event', 'action' => 'delete', '[method]' => 'DELETE'));
Router::connect('/services/update/*', array('controller' => 'event', 'action' => 'update', '[method]' => 'POST'));
Router::connect('/users', array('controller' => 'user', 'action' => 'index'));
Router::connect('/users/add', array('controller' => 'user', 'action' => 'add'));
Router::connect('/users/create', array('controller' => 'user', 'action' => 'create', '[method]' => 'POST'));
Router::connect('/users/edit/*', array('controller' => 'user', 'action' => 'edit'));
Router::connect('/users/update/*', array('controller' => 'user', 'action' => 'update', '[method]' => 'POST'));
Router::connect('/users/update_password/*', array('controller' => 'user', 'action' => 'update_password', '[method]' => 'POST'));
?>