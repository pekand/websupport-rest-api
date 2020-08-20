<?php

namespace Core\Router;

class NotFoundResponse { 
	
	private $data = null;
	
	public function __construct($data = null) {
        $this->data = $data;
    }
    
    public function render() {
    	header('HTTP/1.0 404 Not Found');
		echo $this->data;
    }
}