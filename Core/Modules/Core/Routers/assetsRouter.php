<?php

// render assets file
$router->get("/assets/*", function($app, $path){   
    foreach (\Core\Autoloader::getModulesPaths() as $module) {
        $mimeTypes = [
            'txt' => 'text/plain',
            'htm' => 'text/html',
            'html' => 'text/html',
            'php' => 'text/html',
            'css' => 'text/css',
            'js' => 'application/javascript',
            'json' => 'application/json',
            'png' => 'image/png',
            'jpe' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'jpg' => 'image/jpeg',
            'ico' => 'image/x-icon',
            'svg' => 'image/svg+xml',
        ];
        
        $assetsPath = str_replace("\\", "/", $module . DIRECTORY_SEPARATOR. 'Assets'. DIRECTORY_SEPARATOR);
        $filepath = str_replace("\\", "/", $assetsPath. $path);

        if (!file_exists($filepath)) {
            continue;
        }

        // requested file must by in assets directory
        if (strpos($filepath, $assetsPath) !== 0) {
            continue;
        }

        $ext = strtolower(pathinfo($filepath, PATHINFO_EXTENSION));

        return new \Core\Router\Response(
            file_get_contents($filepath), 
            [
                "Content-Type: " . (isset($mimeTypes[$ext]) ? $mimeTypes[$ext] : mime_content_type($filepath)),
                "X-Content-Type-Options: nosniff",
                "Content-Length: " . filesize($filepath),
                "Cache-Control: max-age=2592000",
            ]
        );
    }

    return new \Core\Router\NotFoundResponse();
});
