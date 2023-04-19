import * as THREE from 'three';

import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Resources from './Utils/Resources.js';
import Assets from './Utils/Assets.js';

import Camera from './Camera.js';
import Renderer from './Renderer.js';

import World from './World/World.js';


export default class Experience{
    static instance
    constructor(canvas){
        if(Experience.instance){
            return  Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(Assets);
        
        this.world = new World(); 
        let width = 100,
        perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
        EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
        time = parseInt((EstimatedTime/1000)%60)*100;

        // Loadbar Animation
        $(".loadbar").animate({
        width: width + "%"
        }, time);

        // Loadbar Glow Animation
        $(".glow").animate({
        width: width + "%"
        }, time);

        // Percentage Increment Animation
        let PercentageID = $("#precent"),
            start = 0,
            end = 100,
            durataion = time;
            animateValue(PercentageID, start, end, durataion);
            
        function animateValue(id, start, end, duration) {
        
        let range = end - start,
            current = start,
            increment = end > start? 1 : -1,
            stepTime = Math.abs(Math.floor(duration / range)),
            obj = $(id);
            
        let timer = setInterval(function() {
            current += increment;
            $(obj).text(current + "%");
            //obj.innerHTML = current;
            if (current == end) {
            clearInterval(timer);
            }
        }, stepTime);
        }

        // Fading Out Loadbar on Finised
        setTimeout(function(){
        $('.preloader-wrap').fadeOut(300);
        }, time);
        
        this.sizes.on("resize", ()=>{
            this.resize();
        });
        this.time.on("update", ()=>{
            this.update();
        });
    }

    update(){
        this.camera.update(); 
        this.renderer.update(); 
    }

    resize(){
        this.renderer.resize();
        this.camera.resize();
    }
}