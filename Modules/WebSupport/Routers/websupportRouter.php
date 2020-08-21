<?php

$router->get("/api/websupport/currentuser/get", function($app) {
    $websupport = $app->get('websupport');
    var_dump($websupport->getCurrentUser()) ;
});

$router->get("/api/websupport/zones/list", function($app) {
    $websupport = $app->get('websupport');
    var_dump($websupport->getCurrentUserZones()) ;
});

$router->get("/api/websupport/zone/:domainName/list", function($app, $domainName) {
    $websupport = $app->get('websupport');
    var_dump($websupport->getCurrentUserZoneList($domainName)) ;
});

$router->get("/api/websupport/zone/:domainName/records/list", function($app, $domainName) {
    $websupport = $app->get('websupport');
    var_dump($websupport->getCurrentUserZoneRecordsList($domainName)) ;
});

$router->get("/api/websupport/zone/:domainName/record/get/:recordId", function($app, $domainName, $recordId) {
    $websupport = $app->get('websupport');
    var_dump($websupport->getCurrentUserZoneRecord($domainName, $recordId)) ;
});

$router->get("/api/websupport/list/all", function($app) {
    print_r($app->get('websupport')->listAll()) ;
});

$router->post("/api/websupport/zone/:domainName/record/create", function($app, $domainName) {

    $type = @$_POST['type'];

    $data = [
        'type' => @$_POST['type'],
        'name' => @$_POST['name'],
        'content' => @$_POST['content'],
        'prio' => @$_POST['prio'],
        'port' => @$_POST['port'],
        'weight' => @$_POST['weight'],
        'ttl' => @$_POST['ttl'],
    ];

    if ($type !== "MX" && $type !== "SRV"){ 
        unset($data['prio']);
    }

    if ($type !== "SRV"){ 
        unset($data['port']);
        unset($data['weight']);
    }

    return json_encode($app->get('websupport')->createZoneRecordForCurrentUser($domainName, $data)) ;
});

$router->post("/api/websupport/zone/:domainName/record/update/:recordId", function($app, $domainName, $recordId) {

    $type = @$_POST['type'];

    $data = [
        'name' => @$_POST['name'],
        'content' => @$_POST['content'],
        'prio' => @$_POST['prio'],
        'port' => @$_POST['port'],
        'weight' => @$_POST['weight'],
        'ttl' => @$_POST['ttl'],
    ];

    if ($type !== "MX" || $type !== "SRV"){ 
        unset($data['prio']);
    }

    if ($type !== "SRV"){ 
        unset($data['port']);
        unset($data['weight']);
    }

    return json_encode($app->get('websupport')->updateZoneRecordForCurrentUser($domainName, $recordId, $data)) ;
});

$router->delete("/api/websupport/zone/:domainName/record/delete/:recordId", function($app, $domainName, $recordId) {
    return json_encode($app->get('websupport')->deleteZoneRecordForCurrentUser($domainName, $recordId)) ;
});
