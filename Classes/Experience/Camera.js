import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Experience from "./Experience";


export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.x = 2.5535067129011413;
        this.y = 3.8023211430859694;
        this.z = 2.801570030078078;
        this.xstep = 2.5535067129011413/2560;
        this.ystep = 3.8023211430859694/2560;
        this.zstep = 2.801570030078078/2560;
        
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
        this.perspectiveCamera.position.set(this.x,this.y,this.z);

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

    zoomIn(xs,ys,zs){
        this.perspectiveCamera.position.x -= this.perspectiveCamera.position.x - xs;
        this.perspectiveCamera.position.y -= this.perspectiveCamera.position.y - ys;
        this.perspectiveCamera.position.z -= this.perspectiveCamera.position.z - zs;
    }
    
    zoomOut(xs,ys,zs){
        this.perspectiveCamera.position.x = this.perspectiveCamera.position.x + xs;
        this.perspectiveCamera.position.y = this.perspectiveCamera.position.y + ys;
        this.perspectiveCamera.position.z = this.perspectiveCamera.position.z + zs;
    }

    resize(){
        // Updating Perspective camera on Resize
        let camxstep = this.xstep * this.sizes.width;
        let camystep = this.ystep * this.sizes.width;
        let camzstep = this.zstep * this.sizes.width;
        console.log(camxstep, camystep, camzstep);
        let oldaspect = this.perspectiveCamera.aspect;
        let newaspect = this.sizes.width;
        this.perspectiveCamera.aspect = this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix()
        
        if(oldaspect > newaspect){
            this.zoomIn(camxstep, camystep, camzstep);
        }else{
            this.zoomOut(camxstep, camystep, camzstep);
        }
        // Updating Ortographic camera on Resize
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