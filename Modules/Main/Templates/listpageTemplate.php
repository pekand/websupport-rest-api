<section id="listpage" class="page listpage hidden">

  <?= $this->render("navbar")?>

  <div class="nav-scroller bg-white shadow-sm">
    <nav class="nav nav-underline">
      <span class="nav-link">Zones</span>
      <div id="zone-list"></div>
    </nav>
  </div>

  <main role="main" class="container">
    <div class="align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm row">
      <div class="col-2 col-lg-1">
          <img class="mr-3" src="/assets/layout/img/server.svg" alt="" width="48" height="48">
      </div>
      <div class="lh-100 col-8 col-lg-10">
        <h2 class="mb-0 text-white lh-100" id="zone-header"></h2>
      </div>
      <div class="col-2 col-lg-1">
        <button id="button-add-new-record" class="btn btn-primary my-2 my-sm-0">add</button>
      </div>
    </div>

    <?= $this->render("recordform")?>

    <div id="records-list" class="container"></div>
  </main>


</section>
