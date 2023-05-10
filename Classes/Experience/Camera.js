import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Movement from './Utils/Movement.js';
import Experience from "./Experience";
import lib from '../lib.js';
import gsap from 'gsap';



export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.lib = new lib();
        this.movement = new Movement(); 

        // this.x = this.sizes.width * 0.01078;
        // this.y = this.sizes.width * 0.01697;
        // this.z = this.sizes.width * 0.01183;
        // this.xstep = this;
        // this.ystep = this.x / this.sizes.width;
        // this.zstep = this.z / this.sizes.width;

        
        this.createPerspectiveCamera();
        this.createOrtographicCamera();
        this.setOrbitControls() 

        // this.experience.presentation.on("1times", this.setOrbitControls())

        this.axes = new THREE.AxesHelper(5,5,5);


    }

    createPerspectiveCamera(){

        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, .1, 1000);
        this.position =  this.perspectiveCamera.position;
        this.rotation =  this.perspectiveCamera.rotation;
        this.setCameraPosition();


        this.movement.on("ordenador", this.moveToPc.bind(this))
        this.movement.on("arcade", this.moveToArcade.bind(this))
        this.movement.on("origen", this.moveToOrigin.bind(this));
        this.perspectiveCamera.updateProjectionMatrix()



    }
    
    moveToPc(){
        this.controls.enabled = false;
        gsap.to(this.perspectiveCamera.position, {
            x:-0.60219973482006,
            y:0.5501302476000813,
            z:0.10285366020236063,
            duration: 4.2,
            ease:"power3.inOut",
            });

        gsap.to(this.controls.target, {
            x:-0.9417680921817115,
            y:0.4603504952505593,
            z:0.10787983270274792,
            duration: 4.2,
            ease:"power3.inOut",
            });
    }

    moveToArcade(){
        this.controls.enabled = false;
        gsap.to(this.perspectiveCamera.position, {
            x:-0.31270755051079924,
            y:0.5889805588759206,
            z:0.6105217812838912,
            duration: 4.2,
            ease:"power3.inOut",
            });

        gsap.to(this.controls.target, {
            x:-0.6365761707513888,
            y:0.5528200874013415,
            z:0.6150046391096257,
            duration: 4.2,
            ease:"power3.inOut",
            });

    }

    moveToOrigin(){
        let camValues = this.setCameraPosition(true);
        let xorb = 0.0001;
        let yorb = .3001;
        let zorb = 0.0001;
        if(this.position.x != camValues[0] && this.position.y != camValues[1] && this.position.y != camValues[2]){
            if(this.controls.target.x === xorb ||
                this.controls.target.y === yorb ||
                this.controls.target.z === zorb){
                    xorb = 0.001;
                    yorb = .3;
                    zorb = 0.001;
                }
            this.lib.moveCamera(
                this.perspectiveCamera, 
                this.controls, 
                camValues[0],
                camValues[1],
                camValues[2],
                -0.8517051944025393,
                0.5824676936125961,
                0.5609967955279564,
                xorb,
                yorb,
                zorb);
        }
        this.controls.enabled = true;
        
    }
    
    
    createOrtographicCamera(){
        this.frustum = 5;
        this.ortographicCamera = new THREE.OrthographicCamera(
            -this.sizes.aspect * this.sizes.frustum / 2,
            -this.sizes.aspect * this.sizes.frustum / 2,
            this.sizes.frustum / 2,
            -this.sizes.frustum / 2,
            -50, 
            50
        );
        this.scene.add(this.ortographicCamera);
        

    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.target.set(0.001, .3, 0.001)

        this.controls.minDistance = 0.3;
        this.controls.maxDistance = 8;
        this.controls.minAzimuthAngle = - Math.PI * 0.1; // radians
        this.controls.maxAzimuthAngle = Math.PI * 0.55; // radians
        this.controls.minPolarAngle = 0;
		this.controls.maxPolarAngle =  Math.PI * 0.43;
        this.controls.enableDamping = true;
        this.controls.rotateSpeed = .1;
        this.controls.panSpeed = .3;
        this.controls.zoomSpeed = .5;
        this.controls.enableZoom = true;
        // this.controls.rotateSpeed = 1;
        // this.controls.panSpeed = 1;
        // this.controls.zoomSpeed = 2;
    }

    setCamPosValues(xz, proportion, sizesDiv, modifier){
        if(sizesDiv){
            this.x = xz;
            this.z = xz;
            this.y = this.sizes.width * (proportion* this.sizes.width / (this.sizes.width * modifier));
        }else{
            this.x = xz;
            this.z = xz; 
            this.y = this.sizes.width * (proportion/ modifier);
        }
    }

    setCameraPosition(returnSomething = false){
        if(300 <= this.sizes.width && this.sizes.width < 600){
            if(this.sizes.width > 500){
                this.setCamPosValues(3.5, 0.00723, false, .9);
            }else if(this.sizes.width > 400){
                this.setCamPosValues(5.1, 0.00523, true, 0.5);
            }else{
                this.setCamPosValues( 5.6, 0.00523, true, 0.3);
            }
        }
        else if(600 <= this.sizes.width && this.sizes.width < 1000){
            if(this.sizes.width > 800){
                this.setCamPosValues(2.6, 0.00723, false, 1.9);
            }else if(this.sizes.width > 700){
                this.setCamPosValues(3, 0.00523, true, 1.3);
            }else{
                this.setCamPosValues( 3.5, 0.00523, true, 0.8);
            }
        }
        else if(1000 <= this.sizes.width && this.sizes.width < 1440){
            if(this.sizes.width > 1200){
                this.setCamPosValues( 2.9, 0.00723, true, 2.9);
            }else{
                this.setCamPosValues( 2.7, 0.00523, true, 1.9);
            }
        }
        else if( 1440 <= this.sizes.width && this.sizes.width < 2000){
            if(this.sizes.width < 1760 ){
                this.setCamPosValues( 3.1, 0.00523, true, 2.4);
            }else{
                this.setCamPosValues( 3.1, 0.00523, true, 3.3);
            }
        }
        else if(this.sizes.width >= 2000){            
            if(this.sizes.width > 2300){
                this.setCamPosValues( 2.8, 0.00323, true, 2.5);
                
            }else{
                this.setCamPosValues( 3.1, 0.00523, true,  3.4);
            }

        }

        if(returnSomething){
            return [this.x,this.y, this.z];
        }else{
            this.zoomOut(this.x, this.y, this.z);
        }
    }

    zoomIn(xs,ys,zs){
        this.perspectiveCamera.position.x = this.x - (this.x - xs)*1.2;
        this.perspectiveCamera.position.y = this.y - (this.y - ys)*1.2;
        this.perspectiveCamera.position.z = this.z - (this.z - zs)*1.2;
    }
    
    zoomOut(xs,ys,zs){
        this.perspectiveCamera.position.x = this.x + (this.x - xs)*1.2;
        this.perspectiveCamera.position.y = this.y + (this.y - ys)*1.2;
        this.perspectiveCamera.position.z = this.z + (this.z - zs)*1.2;
    }

    resize(){
        
        // Updating Perspective camera on Resize
        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;
        this.perspectiveCamera.aspect = this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix()
        this.setCameraPosition();
        
        this.ortographicCamera.updateProjectionMatrix()
        this.ortographicCamera.left = -this.sizes.aspect * this.sizes.frustum / 2;
        this.ortographicCamera.right = -this.sizes.aspect * this.sizes.frustum / 2;
        this.ortographicCamera.top = this.sizes.frustum / 2;
        this.ortographicCamera.bottom = -this.sizes.frustum / 2;
    }
    
    update(){
        this.controls.update();
    }

}