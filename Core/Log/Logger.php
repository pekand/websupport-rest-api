<?php

namespace Core\Log;

class Logger {
    private $logPath = null;

    public function __construct($logPath) {
        $this->logPath = $logPath;
    }

    public function write($message = '') {
        file_put_contents($this->logPath, print_r([
            'TIME' => date("Y-m-d H:i:s"),
            'URL' => "https://".@$_SERVER[HTTP_HOST].@$_SERVER[REQUEST_URI],
            'REMOTE_ADDR' => @$_SERVER['REMOTE_ADDR'],
            'HTTP_REFERER' => @$_SERVER['HTTP_REFERER'],
            'HTTP_USER_AGENT' => @$_SERVER['HTTP_USER_AGENT'],
            'MESSAGE' => $message
        ], true).PHP_EOL, FILE_APPEND | LOCK_EX);
    }
}
