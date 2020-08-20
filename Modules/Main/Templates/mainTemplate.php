<?php

$this->blockStart("title");
echo $title . " | Administration";
$this->blockEnd("title");

$this->blockStart("body");
?>

    <?= $this->render("loginpage")?>
    <?= $this->render("listpage")?>
    <?= $this->render("spinner")?>
    <?= $this->render("flashmessage")?>
    
<?php
$this->blockEnd("body");

$this->extend("layout");
