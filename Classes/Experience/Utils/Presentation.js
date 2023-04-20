import { EventEmitter } from 'events';

export default class Sizes extends EventEmitter{
    constructor(){
        super();
        this.btn = document.getElementById('nextBtn');
        this.timesPressed = 0;
        this.btn.addEventListener("click", this.enableControls());
    }
    enableControls(){
        this.timesPressed += 1;
        if(this.timesPressed === 1){
            this.emit("1times");
        }
    }
}