<?php
// create private zone
$router->middleware("/api", function($app){
	
	$auth = $app->get('auth');
		
	if(!$auth->is('ADMIN')) {
		$username = @$_POST['username'];
		$password = @$_POST['password'];
			
		if (!empty($username)) {
			if($auth->login($username, $password)) {
				header("Location: ".$app->get('request')->uri());
				return null;
			}
		}
	}

	if(!$auth->is('ADMIN')) {
		return $app->get('template')->render("login", []);
	}
	
	return true;
});

// displey login page
$router->get("/login", function($app){
	$page = $app->get('template');
	return $page->render("login", []);
});

// proces login form
$router->post("/login", function($app){
	$username = @$_POST['username'];
	$password = @$_POST['password'];
		
	$auth = $app->get('auth');	
	if(!$auth->login($username, $password)) {
		$page = $app->get('template');
		return $page->render("login", []);
	}
	
	header("Location: /");
	return ;
});

$router->post("/login/ajax", function($app){
	$username = @$_POST['username'];
	$password = @$_POST['password'];
		
	$auth = $app->get('auth');	
	if(!$auth->login($username, $password)) {
		return json_encode(['status'=>'unlogged']);
	}
	
	return json_encode([
		'status'=>'logged',
		'data' => $app->get('websupport')->listAll(),
	]);
});

$router->get("/user", function($app){
	if(!$app->get('auth')->is('ADMIN')) {
		return json_encode(['status'=>'unlogged']);
	}
	
	return json_encode([
		'status'=>'logged',
		'data' => $app->get('websupport')->listAll(),
	]);
});

// logout user
$router->get("/logout", function($app){	
	$auth = $app->get('auth');
	$auth->logout();
	return json_encode(['status'=>'unlogged']);
});
