<?php

//#MAIN_ROUTER
$app->router->get("/", function($app) {
	return $app->services->get('template')->render("main", ['title' => 'Zones']);
});

$app->router->get("*", function($app, $all) {
	return new \Core\Router\NotFoundResponse();
});
