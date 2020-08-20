class ZoneRecord {

  constructor(app , zoneid, zoneRecord) {
    this.app = app;
    this.element = this.render(zoneid, zoneRecord);
  }

  render(zoneid, zoneRecord) {
    let zoneRecordEl = document.createElement("div");
    zoneRecordEl.addEventListener('click', this.updateRecordClick.bind(this, zoneRecordEl));
    zoneRecordEl.setAttribute("id", "zone-records-"+zoneRecord.id);
    zoneRecordEl.classList.add("zone-record");
    zoneRecordEl.classList.add("col-12");
    zoneRecordEl.classList.add("col-md-6");
    zoneRecordEl.classList.add("col-lg-4");
    zoneRecordEl.dataset.zoneid = zoneid;
    zoneRecordEl.dataset.recordid = zoneRecord.id;

      let zoneRecordRemoveEl = document.createElement("div");
      zoneRecordRemoveEl.classList.add("zone-record-remove");
      zoneRecordRemoveEl.classList.add("fa");
      zoneRecordRemoveEl.classList.add("fa-times");
      zoneRecordRemoveEl.addEventListener('click', this.removeRecordClick.bind(this));
      zoneRecordRemoveEl.dataset.zoneid = zoneid;
      zoneRecordRemoveEl.dataset.zonerecordid = zoneRecord.id;
      
      zoneRecordRemoveEl.dataset.recordid = zoneRecord.id;
      zoneRecordEl.appendChild(zoneRecordRemoveEl);

      let zoneRecordRemoveConfirmEl = document.createElement("div");
      zoneRecordRemoveConfirmEl.setAttribute("id", "zone-record-confirm-"+zoneRecord.id);
      zoneRecordRemoveConfirmEl.classList.add("zone-record-confirm");
      zoneRecordRemoveConfirmEl.classList.add("hidden");
      zoneRecordEl.appendChild(zoneRecordRemoveConfirmEl);

        let zoneRecordRemoveConfirmTitleEl = document.createElement("div");
        zoneRecordRemoveConfirmTitleEl.classList.add("zone-record-confirm-title");
        zoneRecordRemoveConfirmTitleEl.innerHTML = "Are you sure?";
        zoneRecordRemoveConfirmEl.appendChild(zoneRecordRemoveConfirmTitleEl);

        let zoneRecordRemoveConfirmYesEl = document.createElement("button");
        zoneRecordRemoveConfirmYesEl.addEventListener('click', this.removeRecordClickYes.bind(this));
        zoneRecordRemoveConfirmYesEl.dataset.zoneid = zoneid;
        zoneRecordRemoveConfirmYesEl.dataset.zonerecordid = zoneRecord.id;
        zoneRecordRemoveConfirmYesEl.classList.add("zone-record-confirm-yes");
        zoneRecordRemoveConfirmYesEl.classList.add("btn");
        zoneRecordRemoveConfirmYesEl.classList.add("btn-primary");
        zoneRecordRemoveConfirmYesEl.innerHTML = "Yes";
        zoneRecordRemoveConfirmEl.appendChild(zoneRecordRemoveConfirmYesEl);

        let zoneRecordRemoveConfirmNoEl = document.createElement("button");
        zoneRecordRemoveConfirmNoEl.addEventListener('click', this.removeRecordClickNo.bind(this));
        zoneRecordRemoveConfirmNoEl.dataset.zonerecordid = zoneRecord.id;
        zoneRecordRemoveConfirmNoEl.classList.add("zone-record-confirm-no");
        zoneRecordRemoveConfirmNoEl.classList.add("btn");
        zoneRecordRemoveConfirmNoEl.classList.add("btn-secondary");
        zoneRecordRemoveConfirmNoEl.innerHTML = "No";
        zoneRecordRemoveConfirmEl.appendChild(zoneRecordRemoveConfirmNoEl);


      let zoneRecordContainerEl = document.createElement("div");
      zoneRecordContainerEl.classList.add("zone-record-container");
      zoneRecordEl.appendChild(zoneRecordContainerEl);

        let typeEl = document.createElement("div");
        typeEl.setAttribute("id", "zone-records-"+zoneRecord.id+'-type');
        typeEl.classList.add("zone-record-type");
        typeEl.classList.add("zone-record-row");
        typeEl.appendChild(document.createTextNode(zoneRecord.type));
        zoneRecordContainerEl.appendChild(typeEl);

        let nameEl = document.createElement("div");
        nameEl.setAttribute("id", "zone-records-"+zoneRecord.id+'-name');
        nameEl.classList.add("zone-record-name");
        nameEl.classList.add("zone-record-row");
        nameEl.appendChild(document.createTextNode(zoneRecord.name));
        zoneRecordContainerEl.appendChild(nameEl);

        let contentEl = document.createElement("div");
        contentEl.setAttribute("id", "zone-records-"+zoneRecord.id+'-content');
        contentEl.classList.add("zone-record-content");
        contentEl.classList.add("zone-record-row");
        contentEl.appendChild(document.createTextNode(zoneRecord.content));
        zoneRecordContainerEl.appendChild(contentEl);

        let ttlEl = document.createElement("div");
        ttlEl.setAttribute("id", "zone-records-"+zoneRecord.id+'-ttl');
        ttlEl.classList.add("zone-record-ttl");
        ttlEl.classList.add("zone-record-row");
        ttlEl.appendChild(document.createTextNode(zoneRecord.ttl));
        zoneRecordContainerEl.appendChild(ttlEl);

    this.element = zoneRecordEl;
    return this.element;
  }

  updateRecordClick(zoneRecordEl){
    this.app.listpage.updateRecord(zoneRecordEl);
  }

  removeRecordClick(e) {
    e.stopPropagation();
    let zoneRecordRemoveButton = e.target;
    let zoneRecordRemoveDialog = document.getElementById('zone-record-confirm-'+zoneRecordRemoveButton.dataset.zonerecordid);
    zoneRecordRemoveDialog.classList.remove('hidden');
  }

 removeRecordClickYes(e) {
    e.stopPropagation();
    let zoneRecordRemoveButton = e.target;
    let recordId = zoneRecordRemoveButton.dataset.zonerecordid;
    let zoneRecordRemoveDialog = document.getElementById('zone-record-confirm-'+recordId);
    zoneRecordRemoveDialog.classList.add('hidden');

    this.app.spinner.show();
    getUrl(
        '/api/websupport/zone/php-assignment-6.ws/record/delete/'+recordId, 'delete', null,
        this.receiveRemoveRecord.bind(this),
        this.receiveRemoveRecord.bind(this)
    );
  }

  receiveRemoveRecord(data) {
    this.app.spinner.hide();
    if(typeof data.status != 'undefined' && data.status == 'success'){
      let recordId = data.item.id;
      let recordEl = document.getElementById('zone-records-'+recordId);
      recordEl.addEventListener('animationend', this.removeAnimationFinished.bind(this, recordEl));
      recordEl.classList.add('zone-record-remove-animation');
      this.app.flashmessage.show("Record remove success");
    }
  }

  removeAnimationFinished(recordEl){
    let zoneid = recordEl.dataset.zoneid
    let recordid = recordEl.dataset.recordid;
    this.app.listpage.removeZoneRecord(zoneid, recordid);
    recordEl.remove();
  }

  removeRecordClickNo(e) {
    e.stopPropagation();
    let zoneRecordRemoveButton = e.target;
    let zoneRecordRemoveDialog = document.getElementById('zone-record-confirm-'+zoneRecordRemoveButton.dataset.zonerecordid);
    zoneRecordRemoveDialog.classList.add('hidden');
  }

}
