class Spinner {
    constructor(app) {
        this.app = app;
        this.showSpinner = false;
        this.counter = 0;
        this.bindElements();
    }

     bindElements() {
        this.spinner = document.getElementById('spinner');
      }

    show() {
        this.counter++;
        if(!this.showSpinner) {
            setTimeout(this.showLazy.bind(this), 1000);
            this.showSpinner = true;
        }
    }

    showLazy() {
        if(this.showSpinner) {
            this.spinner.style.display = 'block';
            this.spinner.classList.remove("hide");
            this.spinner.classList.add("show")
        }
    }  

    hide() {
        this.counter--;

        if(this.counter==0){
            this.showSpinner = false;
            this.spinner.classList.remove("show")
            this.spinner.classList.add("hide");
        }
    }
}
