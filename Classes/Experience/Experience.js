import * as THREE from 'three';

import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Resources from './Utils/Resources.js';
import Assets from './Utils/Assets.js';

import Camera from './Camera.js';
import Movement from './Utils/Movement.js';
import Renderer from './Renderer.js';

import World from './World/World.js';


export default class Experience{
    static instance
    constructor(canvas, name = "null"){
        if(Experience.instance){
            return  Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.Movement = new Movement();
        this.renderer = new Renderer();
        this.resources = new Resources(Assets);
        

        this.world = new World(name); 
        
        this.sizes.on("resize", ()=>{
            this.resize();
        });
        this.time.on("update", ()=>{
            this.update();
        });
    }

    update(){
        // setTimeout(() => {
        //     console.log(this.camera.position, this.camera.controls.target, this.camera.rotation);
        // }, 700);
        this.camera.update(); 
        this.renderer.update(); 
    }

    resize(){
        this.renderer.resize();
        this.camera.resize();
    }

    
}