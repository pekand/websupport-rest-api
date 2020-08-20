class LoginBox {

  constructor(app) {
    this.app = app;
    this.visible = false;
    this.bindElements();
    this.bindEvents();
  }

  bindElements() {
    this.loginpage = document.getElementById('loginpage');
    this.usernameInput = document.getElementById('username');
    this.passwordInput = document.getElementById('password');
    this.loginform = document.getElementById('loginform');
  }

  bindEvents() {
    this.loginform.addEventListener('submit', this.loginFormSubmit.bind(this))
    this.loginpage.addEventListener('animationend', this.animationFinished.bind(this));
  }

  show(animation) {
    this.visible = true;
    this.loginpage.classList.remove('hidden');

    if(animation){
      this.loginpage.classList.add('loginpage-show');
    }
  }

  hide(animation) {
    this.visible = false;

    if(animation){
      this.loginpage.classList.add('loginpage-hide');
    } else {
      this.loginpage.classList.add('hidden');
    }
  }

  animationFinished(){
    if(!this.visible){
      this.loginpage.classList.add('hidden');
    }
    this.loginpage.classList.remove('loginpage-show');
    this.loginpage.classList.remove('loginpage-hide');
  }

  loginFormSubmit(event) {
    event.preventDefault();
    var formData = {
        username: this.usernameInput.value,
        password: this.passwordInput.value
    };
    this.app.spinner.show();
    getUrl(
        '/login/ajax', 'post', formData,
        this.receiveLoginForm.bind(this),
        this.receiveErrorLoginForm.bind(this)
    );
  }

  receiveLoginForm(data){
    this.app.spinner.hide();
    this.passwordInput.value = '';
    if(data.status == "logged") {
      this.app.afterUserSuccessLogin(data.data, true);
    }
  }

  receiveErrorLoginForm() {
      this.app.spinner.hide();
  }

  clean(){
      this.passwordInput.value = '';
  }

}
