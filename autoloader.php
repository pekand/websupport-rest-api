<?php
namespace Core;

class Autoloader {

    public static $modulePaths = null;

    public static function findModulesPaths($path = ROOT_PATH) {
        $paths = [];

        $modules = array_filter(glob($path . '/Modules/*'), 'is_dir');
        sort($modules);
        
        foreach ($modules as $module) {

            $paths[] = $module;

            $subModules = $module . '/Modules/';

            if (file_exists($subModules) && is_dir($subModules)) {
                $paths = array_merge($paths, self::findModulesPaths($module));
            }
        }

        return $paths;
    }

    public static function getModulesPaths() {

        if (empty(self::$modulePaths)) {
            $coreModules = self::findModulesPaths(ROOT_PATH.'/Core');
            self::$modulePaths = self::findModulesPaths();
            self::$modulePaths = array_merge($coreModules, self::$modulePaths);
            self::$modulePaths[] = ROOT_PATH;
        }
        
        return  self::$modulePaths;
    }

    static public function loader($className) {
        $modulePaths = self::getModulesPaths();

        try {
            foreach ($modulePaths as $module) {
                $filename = $module.DIRECTORY_SEPARATOR. str_replace("\\", DIRECTORY_SEPARATOR, $className) . ".php";

                if (file_exists($filename)) {
                    require_once($filename);
                    if (class_exists($className)) {
                        return true;
                    }
                } 
            }

            var_dump("Class not found! : ".$className);
            var_dump((new \Exception)->getTraceAsString());
            die();
        } catch(Exception $exception) {
            var_dump($exception);
        }
    }
}

spl_autoload_register('\Core\Autoloader::loader');
