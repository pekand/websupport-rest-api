<?php

use WebSupport\WebSupport;
use WebSupport\WebSupportConnect;

$services->add('websupport', function($app){ 
    $websupportconnect = $app->get('websupportconnect');
    return new WebSupport($websupportconnect);
});

$services->add('websupportconnect', function($app){   
    $api = $app->get('config')->get('websupport.endpoint');
    $version = $app->get('config')->get('websupport.version');
    $apikey = $app->get('config')->get('websupport.apikey');
    $secret = $app->get('config')->get('websupport.secret');
    return new WebSupportConnect($api, $version, $apikey, $secret);
});
