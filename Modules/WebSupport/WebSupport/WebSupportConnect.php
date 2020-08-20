<?php
namespace WebSupport;

class WebSupportConnect {

    private $api = null;
    private $version = null;
    private $apiKey = null;
    private $secret = null;

    public function __construct($api,$version, $apiKey, $secret) {
        $this->api = $api;
        $this->version = $version;
        $this->apiKey = $apiKey;
        $this->secret = $secret;
    }

    private function call($method = 'GET', $path = '', $data = []) {
        $time = time();

        $canonicalRequest = sprintf('%s %s %s', $method, $this->version.$path, $time);
        $signature = hash_hmac('sha1', $canonicalRequest, $this->secret);
         
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_URL, sprintf('%s:%s', $this->api, $this->version.$path));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        if(!empty($data)) {
            $payload = json_encode($data);
            curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
            curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        }

        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($ch, CURLOPT_USERPWD, $this->apiKey.':'.$signature);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Date: ' . gmdate('Ymd\THis\Z', $time),
        ]);
         
        $response = curl_exec($ch);
        curl_close($ch);
         
        return @json_decode($response, true);
    }

    public function get($path = '') {        
        return $this->call('GET', $path);
    }

    public function post($path = '', $data = []) {         
        return $this->call('POST', $path, $data);
    }

    public function put($path = '', $data = []) {        
        return $this->call('PUT', $path, $data);
    }

    public function delete($path = '') {        
        return $this->call('DELETE', $path);
    }
}
