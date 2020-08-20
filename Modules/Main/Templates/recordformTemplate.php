<div id="form-record-wrapper" class="form-record-wrapper"></div>
<div id="form-record" class="form-record container border hidden">
  <div class="row">
      <div class="col-12 col-lg-12">
        <form id="record-form" enctype="multipart/form-data" method="post">
          <h3 id="record-form-header" class="mt-5 mb-5">Create record</h3>
          <div class="form-group">
            <label for="record-type" class="mr-5">type</label>
            <div class="form-check form-check-inline">
              <input class="form-check-input record-type" type="radio" name="type" id="record-type-A" value="A">
              <label class="form-check-label" for="record-type-A"
              data-toggle="tooltip" data-placement="top" title="Address Mapping record (A Record) also known as a DNS host record, stores a hostname and its corresponding IPv4 address. RFC 1035">A</label>
            </div>

            <div class="form-check form-check-inline">
              <input class="form-check-input record-type" type="radio" name="type" id="record-type-AAAA" value="AAAA">
              <label class="form-check-label record-type" for="record-type-AAAA" data-toggle="tooltip" data-placement="top" title="IP Version 6 Address record (AAAA Record) stores a hostname and its corresponding IPv6 address. RFC 3596">AAAA</label>
            </div>

            <div class="form-check form-check-inline">
              <input class="form-check-input record-type" type="radio" name="type" id="record-type-MX" value="MX">
              <label class="form-check-label" for="record-type-MX" data-toggle="tooltip" data-placement="top" title="Mail exchanger record (MX Record) specifies an SMTP email server for the domain, used to route outgoing emails to an email server. RFC 1035 and RFC 7505">MX</label>
            </div>

            <div class="form-check form-check-inline">
              <input class="form-check-input record-type" type="radio" name="type" id="record-type-ANAME" value="ANAME">
              <label class="form-check-label" for="record-type-ANAME" data-toggle="tooltip" data-placement="top" title="An ANAME record is like a CNAME record, but at the root your domain. That means you can point the naked version of your domain (like example.com ) to a hostname (like mycdn.com. ). ANAME records are most commonly used to point the root of a domain to a CDN (Content Delivery Network) service or to point the root of a domain to multiple hostnames.">ANAME</label>
            </div>

            <div class="form-check form-check-inline">
              <input class="form-check-input record-type" type="radio" name="type" id="record-type-CNAME" value="CNAME">
              <label class="form-check-label" for="record-type-CNAME" data-toggle="tooltip" data-placement="top" title="Canonical Name record (CNAME Record) can be used to alias a hostname to another hostname. When a DNS client requests a record that contains a CNAME, which points to another hostname, the DNS resolution process is repeated with the new hostname. RFC 1035">CNAME</label>
            </div>

            <div class="form-check form-check-inline">
              <input class="form-check-input record-type" type="radio" name="type" id="record-type-NS" value="NS">
              <label class="form-check-label" for="record-type-NS" data-toggle="tooltip" data-placement="top" title="Name Server records (NS Record) specifies that a DNS Zone, such as “example.com” is delegated to a specific Authoritative Name Server, and provides the address of the name server. RFC 1035">NS</label>
            </div>

            <div class="form-check form-check-inline">
              <input class="form-check-input record-type" type="radio" name="type" id="record-type-TXT" value="TXT">
              <label class="form-check-label" for="record-type-TXT" data-toggle="tooltip" data-placement="top" title="Text Record (TXT Record) typically carries machine-readable data such as opportunistic encryption, sender policy framework, DKIM, DMARC, etc. RFC 1035">TXT</label>
            </div>

            <div class="form-check form-check-inline">
              <input class="form-check-input record-type" type="radio" name="type" id="record-type-SRV" value="SRV">
              <label class="form-check-label" for="record-type-SRV" data-toggle="tooltip" data-placement="top" title="A Service record (SRV record) is a specification of data in the Domain Name System defining the location, i.e., the hostname and port number, of servers for specified services. It is defined in RFC 2782, and its type code is 33. Some Internet protocols such as the Session Initiation Protocol (SIP) and the Extensible Messaging and Presence Protocol (XMPP) often require SRV support by network elements.">SRV</label>
            </div>

          </div>
          <div class="form-group">
            <label for="record-name">name</label>
            <input type="text" class="form-control" id="record-name" name="name" placeholder="">
          </div>
          <div class="form-group">
            <label for="record-content">content</label>
            <input type="text" class="form-control" id="record-content" name="content" placeholder="">
          </div>
          <div class="form-group">
            <label for="record-ttl" data-toggle="tooltip" data-placement="top" title="TTL (time to live) is a setting that tells the DNS resolver how long (unit is in seconds 1800s = 30min) to cache a query before requesting a new one.">ttl</label>
            <input type="text" class="form-control" id="record-ttl" name="ttl" placeholder="">
          </div>
          <div class="form-group">
            <button id="record-create-button" class="btn btn-primary">Create</button>
            <button id="record-update-button" class="btn btn-primary hidden">Update</button>
            <button id="record-create-cancel-button" class="btn btn-secondary">Cancel</button>
          </div>
        </form>     
    </div>
  </div>
</div>
