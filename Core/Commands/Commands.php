<?php

namespace Core\Commands;

class Commands {
    private $app = null;

    private $commands = [];
    
    public function __construct($app) {
        $this->app = $app;
    }

    public function add($commandName, $callback=null) {
        
        if(!isset($this->commands[$commandName])){
            $this->commands[$commandName] = [];
        }

        $this->commands[$commandName]['command'] = $commandName;
        $this->commands[$commandName]['callback'] = $callback;
    }

    public function shortHelp($commandName, $callback=null) {
        if(!isset($this->commands[$commandName])){
            $this->commands[$commandName] = [];
        }

        $this->commands[$commandName]['shortHelp'] = $callback;
    }

    public function longHelp($commandName, $callback=null) {
        
        if(!isset($this->commands[$commandName])){
            $this->commands[$commandName] = [];
        }

        $this->commands[$commandName]['longHelp'] = $callback;
    }
    
    public function load() {
        $app = $this->app;
        $router = $this->app->router;
        $services = $this->app->services;
        $commands = $this;
        
        foreach (\Core\Autoloader::getModulesPaths() as $module) {
            $path = $module . '/Commands/*Commands.php';
            foreach (glob($path) as $commandsFile) {
                include $commandsFile;
            }
        }        
    }
    
    public function executeCommand($cmdArguments = null) { 
        global $argv;
        
        if (is_string($cmdArguments)){
            $cmdArguments = explode(" ", $arguments);;
        } else if (!is_array($cmdArguments)){
            $cmdArguments = $argv;
        }

        $commandName = @$cmdArguments[1];

        foreach ($this->commands as $command) {
            if($commandName === $command['command']) {
                echo call_user_func_array($command['callback'], [$this->app, $cmdArguments]);
                return;
            }
        }    

        if($commandName === "help" && isset($cmdArguments[2])) {
            $commandName = $cmdArguments[2];
            foreach ($this->commands as $command) {
                var_dump($command);
                if($commandName === $command['command'] && isset($command['longHelp'])) {
                    echo call_user_func_array($command['longHelp'], [$this->app, $cmdArguments]);
                    return;
                }
            }   
        } 

        echo "All available commands:".PHP_EOL;
        echo str_pad("help [commandName]", 32, " ", STR_PAD_RIGHT)."Detail information about command".PHP_EOL;
        foreach ($this->commands as $command) {
            if(isset($command['shortHelp'])) {
                echo str_pad($command['command'], 32, " ", STR_PAD_RIGHT) ."".call_user_func_array($command['shortHelp'], [$this->app, $cmdArguments]).PHP_EOL;
                return;
            }
        }      

    }
}
