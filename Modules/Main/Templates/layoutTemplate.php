<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title><?php $this->blockInsert("title", "WebApplication")?></title>        
 	    <script defer src="/assets/layout/scripts/script.js?<?php echo md5(filemtime(ROOT_PATH.'/Modules/Main/Assets/layout/scripts/script.js')) ?>"></script>
        <link rel="stylesheet" href="/assets/layout/styles/styles.css?<?php echo md5(filemtime(ROOT_PATH.'/Modules/Main/Assets/layout/styles/styles.css')) ?>">
        <link rel='shortcut icon' type='image/x-icon' href='/assets/layout/img/favicon.png' />
                
        <?php $this->blockInsert("style")?>

    </head>
    <body>
            
        <?php $this->blockInsert("body")?>

        <?php $this->blockInsert("scripts")?>

        <script> typeof init !== 'undefined' && window.addEventListener("load", init);</script>
    
    </body>
</html>
