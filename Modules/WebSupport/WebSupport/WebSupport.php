<?php
namespace WebSupport;

class WebSupport {
    private $webSupportApi = null;

    public function __construct($webSupportApi) {
        $this->webSupportApi = $webSupportApi;
    }

    public function getCurrentUser() {
        return $this->webSupportApi->get('/user/self');
    }

    public function getCurrentUserZones() {
        return $this->webSupportApi->get('/user/self/zone');
    }

    public function getCurrentUserZoneList($domainName) {
        return $this->webSupportApi->get('/user/self/zone/'.$domainName);
    }

    public function getCurrentUserZoneRecordsList($domainName) {
        return $this->webSupportApi->get('/user/self/zone/'.$domainName.'/record');
    }

    public function getCurrentUserZoneRecord($domainName, $recordId) {
        return $this->webSupportApi->get('/user/self/zone/'.$domainName.'/record/'.$recordId);
    }

    public function createZoneRecordForCurrentUser($domainName, $data) {
        return $this->webSupportApi->post(
            '/user/self/zone/'.$domainName.'/record',
            $data
        );
    }

    public function updateZoneRecordForCurrentUser($domainName, $recordId, $data) {
        return $this->webSupportApi->put(
            '/user/self/zone/'.$domainName.'/record/'.$recordId,
            $data
        );
    }

    public function deleteZoneRecordForCurrentUser($domainName, $recordId) {
        return $this->webSupportApi->delete(
            '/user/self/zone/'.$domainName.'/record/'.$recordId
        );
    }

    public function listAll() {
        $data = [];

        $data['list_of_zones'] = $this->getCurrentUserZones();

        $data['zones'] = [];
        foreach ($data['list_of_zones']['items'] as $zone) {
            $data['zones'][$zone['id']] = $this->getCurrentUserZoneList($zone['name']);
        }

        $data['zone_records'] = [];
        foreach ($data['list_of_zones']['items'] as $zone) {
            $data['zone_records'][$zone['id']] = $this->getCurrentUserZoneRecordsList($zone['name']);
        }

        return $data; 
    }
}
