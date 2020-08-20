
class App {
  constructor() {
    this.bindElements();
    this.bindEvents();
    this.checkUserStatus();
  }

  bindElements() {
    this.loginbox = new LoginBox(this);
    this.listpage = new ListPage(this);
    this.spinner = new Spinner(this);
    this.flashmessage = new FlashMessage(this);
  }

  bindEvents() {
    
  }

  checkUserStatus(){
    this.spinner.show();
    getUrl(
        '/user', 'get', null,
        this.receiveUserStatus.bind(this),
        this.receiveUserStatusError.bind(this)
    );
  }

  receiveUserStatus(data) {
    this.spinner.hide();
    if(data.status == "logged") {
      this.afterUserSuccessLogin(data.data, false);
    } else {
      this.showLoginPage(false);
    }
  }

  receiveUserStatusError(data) {
    this.spinner.hide();
  }

  afterUserSuccessLogin(data, animation) {
    this.listpage.init(data);
    this.hideLoginPage(animation);
    
  }

  showLoginPage(animation) {
    this.loginbox.show(animation);
    if(!animation) {
      this.hideListPage();
    }
  }

  hideLoginPage(animation) {
    this.loginbox.hide(animation);
  }

  showListPage(data) {
    this.listpage.show();
    this.hideLoginPage();
  }

  hideListPage() {
    this.listpage.hide();
  }

  logout(){
    getUrl(
        '/logout', 'get', null,
        this.afterLogout.bind(this),
        this.afterLogout.bind(this)
    );
  }

  afterLogout(){
      this.showLoginPage(true);
      setTimeout(this.afterLogoutAnimation.bind(this), 2000)
  }

  afterLogoutAnimation(){
    this.listpage.hide();
    this.clean();
  }

  clean(){
    
    this.loginbox.clean();
    this.listpage.clean();
  }

}
