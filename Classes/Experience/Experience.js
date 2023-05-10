import * as THREE from 'three';

import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Resources from './Utils/Resources.js';
import Assets from './Utils/Assets.js';
import Movement from './Utils/Movement.js';

import Camera from './Camera.js';
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
        this.Movement = new Movement();
        this.camera = new Camera();
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
        
        // console.log(this.camera.rotation);
        this.camera.update(); 
        this.renderer.update(); 
    }

    resize(){
        this.renderer.resize();
        this.camera.resize();
    }

    
}