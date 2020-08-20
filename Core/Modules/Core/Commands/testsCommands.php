<?php

use Core\Tests\Tests;

$commands->add("tests/run", function($app, $argv){
    $tests = new Tests($app);
    $tests->load();
    $tests->executeTests();
    return;
});

$commands->shortHelp("tests/run", function($app, $argv){
    return "Execute test for all modules";
});

$commands->longHelp("tests/run", function($app, $argv){
    return "Execute test for all modules".PHP_EOL;
});
