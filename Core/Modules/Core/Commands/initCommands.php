<?php

use Core\Tests\Tests;

$commands->add("init/users", function($app, $argv){
    $db = $app->get('db');

    $db->exec("
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        uid TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        roles TEXT NOT NULL,
        rights TEXT NOT NULL
    );");

    $app->get('log')->write("users table created");
    echo "DONE".PHP_EOL;
    return;
});

$commands->add("user/create", function($app, $argv){

    $username = @$argv[2];
    $password = @$argv[3];

    if ($username === null || $password === null){
        return;
    }

    $app->get('auth')->createUser($username, $password, ['ADMIN'], []);

    echo "User Created".PHP_EOL;
    $app->get('log')->write("new user '".$username."' created");
    return;
});

$commands->shortHelp("init", function($app, $argv){
    return "First time application initialization";
});

$commands->add("check", function($app, $argv){
    
    if (extension_loaded('sqlite3')) {
       echo 'ERROR: SQLite3 extension loaded. (for user table)'.PHP_EOL;
    } else {
        echo 'OK: SQLite3 extension loaded'.PHP_EOL;
    }

    if (!file_exists(ROOT_PATH.'/Config/appConfig.php')) {
       echo 'ERROR: Configuration file not exist'.PHP_EOL;
    } else {
        echo 'OK: Configuration file exist'.PHP_EOL;
    }

    echo "DONE".PHP_EOL;
    return;
});

$commands->shortHelp("init", function($app, $argv){
    return "validate current application configuration";
});
