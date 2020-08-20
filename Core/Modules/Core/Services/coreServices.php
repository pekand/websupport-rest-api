<?php

use Core\Session\Session;
use Core\Db\Sqlite;
use Core\Db\MySQL;
use Core\Auth\Auth;
use Core\Auth\UserManager;
use Core\Template\Template;
use Core\Router\Request;
use Core\Temp\Temp;
use Core\Log\Logger;

$services->add('config', function($app){   
    return $app->config;
});

$services->add('request', function($app){
    $request = new Request();
    
    return $request;
});

$services->add('sqlite', function($app){
    $dbPath = $app->get('config')->get('dbPath');
    
    $db = new Sqlite();
    $db->open($dbPath);

    return $db;
});

$services->add('db', function($app) {
    $mysql = $app->services->get('sqlite');
    return $mysql;
});

$services->add('session', function($app){
    $session = new Session();

    return $session;
});

$services->add('userManager', function($app){
    $db = $app->services->get('db');
    $userManager = new UserManager($db);

    return $userManager;
});

$services->add('auth', function($app){
    $session = $app->services->get('session');
    $userManager = $app->services->get('userManager');
    $auth = new Auth($session, $userManager);

    return $auth;
});

$services->add('template', function($app){
    $templatesPath = $app->get('config')->get('templatesPath');

    $template = new Template($app, $templatesPath);

    return $template;
});

$services->add('temp', function($app){
    $tempPath = $app->get('config')->get('tempPath');
    dump($tempPath);
    $temp = new Temp($app, $tempPath);
    
    return $temp;
});

$services->add('log', function($app){
    $logPath = $app->get('config')->get('logPath');
    return new Logger($logPath);
});
