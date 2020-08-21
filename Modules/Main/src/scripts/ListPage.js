class ListPage {

  constructor(app) {
    this.app = app;
    this.data = null;

    this.selectedZone = null;
    this.selectedZoneName = null;

    this.zoneNames = [];

    this.zones = [];
    this.zoneRecords = [];

    this.bindElements();
    this.bindEvents();
  }

  bindElements() {
    this.listpage = document.getElementById('listpage');
    this.logoutButton = document.getElementById('logout');
    this.zonelist = document.getElementById('zone-list');
    this.recordslist = document.getElementById('records-list');
    this.addrecord = document.getElementById('add-record');
    this.zoneHeader = document.getElementById('zone-header');
    this.addNewRecordButton = document.getElementById('button-add-new-record');


    this.recordFormWrapper = document.getElementById('form-record-wrapper');
    this.recordForm = document.getElementById('form-record');
    this.recordFormHeader = document.getElementById('record-form-header');
    this.recordName = document.getElementById('record-name');
    this.recordContent = document.getElementById('record-content');
    this.recordPrio = document.getElementById('record-prio');
    this.recordPort = document.getElementById('record-port');
    this.recordWeight = document.getElementById('record-weight');
    this.recordTTL = document.getElementById('record-ttl');

    this.recordCreateButton = document.getElementById('record-create-button');
    this.recordUpdateButton = document.getElementById('record-update-button');
    this.recordCancelButton = document.getElementById('record-create-cancel-button');
    
  }

  bindEvents() {
    this.logoutButton.addEventListener('click', this.logout.bind(this));
    this.addNewRecordButton.addEventListener('click', this.addNewRecordClick.bind(this));
    this.recordCreateButton.addEventListener('click', this.recordCreateButtonClick.bind(this));
    this.recordUpdateButton.addEventListener('click', this.recordUpdateButtonClick.bind(this));
    this.recordCancelButton.addEventListener('click', this.recordCancelButtonClick.bind(this));
    this.recordFormWrapper.addEventListener('click', this.removeWrapper.bind(this));

    let recordTypeRadioButtons = document.getElementsByClassName('record-type');
    for(let i=0; i<recordTypeRadioButtons.length; i++) {
      recordTypeRadioButtons[i].addEventListener('change', this.selectRecordType.bind(this));
    }
  }

  getSelectedRecordType() {
    let recordTypeRadioButtons = document.getElementsByClassName('record-type');
    for(let i=0; i<recordTypeRadioButtons.length; i++) {
      if(recordTypeRadioButtons[i].checked){
          return recordTypeRadioButtons[i].value;
      }
    }
  }

  selectRecordType() {
    let selectedRecordType = this.getSelectedRecordType();

    let recordFormInputs = document.querySelectorAll('[data-for]');
    for(let i=0; i<recordFormInputs.length; i++) {
      if(!recordFormInputs[i].dataset.for.toString().split(" ").includes(selectedRecordType)) {
        recordFormInputs[i].parentElement.classList.add('hidden');
      } else {
        recordFormInputs[i].parentElement.classList.remove('hidden');
      }
    }
  }

  init(data) {
    this.data = data;
    this.renderZones(data.list_of_zones.items);
    this.renderZonesRecords(data.list_of_zones.items, data.zone_records);

    if(this.zones.length>0){
      this.showZone(this.zones[0].dataset.zoneid);
    }

    this.show();
  }

  renderZones(zones) {
    this.zones = [];

    let oldZones = document.getElementsByClassName("zone");
    for(let i=0; i<oldZones.length; i++) {
      oldZones[i].remove();
    }

    for(let i=0; i<zones.length; i++) {
      var zone = document.createElement("a");
      zone.setAttribute("id", "zone-"+zones[i].id);
      zone.setAttribute("href", "#");
      zone.classList.add("zone");
      zone.classList.add("nav-link");
      zone.dataset.zoneid = zones[i].id;
      zone.dataset.zonename = zones[i].name;
      this.zoneNames[zones[i].id] = zones[i].name;
      zone.appendChild(document.createTextNode(zones[i].name));
      zone.addEventListener('click', this.zoneClick.bind(this));
      this.zones.push(zone);
      this.zonelist.appendChild(zone);
    }
  }

  renderZonesRecords(zones, zoneRecords) {
    this.zoneRecords = [];
    let oldZoneRecords = document.getElementsByClassName("zone-records");
    for(let i=0; i<oldZoneRecords.length; i++) {
      oldZoneRecords[i].remove();
    }

    for(let i=0; i<zones.length; i++) {
      var zoneRecordsEl = document.createElement("div");
      zoneRecordsEl.setAttribute("id", "zone-records-"+zones[i].id); //getAttribute removeAttribute
      zoneRecordsEl.classList.add("zone-records");
      zoneRecordsEl.classList.add("row");
      zoneRecordsEl.classList.add("hidden");
      zoneRecordsEl.dataset.zoneid = zones[i].id;

      for(let j=0; j<zoneRecords[zones[i].id].items.length; j++) {
        var zoneRecord = new ZoneRecord(this.app, zones[i].id, zoneRecords[zones[i].id].items[j]);
        zoneRecordsEl.appendChild(zoneRecord.element);
      }

      this.zoneRecords[zones[i].id] = zoneRecordsEl;
      this.recordslist.appendChild(zoneRecordsEl);
    }
  }

  getZoneRecord(recordid){
    if(this.data == null){
      return null;
    }

    let zones = this.data.list_of_zones.items;
    let zoneRecords = this.data.zone_records;
    for(let i=0; i<zones.length; i++) {
      for(let j=0; j<zoneRecords[zones[i].id].items.length; j++) {
        if(zoneRecords[zones[i].id].items[j].id == recordid){
          return zoneRecords[zones[i].id].items[j];
        }
      }
    }

    return null;
  }

  addZoneRecord(zoneid, zoneRecord){
    if(this.data == null){
      return null;
    }

    this.data.zone_records[zoneid].items.push(zoneRecord);
    return null;
  }

  updateZoneRecord(zoneid, recordid, zoneRecord) {
    if(this.data == null){
      return null;
    }

    for(let j=0; j<this.data.zone_records[zoneid].items.length; j++) {
      if(this.data.zone_records[zoneid].items[j].id == recordid){
        this.data.zone_records[zoneid].items[j] = zoneRecord;
        return;
      }
    }

    return null;
  }

  removeZoneRecord(zoneid, recordid) {
    if(this.data == null){
      return null;
    }

    for(let j=0; j<this.data.zone_records[zoneid].items.length; j++) {
      if(this.data.zone_records[zoneid].items[j].id == recordid){
        this.data.zone_records[zoneid].items.splice(j, 1);
        return;
      }
    }

    return null;
  }


  showZone(zoneid){
      if(this.selectedZone == zoneid){
          return;
      }

      let zones = document.getElementsByClassName("zone");
      for(let i=0; i<this.zones.length; i++) {
        zones[i].classList.remove('selected');
        zones[i].classList.remove('active');
      }

      let zoneRecords = document.getElementsByClassName("zone-records");
      for(let i=0; i<zoneRecords.length; i++) {
        zoneRecords[i].classList.add('hidden');
      }

      this.zoneHeader.innerHTML = document.getElementById('zone-'+zoneid).innerHTML;
      document.getElementById('zone-'+zoneid).classList.add('selected');
      document.getElementById('zone-'+zoneid).classList.add('active')
      document.getElementById('zone-records-'+zoneid).classList.remove('hidden');

      this.selectedZone = zoneid;
      this.selectedZoneName = document.getElementById('zone-'+zoneid).dataset.zonename;
  }

  logout(){
    this.app.logout();
  }

  zoneClick(e){
    this.showZone(event.target.dataset.zoneid);
  }

  show() {
    this.listpage.classList.remove('hidden');
  }

  hide() {
    this.listpage.classList.add('hidden');
  }

  addNewRecordClick() {
    this.recordUpdateButton.classList.add('hidden');
    this.recordCreateButton.classList.remove('hidden');

    if(this.recordForm.classList.contains('hidden')){
      this.recordForm.classList.remove('hidden');
      this.addNewRecordButton.innerHTML = 'hide';
    } else {
      this.addNewRecordButton.innerHTML = 'add';
      this.recordForm.classList.add('hidden');

    }
  }

  hideRecordForm() {
    this.recordUpdateButton.classList.add('hidden');
    this.recordCreateButton.classList.remove('hidden');
    this.recordForm.classList.add('hidden');
    this.addNewRecordButton.innerHTML = 'add';
    this.recordForm.classList.add('hidden');
    this.recordForm.classList.remove('show-as-modal');
    this.recordFormWrapper.classList.remove('show-as-modal');
    this.cleanRecordForm();
  }

  removeWrapper() {
    this.hideRecordForm();
  }

  validateRecordForm() {
    debugger;
    let selectedRecordType = this.getSelectedRecordType();

    let formIsValid = true;

    let recordFormInputs = document.querySelectorAll('[data-required]');
    for(let i=0; i<recordFormInputs.length; i++) {
      recordFormInputs[i].classList.remove('is-invalid');

      if(!recordFormInputs[i].dataset.for.toString().split(" ").includes(selectedRecordType)) {
        continue;
      }

      if(recordFormInputs[i].dataset.required === 'true' && recordFormInputs[i].value.trim() == "") {
        recordFormInputs[i].classList.add('is-invalid');
        formIsValid = false;
      } else if(recordFormInputs[i].dataset.required === 'false' && recordFormInputs[i].value.trim() == "") {
        continue;
      }

      if(recordFormInputs[i].dataset.validator === 'INT' && ( 
      !recordFormInputs[i].value.match(/^\d+$/) || !( 
      0<=recordFormInputs[i].value &&
      recordFormInputs[i].value<=65535))) {
        recordFormInputs[i].classList.add('is-invalid');
        formIsValid = false;
      }
    }

    if (selectedRecordType == "A" && !this.recordContent.value.match(/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/)) {
      this.recordContent.classList.add('is-invalid');
      formIsValid = false;
    }

    if (selectedRecordType == "AAAA" && !this.recordContent.value.match(/^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/)) {
      this.recordContent.classList.add('is-invalid');
      formIsValid = false;
    }

    return formIsValid;
  }

  recordCreateButtonClick(event) {
      event.preventDefault();

      if(this.selectedZone == null){
        return;
      }

      if(!this.validateRecordForm()) {
        return;
      }

      let formData = new FormData(document.getElementById('record-form'));
      this.app.spinner.show();
      getUrl(
          '/api/websupport/zone/'+this.zoneNames[this.selectedZone]+'/record/create', 'post', formData,
          this.receiveRecordCreate.bind(this),
          this.receiveRecordCreate.bind(this)
      );
  }

  receiveRecordCreate(data) {
    this.app.spinner.hide();
    if(typeof data.status != 'undefined' && data.status == 'success'){
      let zoneRecordsEl = document.getElementById("zone-records-"+data.item.zone.service_id);
      var zoneRecord = new ZoneRecord(this.app, data.item.zone.service_id, data.item);
      zoneRecordsEl.appendChild(zoneRecord.element);
      this.addZoneRecord(data.item.zone.service_id, data.item);
      this.hideRecordForm();
      this.app.flashmessage.show("New record created successfully");
    }

    if(typeof data.status != 'undefined' && data.status == 'error') {
        for (x in data.errors) {
          for (let i = 0; i<data.errors[x].length; i++) {
            this.app.flashmessage.show("Error: "+ x + " "+data.errors[x][i]);
          }
        }
    }
  }

  updateRecord(zoneRecordEl) {
    let recordid = zoneRecordEl.dataset.recordid;
    let zoneid = zoneRecordEl.dataset.zoneid;
    let zoneRecord = this.getZoneRecord(recordid);

    if(zoneRecord == null) {
      return;
    }

    let recordTypeRadio = document.getElementsByClassName("record-type");
    for(let i=0; i<recordTypeRadio.length; i++) {
      recordTypeRadio[i].checked = (zoneRecord.type == recordTypeRadio[i].value);
      recordTypeRadio[i].disabled = true;
    }

    document.getElementById('record-name').value = zoneRecord.name;
    document.getElementById('record-content').value = zoneRecord.content;
    document.getElementById('record-ttl').value = zoneRecord.ttl;

    this.recordUpdateButton.dataset.recordid = recordid;
    this.recordUpdateButton.dataset.zoneid = zoneid;

    this.recordFormHeader.innerHTML = "Udate record "+zoneRecord.name;
    this.recordUpdateButton.classList.remove('hidden');
    this.recordCreateButton.classList.add('hidden');

    this.recordForm.classList.remove('hidden');
    this.recordForm.classList.add('show-as-modal');
    this.recordFormWrapper.classList.add('show-as-modal');
  }

  recordUpdateButtonClick(event) {
      event.preventDefault();

      if(!this.validateRecordForm()) {
        return;
      }

      let formData = new FormData(document.getElementById('record-form'));

      let recordid = this.recordUpdateButton.dataset.recordid;
      let zoneid = this.recordUpdateButton.dataset.zoneid;
      this.app.spinner.show();
      getUrl(
          '/api/websupport/zone/'+this.zoneNames[zoneid]+'/record/update/'+recordid, 'post', formData,
          this.receiveUpdateRecord.bind(this),
          this.receiveUpdateRecord.bind(this)
      );
  }

  receiveUpdateRecord(data) {
    this.app.spinner.hide();
    if(typeof data.status != 'undefined' && data.status == 'success'){

      document.getElementById("zone-records-"+data.item.id+'-name').innerHTML = data.item.name;
      document.getElementById("zone-records-"+data.item.id+'-content').innerHTML = data.item.content;
      document.getElementById("zone-records-"+data.item.id+'-ttl').innerHTML = data.item.ttl;

      this.updateZoneRecord(data.item.zone.service_id, data.item.id, data.item);

      this.hideRecordForm();
      this.app.flashmessage.show("New record updated successfully");
    }

    if(typeof data.status != 'undefined' && data.status == 'error') {
        for (x in data.errors) {
          for (let i = 0; i<data.errors[x].length; i++) {
            this.app.flashmessage.show("Error: "+ x + " "+data.errors[x][i]);
          }
        }
    }
  }

  cleanRecordForm() {
    let recordTypeRadio = document.getElementsByClassName("record-type");
    for(let i=0; i<recordTypeRadio.length; i++) {
      recordTypeRadio[i].checked=false;
      recordTypeRadio[i].disabled = false;
    }

    document.getElementById('record-type-A').checked = true;
    this.selectRecordType();

    let recordFormInputs = document.querySelectorAll('[data-required]');
    for(let i=0; i<recordFormInputs.length; i++) {
      recordFormInputs[i].classList.remove('is-invalid');
       recordFormInputs[i].value = recordFormInputs[i].dataset.default;
    }

    this.addNewRecordButton.innerHTML = 'add';
    this.recordForm.classList.add('hidden');
  }

  recordCancelButtonClick (e) {
    event.preventDefault();
    this.hideRecordForm();
  }

  clean() {
    this.data = null;
    this.selectedZone = null;
    this.selectedZoneName = null;
    this.zones = [];
    this.zoneNames = [];
    this.zoneRecords = [];

    let zones = document.getElementsByClassName("zone");
    for(let i=0; i<zones.length; i++) {
      zones[i].remove();
    }

    let zoneRecords = document.getElementsByClassName("zone-records");
    for(let i=0; i<zoneRecords.length; i++) {
      zoneRecords[i].remove();
    }

    this.cleanRecordForm();
  }
}
