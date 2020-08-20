<?php

$router->get("/api", function($app) {
   echo "(private area)";
});

$router->get("/api/info/routes", function($app) {
	$routes = $app->router->getAllRoutes();
	var_dump($routes);
});
