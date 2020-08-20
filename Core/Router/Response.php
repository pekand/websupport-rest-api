<?php

namespace Core\Router;

class Response { 
	private $data = "";
	private $headers = [];
	
	public function __construct($data, $headers = []) {
        $this->data = $data;
        $this->headers = $headers;
    }
    
    public function render() {
    	if(!empty($this->headers) && is_array($this->headers)){
    		foreach ($this->headers as $header) {
    			header($header);
    		}
    	}
    	echo $this->data;
    }
}