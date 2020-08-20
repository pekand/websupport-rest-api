<?php

namespace Core\App;

use Core\Config\Configuration;
use Core\Router\Router;
use Core\Services\ServicesContainer;
use Core\Commands\Commands;

class App {
    private $modulePaths = null;

    public $config = null;
    public $router = null;
    public $services = null;

    public function __construct() {

    }

    public function init() {
        $this->config = new Configuration($this);
        $this->config->load();
        
        $this->services = new ServicesContainer($this);
        $this->services->load();

        $this->router = new Router($this);
        $this->router->load();

        $this->router->execute();
    }

    public function executeCommand() {
        $this->config = new Configuration($this);
        $this->config->load();
        
        $this->services = new ServicesContainer($this);
        $this->services->load();

        $commands = new Commands($this);
        $commands->load();
        $commands->executeCommand();
    }
    
    public function get($name) {
        return $this->services->get($name);
    }
}
