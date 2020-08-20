<?php

define('ROOT_PATH', dirname(__FILE__));

require_once(ROOT_PATH.'/autoloader.php');

$app = new \Core\App\App();
$app->executeCommand();
