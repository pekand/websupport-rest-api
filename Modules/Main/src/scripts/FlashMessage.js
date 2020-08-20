class FlashMessage {

  constructor(app) {
    this.app = app;
    this.messageCount = 0;

    this.bindElements();
    this.bindEvents();
  }

  bindElements() {
    this.messageBox = document.getElementById('flashmesage-box');
  }

  bindEvents() {
    this.messageBox.addEventListener('click', this.hideMessageBox.bind(this));
    this.messageBox.addEventListener('animationend', this.showAnimationFinished.bind(this));
  }

  show(message) {

    this.messageCount++;
    var messageEl = document.createElement("div");
    messageEl.setAttribute("id", "message-"+this.messageCount);
    messageEl.classList.add("flashmesage-message");
    messageEl.appendChild(document.createTextNode(message));

    setTimeout(this.hideMessage.bind(this, messageEl), 3000);
    
    this.messageBox.appendChild(messageEl);
    if(this.messageBox.classList.contains("hidden")) {
        this.messageBox.classList.remove("hidden");
        this.messageBox.classList.add("flashmesage-show");
    }
  }

  showAnimationFinished() {
    this.messageBox.classList.remove("flashmesage-show");
  }

  hideMessage(messageEl) {
    messageEl.remove();
    if(this.messageCount > 0) {
        this.messageCount--;
    }
    if(this.messageCount == 0) {
        this.messageBox.classList.add('hidden');
    }
  }

  hideMessageBox() {
    this.clean();
  }

  clean() {
    this.messageCount = 0;
    this.messageBox.classList.add('hidden');
    this.messageBox.innerHTML = '';
  }

}
