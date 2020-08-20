<?php

namespace Core\Tests;

class Tests {
    private $app = null;

    private $tests = [];
    
    public function __construct($app) {
        $this->app = $app;
    }

    public function add($testName, $callback=null) {
        
        if(!isset($this->tests[$testName])){
            $this->tests[$testName] = [];
        }

        $this->tests[$testName]['test'] = $testName;
        $this->tests[$testName]['callback'] = $callback;
    }
    
    public function load() {
        $app = $this->app;
        $router = $this->app->router;
        $services = $this->app->services;
        $tests = $this;
        
        foreach (\Core\Autoloader::getModulesPaths() as $module) {
            $path = $module . '/Tests/*Tests.php';
            foreach (glob($path) as $testFile) {
                include $testFile;
            }
        }        
    }

    public function assertTrue($status){
        if($status) throw new Assertation();
    }

    public function assertFalse($status){
        if(!$status) throw new Assertation();
    }
    
    public function executeTests() { 

        $counterSuccess = 0;
        $counterFail = 0;
        foreach ($this->tests as $test) {
            try {
                call_user_func_array($test['callback'], [$this->app, $this]);
                echo $test['test']." SUCCESS ".PHP_EOL;
                $counterSuccess++;
            } catch (Assertation $a) {
                echo $test['test']." FAIL ".$a->getTrace()[0]['file'].":".$a->getTrace()[0]['line'].PHP_EOL;
                $counterFail++;
            }  
        }

        echo "All test count: ".count($this->tests)." ";
        echo "Sucess: ".$counterSuccess." ";
        echo "Failed: ".$counterFail." ";
    }
}
