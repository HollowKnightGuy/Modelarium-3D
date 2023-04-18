import { EventEmitter } from 'events';

export default class Time extends EventEmitter{
    constructor(){
        super();
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;

        this.update();
    }

    update(){
        const CurrentTime = Date.now();
        this.delta = CurrentTime -this.current;
        this.current = CurrentTime;
        this.elapsed = this.current - this.start;

        this.emit("update");
        window.requestAnimationFrame(() => this.update());
    }
}