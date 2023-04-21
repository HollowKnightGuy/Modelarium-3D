import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Experience from "./Experience";


export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

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
        this.scene.add(this.axes)
    }

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, .1, 1000);
        this.position =  this.perspectiveCamera.position;
        this.rotation =  this.perspectiveCamera.rotation;
        // this.perspectiveCamera.position.set(-0.0850151243003149,2.6998459476910974,1.7307573372766116);

        this.setCameraPosition();

        this.perspectiveCamera.updateProjectionMatrix()


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

        // this.controls.target.set(-0.08501511322199432,1.316647437350878,1.7307559531615184)
        this.controls.target.set(0, .3 ,0)

        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
        this.controls.zoomSpeed = 2
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

    setCameraPosition(){
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
        this.zoomOut(this.x, this.y, this.z);
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